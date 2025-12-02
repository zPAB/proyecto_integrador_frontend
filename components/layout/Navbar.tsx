
"use client";

import Link from "next/link";
import { useState } from "react";
import { usePathname } from "next/navigation";
import { useAuth } from "@/contexts/AuthContext";
import { useCart } from "@/contexts/CartContext"; // ✅ Importamos el carrito

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  const { user, signOut, loading } = useAuth();
  const { cart } = useCart(); // ✅ Hook del carrito

  // ✅ Contador total de productos
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
          < handleReload("/")} className="flex items-center gap-1">
            <span className="text-red-600">Medallo</span>
            <span className="text-white">Wear</span>
          </Link>
        </h1>

        {/* LINKS CENTRALES */}
        <div className="hidden md:flex gap-8 text-lg mx-auto">
          / handleReload("/")} className="hover:text-red-500">
            Inicio
          </Link>
          /products handleReload("/products")} className="hover:text-red-500">
            Productos
          </Link>
          /contacto handleReload("/contacto")} className="hover:text-red-500">
            Contacto
          </Link>
        </div>

        {/* PERFIL / LOGIN / CARRITO */}
        <div className="hidden md:flex gap-6 text-lg items-center">
          {loading && <span className="text-gray-300 text-sm">Cargando...</span>}

          {!loading && !user && (
            <>
              /login handleReload("/login")} className="hover:text-red-500">
                Iniciar Sesión
              </Link>
              /register handleReload("/register")} className="hover:text-red-500">
                Registrarse
              </Link>
            </>
          )}

          {!loading && user && (
            <>
              /profile
                <img
                  src={user.photoURL ?? "https://cdn-icons-png.flaticon.com/256/17253/17253092.png"}
                  alt="Perfil"
                  className="w-10 h-10 rounded-full border border-gray-300 cursor-pointer hover:opacity-80 transition"
                />
              </Link>
            </>
          )}

          {/* ✅ Carrito con contador */}
          /cart
            🛒 Carrito
            {totalItems > 0 && (
              <span className="absolute -top-2 -right-3 bg-red-600 text-white text-xs font-bold px-2 py-1 rounded-full">
                {totalItems}
              </span>
            )}
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
          / handleClick("/")} className="hover:text-red-500">
            Inicio
          </Link>
          /products handleClick("/products")} className="hover:text-red-500">
            Productos
          </Link>
          /contacto handleClick("/contacto")} className="hover:text-red-500">
            Contacto
          </Link>
          <hr className="border-gray-700" />

          {!loading && !user && (
            <>
              /login handleClick("/login")} className="hover:text-red-500">
                Iniciar Sesión
              </Link>
              /register handleClick("/register")} className="hover:text-red-500">
                Registrarse
              </Link>
            </>
          )}

          {/* ✅ Carrito en móvil */}
          /cart handleClick("/cart")} className="hover:text-red-500">
            🛒 Carrito {totalItems > 0 && `(${totalItems})`}
          </Link>

          {!loading && user && (
            <>
              /profile setOpen(false)}>
                <img
                  src={user.photoURL ?? "https://cdn-icons-png.flaticon.com/256/17253/17253092.png"}
                  alt="Perfil"
                  className="w-10 h-10 rounded-full border border-gray-300 cursor-pointer hover:opacity-80 transition"
                />
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}
