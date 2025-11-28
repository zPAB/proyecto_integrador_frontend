"use client";

import Link from "next/link";
import { useState } from "react";

export default function Home() {
  const [open, setOpen] = useState(false);

  const products = [
    {
      id: 1,
      name: "Camiseta edición Medellín",
      category: "Colección urbana",
      img: "https://images.unsplash.com/photo-1543076447-215ad9ba6923",
    },
    {
      id: 2,
      name: "Chaqueta streetwear negra",
      category: "Colección urbana",
      img: "https://images.unsplash.com/photo-1618354696220-bddc944eede0",
    },
    {
      id: 3,
      name: "Pantalón denim clásico",
      category: "Colección urbana",
      img: "https://images.unsplash.com/photo-1600180758895-6347f5426f5b",
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
            <button className="mt-2 px-8 py-3 bg-red-600 hover:bg-red-700 rounded-lg font-semibold transition">
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
              className="bg-zinc-900 rounded-xl overflow-hidden border border-zinc-800 hover:scale-105 transform transition"
            >
              <img
                src={item.img}
                alt={item.name}
                className="h-64 w-full object-cover"
              />
              <div className="p-4">
                <h3 className="font-semibold">{item.name}</h3>
                <p className="text-gray-400">{item.category}</p>
                <button className="mt-4 w-full bg-red-600 py-2 rounded hover:bg-red-700 transition">
                  Ver producto
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* PROMOCIÓN DESTACADA */}
      <section className="relative my-14 px-6">
        <img
          src="https://images.unsplash.com/photo-1593032465173-bd7a2e88bcd2"
          alt="Promoción"
          className="w-full h-64 object-cover rounded-xl"
        />
        <div className="absolute inset-0 bg-black/50 flex flex-col items-center justify-center rounded-xl mx-6">
          <h2 className="text-3xl font-bold text-red-600 mb-2">
            Nueva Colección Primavera
          </h2>
          <p className="text-gray-300 mb-4">
            Colores vibrantes y diseños urbanos
          </p>
          <Link href="/products">
            <button className="px-6 py-2 bg-red-600 hover:bg-red-700 rounded-lg font-semibold transition">
              Descúbrela
            </button>
          </Link>
        </div>
      </section>

      {/* CATEGORÍAS */}
      <section className="max-w-5xl mx-auto px-6 py-16">
        <h2 className="text-2xl font-bold mb-8 text-center">Categorías</h2>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {["Hombre", "Mujer", "Unisex", "Accesorios"].map((cat) => (
            <div
              key={cat}
              className="bg-zinc-900 border border-zinc-800 rounded-xl p-6 text-center hover:bg-zinc-800 transition"
            >
              <h3 className="font-bold text-red-600 text-xl">{cat}</h3>
            </div>
          ))}
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

      {/* NUEVAS NOTICIAS / BLOG */}
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