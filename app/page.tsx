"use client";

import Link from "next/link";
import { useState } from "react";

export default function Home() {
  const [open, setOpen] = useState(false);

  const products = [
    {
      id: 1,
      name: "Camiseta",
      category: "Colección urbana",
      img: "https://dynamobrand.co/cdn/shop/files/CamisetaRegularWarriorBorn3_785x.jpg?v=1758130873",
    },
    {
      id: 2,
      name: "Chaqueta streetwear negra",
      category: "Colección urbana",
      img: "https://image.made-in-china.com/202f0j00gbhlRneBZSUL/Varsity-Jacket-Men-Casual-Black-Bomber-Jacket-Loose-Baseball-Coat.webp",
    },
    {
      id: 3,
      name: "Pantalón denim clásico",
      category: "Colección urbana",
      img: "https://thunderjeans.co/cdn/shop/products/101898-0-web.webp?v=1710348544",
    },
  ];

  return (
    <main className="bg-black text-white">
      {/* HERO PRINCIPAL */}
      <section
        className="relative h-[75vh] flex items-center justify-center bg-cover bg-center"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1512436991641-6745cdb1723f')",
        }}
      >
        <div className="bg-black/60 p-10 rounded-2xl text-center max-w-xl">
          <h1 className="text-5xl font-bold text-red-600 mb-4">
            Moda Urbana de Medellín
          </h1>
          <p className="text-lg mb-6">
            Estilo único, auténtico y con identidad paisa.
          </p>
          <Link href="/products">
            <button className="mt-2 px-8 py-3 bg-red-600 hover:bg-red-700 rounded-lg font-semibold transition cursor-pointer">
              Explorar colección
            </button>
          </Link>
        </div>
      </section>

      {/* BIENVENIDA */}
      <section className="max-w-4xl mx-auto py-14 px-6 text-center">
        <h2 className="text-3xl text-red-600 font-bold mb-4">
          Bienvenido a nuestra marca
        </h2>
        <p className="text-gray-300 text-lg">
          Descubre prendas únicas inspiradas en la creatividad, cultura urbana
          y energía de Medellín. Diseños auténticos para un estilo moderno.
        </p>
      </section>

      {/* COLECCIÓN DESTACADA */}
      <section className="max-w-6xl mx-auto px-6 py-10">
        <h2 className="text-3xl font-bold text-red-600 mb-6 text-center">
          Últimos Lanzamientos
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {products.map((item) => (
            <div
              key={item.id}
              className="bg-zinc-900 rounded-xl overflow-hidden border border-zinc-800 hover:scale-105 transform transition cursor-pointer"
            >
              <img
                src={item.img}
                alt={item.name}
                className="h-64 w-full object-cover"
              />
              <div className="p-4">
                <h3 className="font-semibold">{item.name}</h3>
                <p className="text-gray-400">{item.category}</p>
                <button className="mt-4 w-full bg-red-600 py-2 rounded hover:bg-red-700 transition cursor-pointer">
                  Ver producto
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* PROMOCIÓN DESTACADA */}
      <section className="relative my-14">
        <div className="absolute inset-0 bg-black/50 flex flex-col items-center justify-center rounded-xl">
          <h2 className="text-3xl font-bold text-red-600 mb-2">
            Nueva Colección Primavera
          </h2>
          <p className="text-gray-300 mb-4">
            Colores vibrantes y diseños urbanos
          </p>
          <Link href="/products">
            <button className="px-6 py-2 bg-red-600 hover:bg-red-700 rounded-lg font-semibold transition cursor-pointer">
              Descúbrela
            </button>
          </Link>
        </div>
      </section>

      {/* CATEGORÍAS */}
      <section className="max-w-6xl mx-auto px-6 py-16">
        <h2 className="text-3xl font-bold mb-10 text-center text-red-600">
          Categorías
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <Link href="/products?cat=hombre">
            <div className="bg-zinc-900 border border-zinc-800 rounded-xl overflow-hidden hover:scale-105 transition cursor-pointer">
              <img
                src="https://images.unsplash.com/photo-1521572163474-6864f9cf17ab"
                className="h-48 w-full object-cover"
              />
              <div className="p-4 text-center">
                <h3 className="font-bold text-red-600 text-xl">Hombre</h3>
              </div>
            </div>
          </Link>

          <Link href="/products?cat=mujer">
            <div className="bg-zinc-900 border border-zinc-800 rounded-xl overflow-hidden hover:scale-105 transition cursor-pointer">
              <img
                src="https://images.pexels.com/photos/34447154/pexels-photo-34447154.jpeg"
                className="h-48 w-full object-cover"
              />
              <div className="p-4 text-center">
                <h3 className="font-bold text-red-600 text-xl">Mujer</h3>
              </div>
            </div>
          </Link>

          <Link href="/products?cat=unisex">
            <div className="bg-zinc-900 border border-zinc-800 rounded-xl overflow-hidden hover:scale-105 transition cursor-pointer">
              <img
                src="https://images.pexels.com/photos/6786902/pexels-photo-6786902.jpeg"
                className="h-48 w-full object-cover"
              />
              <div className="p-4 text-center">
                <h3 className="font-bold text-red-600 text-xl">Unisex</h3>
              </div>
            </div>
          </Link>

          <Link href="/products?cat=accesorios">
            <div className="bg-zinc-900 border border-zinc-800 rounded-xl overflow-hidden hover:scale-105 transition cursor-pointer">
              <img
                src="https://images.pexels.com/photos/704241/pexels-photo-704241.jpeg"
                className="h-48 w-full object-cover"
              />
              <div className="p-4 text-center">
                <h3 className="font-bold text-red-600 text-xl">Accesorios</h3>
              </div>
            </div>
          </Link>
        </div>
      </section>

      {/* TESTIMONIOS */}
      <section className="bg-zinc-950 py-14 px-6">
        <h2 className="text-2xl font-bold text-center text-red-600 mb-8">
          Opiniones de clientes
        </h2>
        <div className="max-w-4xl mx-auto grid md:grid-cols-2 gap-8">
          <div className="bg-black border border-zinc-800 p-6 rounded-xl">
            <p className="italic">
              "Excelente calidad y estilo. Perfecto para el flow paisa."
            </p>
            <h4 className="mt-4 font-bold text-red-600">– Laura</h4>
          </div>

          <div className="bg-black border border-zinc-800 p-6 rounded-xl">
            <p className="italic">
              "La ropa más cómoda y con mejor diseño urbano que he comprado."
            </p>
            <h4 className="mt-4 font-bold text-red-600">– Mateo</h4>
          </div>
        </div>
      </section>

      {/* NOTICIAS */}
      <section className="max-w-6xl mx-auto px-6 py-14">
        <h2 className="text-3xl font-bold text-red-600 mb-8 text-center">
          Novedades
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {["Tendencias 2025", "Streetwear en Medellín", "Accesorios urbanos"].map(
            (news, i) => (
              <div
                key={i}
                className="bg-zinc-900 border border-zinc-800 p-6 rounded-xl hover:bg-zinc-800 transition"
              >
                <h3 className="font-bold text-red-600 mb-2">{news}</h3>
                <p className="text-gray-400 text-sm">
                  Descubre lo último en moda urbana y mantente al día con nuestros
                  lanzamientos exclusivos.
                </p>
              </div>
            )
          )}
        </div>
      </section>
    </main>
  );
}
