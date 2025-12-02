"use client";

import Link from "next/link";
import { useState, useEffect } from "react";

export default function Home() {
  const [open, setOpen] = useState(false);
  const [latestProducts, setLatestProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchLatestProducts = async () => {
      try {
        const res = await fetch(
          "https://692b3daf7615a15ff24f1bd4.mockapi.io/products"
        );
        const data = await res.json();
        // Obtener los últimos 3 productos
        setLatestProducts(data.slice(-3).reverse());
      } catch (error) {
        console.error("Error fetching products:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchLatestProducts();
  }, []);

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
        <p className="text-gray-300 text-lg mb-6">
          Descubre prendas únicas inspiradas en la creatividad, cultura urbana
          y energía de Medellín. Diseños auténticos para un estilo moderno.
        </p>
        <p className="text-white mb-6">
          En Medallo Wear, creemos que la moda es más que ropa. Es una forma de expresión, 
          una declaración de identidad y un reflejo de la energía vibrante de nuestra ciudad. 
          Cada prenda que diseñamos nace de la inspiración de las calles de Medellín, 
          sus colores, sus ritmos y su indomable espíritu.
        </p>
        <p className="text-white mb-6">
          Nos comprometemos a ofrecerte prendas de alta calidad con diseños que no encontrarás 
          en ningún otro lugar. Nuestros materiales son seleccionados cuidadosamente, nuestros 
          cortes son precisos y nuestros detalles cuidados. Queremos que cuando uses una prenda 
          de Medallo Wear, te sientas cómodo, seguro y con el mejor estilo.
        </p>
        <p className="text-white">
          Únete a nuestra comunidad de personas que creen en la autenticidad, la calidad y el 
          estilo urbano. Porque en Medallo Wear, no solo vendemos ropa: vendemos experiencias, 
          confianza y la oportunidad de expresar quién realmente eres.
        </p>
      </section>

      {/* COLECCIÓN DESTACADA */}
      <section className="max-w-6xl mx-auto px-6 py-10">
        <h2 className="text-3xl font-bold text-red-600 mb-6 text-center">
          Últimos Lanzamientos
        </h2>
        {loading ? (
          <p className="text-center text-gray-400">Cargando productos...</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {latestProducts.map((item) => (
              <div
                key={item.id}
                className="bg-zinc-900 rounded-xl overflow-hidden border border-zinc-800 hover:scale-105 transform transition cursor-pointer"
              >
                <img
                  src={
                    item.img?.startsWith("http")
                      ? item.img
                      : `/images/${item.img}`
                  }
                  alt={item.name}
                  className="h-64 w-full object-cover"
                />
                <div className="p-4">
                  <h3 className="font-semibold">{item.name}</h3>
                  <p className="text-gray-400">{item.category}</p>
                  <p className="text-red-600 font-bold mt-2">${item.price.toLocaleString()}</p>
                  <Link href={`/products/${item.id}`}>
                    <button className="mt-4 w-full bg-red-600 py-2 rounded hover:bg-red-700 transition cursor-pointer">
                      Ver producto
                    </button>
                  </Link>
                </div>
              </div>
            ))}
          </div>
        )}
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
      {/* TESTIMONIOS */}
      <section className="py-14 px-6">
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
