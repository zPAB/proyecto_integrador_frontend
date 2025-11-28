"use client";

import Link from "next/link";
import { useState } from "react";
import { usePathname } from "next/navigation";
import { useAuth } from "@/contexts/AuthContext"; // <-- IMPORTANTE

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  const { user, signOut, loading } = useAuth(); // <-- ESTADO AUTH

  // Recarga si ya estás en la misma ruta
  const handleReload = (href: string) => {
    if (pathname === href) {
      window.location.href = href;
    }
  };

  // Función que cierra menú y controla recarga
  const handleClick = (href: string) => {
    handleReload(href);
    setOpen(false);
  };

  return (
    <nav className="bg-black text-white px-6 py-4 border-b border-gray-800 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        
        {/* LOGO */}
        <h1 className="text-2xl font-bold">
          <Link
            href="/"
            onClick={() => handleReload("/")}
            className="flex items-center gap-1 cursor-pointer select-none"
          >
            <span className="text-red-600">Medallo</span>
            <span className="text-white">Wear</span>
          </Link>
        </h1>

        {/* BOTÓN HAMBURGUESA */}
        <button
          className="md:hidden flex flex-col gap-1 focus:outline-none"
          onClick={() => setOpen(!open)}
          aria-label="Abrir menú"
        >
          <span className="w-6 h-[3px] bg-white transition"></span>
          <span className="w-6 h-[3px] bg-white transition"></span>
          <span className="w-6 h-[3px] bg-white transition"></span>
        </button>

        {/* LINKS DESKTOP */}
        <div className="hidden md:flex gap-8 text-lg">
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
            Productos
          </Link>

          <Link
            href="/dashboard"
            onClick={() => handleReload("/dashboard")}
            className="hover:text-red-500"
          >
            Dashboard
          </Link>
        </div>

        {/* LOGIN / REGISTER / PERFIL DESKTOP */}
        <div className="hidden md:flex gap-6 text-lg items-center">

          {/* SI ESTÁ CARGANDO LA SESIÓN */}
          {loading && (
            <span className="text-gray-300 text-sm">Cargando...</span>
          )}

          {/* SI NO ESTÁ LOGUEADO → MOSTRAR LOGIN Y REGISTER */}
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

          {/* SI HAY USUARIO → MOSTRAR FOTO + PERFIL + LOGOUT */}
          {!loading && user && (
            <>
              <Link href="/profile">
                <img
                  src={user.photoURL ?? "https://cdn-icons-png.flaticon.com/256/17253/17253092.png"}
                  alt="Perfil"
                  className="w-10 h-10 rounded-full border border-gray-300 cursor-pointer hover:opacity-80 transition"
                />
              </Link>

              <button
                onClick={() => signOut()}
                className="text-red-500 hover:text-red-600"
              >
                Cerrar sesión
              </button>
            </>
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

          {/* LINKS */}
          <Link href="/" onClick={() => handleClick("/")} className="hover:text-red-500">
            Inicio
          </Link>

          <Link href="/products" onClick={() => handleClick("/products")} className="hover:text-red-500">
            Productos
          </Link>

          <Link href="/dashboard" onClick={() => handleClick("/dashboard")} className="hover:text-red-500">
            Dashboard
          </Link>

          <hr className="border-gray-700" />

          {/* LOGIN/REGISTER MOBILE */}
          {!loading && !user && (
            <>
              <Link href="/login" onClick={() => handleClick("/login")} className="hover:text-red-500">
                Iniciar Sesión
              </Link>
              <Link href="/register" onClick={() => handleClick("/register")} className="hover:text-red-500">
                Registrarse
              </Link>
            </>
          )}

          {/* PERFIL MOBILE */}
          {!loading && user && (
            <>
              <Link href="/profile" onClick={() => setOpen(false)}>
                <img
                  src={user.photoURL ?? "https://cdn-icons-png.flaticon.com/256/17253/17253092.png"}
                  alt="Perfil"
                  className="w-10 h-10 rounded-full border border-gray-300 cursor-pointer hover:opacity-80 transition"
                />
              </Link>

              <button
                onClick={() => { signOut(); setOpen(false); }}
                className="text-red-500 text-left"
              >
                Cerrar sesión
              </button>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}
