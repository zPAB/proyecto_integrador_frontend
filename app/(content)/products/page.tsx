"use client";

import { useState } from "react";

export default function ProductsPage() {
  const categories = ["Todo", "Hombre", "Mujer", "Unisex", "Accesorios"];

  const colors = ["Negro", "Blanco", "Rojo", "Azul", "Gris", "Café", "Beige"];

  const tipos = ["Camisetas", "Pantalones", "Chaquetas", "Tops", "Accesorios"];

  const [active, setActive] = useState("Todo");
  const [search, setSearch] = useState("");
  const [selectedColor, setSelectedColor] = useState("");
  const [tipoRopa, setTipoRopa] = useState("");

  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");

  // 🔥 **LOS 40 PRODUCTOS COMPLETOS**
  const products = [
    // CAMISETAS
    { id: 1, name: "Camiseta Oversize Negra", category: "Hombre", img: "/products/camisa1.jpg", price: 85000, color: "Negro", tipo: "Camisetas" },
    { id: 2, name: "Camiseta Blanca Minimal", category: "Unisex", img: "/products/camisa2.jpg", price: 79000, color: "Blanco", tipo: "Camisetas" },
    { id: 3, name: "Camiseta Roja Street", category: "Unisex", img: "/products/camisa3.jpg", price: 82000, color: "Rojo", tipo: "Camisetas" },
    { id: 4, name: "Camiseta Medallo Skull", category: "Hombre", img: "/products/camisa4.jpg", price: 90000, color: "Negro", tipo: "Camisetas" },
    { id: 5, name: "Camiseta Retro Azul", category: "Unisex", img: "/products/camisa5.jpg", price: 83000, color: "Azul", tipo: "Camisetas" },
    { id: 6, name: "Camiseta Flame Negra", category: "Unisex", img: "/products/camisa6.jpg", price: 87000, color: "Negro", tipo: "Camisetas" },

    // HOODIES
    { id: 7, name: "Hoodie Medallo Black", category: "Hombre", img: "/products/hoodie1.jpg", price: 150000, color: "Negro", tipo: "Chaquetas" },
    { id: 8, name: "Hoodie Blanco Clean", category: "Unisex", img: "/products/hoodie2.jpg", price: 145000, color: "Blanco", tipo: "Chaquetas" },
    { id: 9, name: "Hoodie Oversize Street", category: "Unisex", img: "/products/hoodie3.jpg", price: 160000, color: "Gris", tipo: "Chaquetas" },
    { id: 10, name: "Hoodie Red Flame", category: "Hombre", img: "/products/hoodie4.jpg", price: 155000, color: "Rojo", tipo: "Chaquetas" },
    { id: 11, name: "Hoodie Dark Urban", category: "Hombre", img: "/products/hoodie5.jpg", price: 165000, color: "Negro", tipo: "Chaquetas" },
    { id: 12, name: "Hoodie Style Gray", category: "Unisex", img: "/products/hoodie6.jpg", price: 148000, color: "Gris", tipo: "Chaquetas" },

    // BUZOS
    { id: 13, name: "Buzo Cuello Redondo Black", category: "Hombre", img: "/products/buzo1.jpg", price: 130000, color: "Negro", tipo: "Chaquetas" },
    { id: 14, name: "Buzo Blanco Classic", category: "Mujer", img: "/products/buzo2.jpg", price: 128000, color: "Blanco", tipo: "Chaquetas" },
    { id: 15, name: "Buzo Oversize Beige", category: "Unisex", img: "/products/buzo3.jpg", price: 135000, color: "Beige", tipo: "Chaquetas" },
    { id: 16, name: "Buzo Rojo Street", category: "Unisex", img: "/products/buzo4.jpg", price: 140000, color: "Rojo", tipo: "Chaquetas" },
    { id: 17, name: "Buzo Azul Marino Fit", category: "Hombre", img: "/products/buzo5.jpg", price: 132000, color: "Azul", tipo: "Chaquetas" },
    { id: 18, name: "Buzo Green Urban", category: "Unisex", img: "/products/buzo6.jpg", price: 138000, color: "Café", tipo: "Chaquetas" },

    // PANTALONES
    { id: 19, name: "Pantalón Cargo Negro", category: "Hombre", img: "/products/pantalon1.jpg", price: 110000, color: "Negro", tipo: "Pantalones" },
    { id: 20, name: "Pantalón Jogger Beige", category: "Unisex", img: "/products/pantalon2.jpg", price: 105000, color: "Beige", tipo: "Pantalones" },
    { id: 21, name: "Pantalón Slim Fit", category: "Hombre", img: "/products/pantalon3.jpg", price: 115000, color: "Gris", tipo: "Pantalones" },
    { id: 22, name: "Pantalón Cargo Verde Militar", category: "Hombre", img: "/products/pantalon4.jpg", price: 119000, color: "Café", tipo: "Pantalones" },
    { id: 23, name: "Pantalón Urbano Ancho", category: "Unisex", img: "/products/pantalon5.jpg", price: 112000, color: "Negro", tipo: "Pantalones" },
    { id: 24, name: "Pantalón Negro Urbano", category: "Hombre", img: "/products/pantalon6.jpg", price: 108000, color: "Negro", tipo: "Pantalones" },

    // ACCESORIOS
    { id: 25, name: "Gorra Negra Medallo", category: "Accesorios", img: "/products/gorra1.jpg", price: 65000, color: "Negro", tipo: "Accesorios" },
    { id: 26, name: "Gorra Roja Classic", category: "Accesorios", img: "/products/gorra2.jpg", price: 64000, color: "Rojo", tipo: "Accesorios" },
    { id: 27, name: "Gorra Blanca Clean", category: "Accesorios", img: "/products/gorra3.jpg", price: 63000, color: "Blanco", tipo: "Accesorios" },
    { id: 28, name: "Gorra Negra Logo", category: "Accesorios", img: "/products/gorra4.jpg", price: 68000, color: "Negro", tipo: "Accesorios" },
    { id: 29, name: "Gorra Azul Street", category: "Accesorios", img: "/products/gorra5.jpg", price: 66000, color: "Azul", tipo: "Accesorios" },
    { id: 30, name: "Gorra Camo Urbana", category: "Accesorios", img: "/products/gorra6.jpg", price: 70000, color: "Café", tipo: "Accesorios" },

    // MEDIAS
    { id: 31, name: "Medias Negras Logo", category: "Accesorios", img: "/products/medias1.jpg", price: 25000, color: "Negro", tipo: "Accesorios" },
    { id: 32, name: "Medias Blancas Urban", category: "Accesorios", img: "/products/medias2.jpg", price: 27000, color: "Blanco", tipo: "Accesorios" },
    { id: 33, name: "Medias Grises Classic", category: "Accesorios", img: "/products/medias3.jpg", price: 24000, color: "Gris", tipo: "Accesorios" },
    { id: 34, name: "Medias Flame Red", category: "Accesorios", img: "/products/medias4.jpg", price: 28000, color: "Rojo", tipo: "Accesorios" },

    // CHAQUETAS
    { id: 35, name: "Chaqueta Negra Street", category: "Hombre", img: "/products/chaqueta1.jpg", price: 180000, color: "Negro", tipo: "Chaquetas" },
    { id: 36, name: "Chaqueta Oversize", category: "Unisex", img: "/products/chaqueta2.jpg", price: 190000, color: "Beige", tipo: "Chaquetas" },
    { id: 37, name: "Chaqueta Puffer Roja", category: "Unisex", img: "/products/chaqueta3.jpg", price: 200000, color: "Rojo", tipo: "Chaquetas" },
    { id: 38, name: "Chaqueta Azul Classic", category: "Hombre", img: "/products/chaqueta4.jpg", price: 178000, color: "Azul", tipo: "Chaquetas" },
    { id: 39, name: "Chaqueta Militar Urbana", category: "Unisex", img: "/products/chaqueta5.jpg", price: 195000, color: "Café", tipo: "Chaquetas" },
    { id: 40, name: "Chaqueta Street Beige", category: "Unisex", img: "/products/chaqueta6.jpg", price: 185000, color: "Beige", tipo: "Chaquetas" },
  ];

  // 🔎 FILTRADO
  const filtered = products.filter((p) => {
    const matchCategory = active === "Todo" || p.category === active;
    const matchSearch = p.name.toLowerCase().includes(search.toLowerCase());
    const matchColor = selectedColor === "" || p.color === selectedColor;
    const matchTipo = tipoRopa === "" || p.tipo === tipoRopa;

    const matchMin = minPrice === "" || p.price >= Number(minPrice);
    const matchMax = maxPrice === "" || p.price <= Number(maxPrice);

    return matchCategory && matchSearch && matchColor && matchTipo && matchMin && matchMax;
  });

  return (
    <main className=" text-white w-full mt-1">

      {/* HERO */}
      <section
        className="relative h-[45vh] bg-cover bg-center flex items-center justify-center"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1512436991641-6745cdb1723f')",
        }}
      >
        <div className="absolute inset-0 bg-black/70"></div>
        <h1 className="relative text-5xl font-bold text-red-600">
          Colección Completa
        </h1>
      </section>

      {/* CONTENEDOR */}
      <div className="max-w-6xl mx-auto px-6 py-10">

        {/* BUSCADOR */}
        <input
          type="text"
          placeholder="Buscar producto..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full p-3 mb-8 bg-zinc-900 border border-zinc-700 rounded-lg"
        />

        {/* CATEGORÍAS */}
        <div className="flex flex-wrap gap-3 mb-10">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActive(cat)}
              className={`px-6 py-2 rounded-full border transition cursor-pointer 
                ${
                  active === cat
                    ? "bg-red-600 border-red-600"
                    : "border-zinc-700 hover:bg-zinc-800"
                }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* FILTROS AVANZADOS */}
        <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-6">

          {/* PRECIO MÍNIMO */}
          <div>
            <label className="block text-sm font-medium">Precio mínimo</label>
            <input
              type="number"
              placeholder="Ej: 10000"
              value={minPrice}
              onChange={(e) => setMinPrice(e.target.value)}
              className="border p-2 rounded w-full bg-zinc-900
              [&::-webkit-inner-spin-button]:appearance-none
              [&::-webkit-outer-spin-button]:appearance-none"
            />

            {/* SUGERENCIAS */}
            <div className="mt-1 text-xs text-gray-400 flex gap-2 flex-wrap">
              <span className="px-2 py-1 bg-zinc-800 rounded cursor-pointer hover:bg-zinc-700"
                onClick={() => { setMinPrice(10000); setMaxPrice(100000); }}>
                10k - 100k
              </span>

              <span className="px-2 py-1 bg-zinc-800 rounded cursor-pointer hover:bg-zinc-700"
                onClick={() => { setMinPrice(100000); setMaxPrice(200000); }}>
                100k - 200k
              </span>

              <span className="px-2 py-1 bg-zinc-800 rounded cursor-pointer hover:bg-zinc-700"
                onClick={() => { setMinPrice(300000); setMaxPrice(500000); }}>
                300k - 500k
              </span>
            </div>
          </div>

          {/* PRECIO MÁXIMO */}
          <div>
            <label className="block text-sm font-medium">Precio máximo</label>
            <input
              type="number"
              placeholder="Ej: 750000"
              value={maxPrice}
              onChange={(e) => setMaxPrice(e.target.value)}
              className="border p-2 rounded w-full bg-zinc-900
              [&::-webkit-inner-spin-button]:appearance-none
              [&::-webkit-outer-spin-button]:appearance-none"
            />
          </div>

          {/* COLOR */}
          <div>
            <label className="block text-sm font-medium">Color</label>
            <select
              className="border p-2 bg-zinc-900 rounded w-full cursor-pointer"
              value={selectedColor}
              onChange={(e) => setSelectedColor(e.target.value)}
            >
              <option value="">Todos</option>
              {colors.map((c) => (
                <option key={c} value={c}>{c}</option>
              ))}
            </select>
          </div>

          {/* TIPO */}
          <div>
            <label className="block text-sm font-medium">Tipo de ropa</label>
            <select
              className="border p-2 bg-zinc-900 rounded w-full cursor-pointer"
              value={tipoRopa}
              onChange={(e) => setTipoRopa(e.target.value)}
            >
              <option value="">Todos</option>
              {tipos.map((t) => (
                <option key={t} value={t}>{t}</option>
              ))}
            </select>
          </div>

        </div>
      </div>

      {/* GRID DE PRODUCTOS */}
      <section className="max-w-6xl mx-auto px-6 pb-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">

          {filtered.map((item) => (
            <div
              key={item.id}
              className="bg-zinc-900 rounded-xl overflow-hidden border border-zinc-800 hover:scale-105 transition transform cursor-pointer"
            >
              <img
                src={item.img}
                alt={item.name}
                className="h-64 w-full object-cover"
              />

              <div className="p-5">
                <h3 className="font-semibold text-lg">{item.name}</h3>
                <p className="text-gray-400 text-sm">{item.category}</p>
                <p className="text-red-600 font-bold text-xl mt-2">
                  ${item.price.toLocaleString()}
                </p>

                <button className="mt-4 w-full bg-red-600 py-2 rounded-lg hover:bg-red-700 transition font-semibold cursor-pointer">
                  Ver producto
                </button>
              </div>
            </div>
          ))}

        </div>

        {filtered.length === 0 && (
          <p className="text-center text-gray-400 mt-12 text-lg">
            No hay productos en esta categoría.
          </p>
        )}
      </section>
    </main>
  );
}
