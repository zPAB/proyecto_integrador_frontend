"use client";

import Link from "next/link";
import { useState } from "react";
import { usePathname } from "next/navigation";
import { useAuth } from "@/contexts/AuthContext";
import { useCart } from "@/contexts/CartContext";

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  const { user, signOut, loading } = useAuth();
  const { cart } = useCart();

  const totalItems = cart.reduce((acc, item) => acc + item.quantity, 0);

  const handleReload = (href: string) => {
    if (pathname === href) {
      window.location.href = href;
    }
  };

  const handleClick = (href: string) => {
    handleReload(href);
    setOpen(false);
  };

  return (
    <nav className="bg-black text-white px-6 py-4 border-b border-gray-800 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto flex justify-between items-center">

        {/* LOGO */}
        <h1 className="text-2xl font-bold flex items-center gap-1">
          <Link
            href="/"
            onClick={() => handleClick("/")}
            className="flex items-center gap-1"
          >
            <span className="text-red-600">Medallo</span>
            <span className="text-white">Wear</span>
          </Link>
        </h1>

        {/* LINKS CENTRALES */}
        <div className="hidden md:flex gap-8 text-lg mx-auto">
          <Link
            href="/"
            onClick={() => handleReload("/")}
            className="hover:text-red-500"
          >
            Inicio
          </Link>

          <Link
            href="/products"
            onClick={() => handleReload("/products")}
            className="hover:text-red-500"
          >
            Catálogo
          </Link>

          <Link
            href="/contacto"
            onClick={() => handleReload("/contacto")}
            className="hover:text-red-500"
          >
            Contacto
          </Link>
        </div>

        {/* PERFIL / LOGIN / CARRITO */}
        <div className="hidden md:flex gap-6 text-lg items-center">
          {loading && <span className="text-gray-300 text-sm">Cargando...</span>}

          {!loading && !user && (
            <>
              <Link
                href="/login"
                onClick={() => handleReload("/login")}
                className="hover:text-red-500"
              >
                Iniciar Sesión
              </Link>

              <Link
                href="/register"
                onClick={() => handleReload("/register")}
                className="hover:text-red-500"
              >
                Registrarse
              </Link>
            </>
          )}

          {!loading && user && (
            <Link href="/profile">
              <img
                src={
                  user.photoURL ?? "https://cdn-icons-png.flaticon.com/256/17253/17253092.png"
                }
                alt="Perfil"
                className="w-10 h-10 rounded-full border border-gray-300 cursor-pointer hover:opacity-80 transition"
              />
            </Link>
          )}

          {/* Carrito - Solo si hay sesión iniciada */}
          {!loading && user && (
            <Link href="/cart" className="relative hover:text-red-500">
              🛒 Carrito
              {totalItems > 0 && (
                <span className="absolute -top-2 -right-3 bg-red-600 text-white text-xs font-bold px-2 py-1 rounded-full">
                  {totalItems}
                </span>
              )}
            </Link>
          )}
        </div>
      </div>

      {/* MENÚ MÓVIL */}
      <div
        className={`md:hidden transition-all duration-300 overflow-hidden ${
          open ? "max-h-96 opacity-100 mt-4" : "max-h-0 opacity-0"
        }`}
      >
        <div className="flex flex-col gap-4 bg-black p-4 border-t border-gray-700">
          <Link
            href="/"
            onClick={() => handleClick("/")}
            className="hover:text-red-500"
          >
            Inicio
          </Link>

          <Link
            href="/products"
            onClick={() => handleClick("/products")}
            className="hover:text-red-500"
          >
            Catálogo
          </Link>

          <Link
            href="/contacto"
            onClick={() => handleClick("/contacto")}
            className="hover:text-red-500"
          >
            Contacto
          </Link>

          <hr className="border-gray-700" />

          {!loading && !user && (
            <>
              <Link
                href="/login"
                onClick={() => handleClick("/login")}
                className="hover:text-red-500"
              >
                Iniciar Sesión
              </Link>

              <Link
                href="/register"
                onClick={() => handleClick("/register")}
                className="hover:text-red-500"
              >
                Registrarse
              </Link>
            </>
          )}

          {!loading && user && (
            <Link
              href="/cart"
              onClick={() => handleClick("/cart")}
              className="hover:text-red-500"
            >
              🛒 Carrito {totalItems > 0 && `(${totalItems})`}
            </Link>
          )}

          {!loading && user && (
            <Link href="/profile" onClick={() => setOpen(false)}>
              <img
                src={
                  user.photoURL ?? "https://cdn-icons-png.flaticon.com/256/17253/17253092.png"
                }
                alt="Perfil"
                className="w-10 h-10 rounded-full border border-gray-300 cursor-pointer hover:opacity-80 transition"
              />
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
}
