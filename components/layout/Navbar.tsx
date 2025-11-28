"use client";

import Link from "next/link";
import { useState } from "react";
import { usePathname } from "next/navigation";

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

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

        {/* LOGIN/REGISTER DESKTOP */}
        <div className="hidden md:flex gap-6 text-lg items-center">
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
          {/* FOTO DE PERFIL */}
          <Link href="/profile">
            <img
              src="https://cdn-icons-png.flaticon.com/256/17253/17253092.png" // Cambia por la URL de avatar real
              alt="Perfil"
              className="w-10 h-10 rounded-full border border-gray-300 cursor-pointer hover:opacity-80 transition"
            />
          </Link>
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
            Productos
          </Link>
          <Link
            href="/dashboard"
            onClick={() => handleClick("/dashboard")}
            className="hover:text-red-500"
          >
            Dashboard
          </Link>

          <hr className="border-gray-700" />

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
          {/* FOTO DE PERFIL */}
          <Link href="/profile" onClick={() => setOpen(false)}>
            <img
              src="https://cdn-icons-png.flaticon.com/256/17253/17253092.png" // Cambia por la URL de avatar real
              alt="Perfil"
              className="w-10 h-10 rounded-full border border-gray-300 cursor-pointer hover:opacity-80 transition"
            />
          </Link>
        </div>
      </div>
    </nav>
  );
}
