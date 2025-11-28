"use client";

import { useState } from "react";

export default function ProductsPage() {
  const categories = ["Todo", "Hombre", "Mujer", "Unisex", "Accesorios"];

  const colors = [
    "Negro","Blanco","Rojo","Azul","Amarillo","Verde","Rosa","Gris","Café",
    "Beige","Naranja","Morado","Violeta","Turquesa"
  ];

  const tipos = ["Camisetas", "Pantalones", "Chaquetas", "Tops", "Accesorios"];

  const [active, setActive] = useState("Todo");
  const [search, setSearch] = useState("");
  const [selectedColor, setSelectedColor] = useState("");
  const [tipoRopa, setTipoRopa] = useState("");

  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");

  const products = [
    {
      id: 1,
      name: "Camiseta Oversize Negra",
      category: "Hombre",
      img: "https://images.unsplash.com/photo-1543076447-215ad9ba6923",
      price: 99900,
      color: "Negro",
      tipo: "Camisetas",
    },
    {
      id: 2,
      name: "Chaqueta Urbana Deportiva",
      category: "Unisex",
      img: "https://images.unsplash.com/photo-1618354696220-bddc944eede0",
      price: 179900,
      color: "Rojo",
      tipo: "Chaquetas",
    },
    {
      id: 3,
      name: "Pantalón Cargo Street",
      category: "Hombre",
      img: "https://images.unsplash.com/photo-1600180758895-6347f5426f5b",
      price: 139900,
      color: "Gris",
      tipo: "Pantalones",
    },
    {
      id: 4,
      name: "Top Deportivo Medellín",
      category: "Mujer",
      img: "https://images.unsplash.com/photo-1593032465173-bd7a2e88bcd2",
      price: 79900,
      color: "Blanco",
      tipo: "Tops",
    },
    {
      id: 5,
      name: "Gorra Urban Flow",
      category: "Accesorios",
      img: "",
      price: 49900,
      color: "Negro",
      tipo: "Accesorios",
    },
  ];

  const filtered = products.filter((p) => {
    const matchCategory = active === "Todo" || p.category === active;
    const matchSearch = p.name.toLowerCase().includes(search.toLowerCase());
    const matchColor = selectedColor === "" || p.color === selectedColor;
    const matchTipo = tipoRopa === "" || p.tipo === tipoRopa;

    // FILTROS DE PRECIO
    const matchMin = minPrice === "" || p.price >= Number(minPrice);
    const matchMax = maxPrice === "" || p.price <= Number(maxPrice);

    return matchCategory && matchSearch && matchColor && matchTipo && matchMin && matchMax;
  });

  return (
    <main className="bg-black text-white w-full mt-1">

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

        {/* FILTROS DE CATEGORÍA */}
        <div className="flex flex-wrap gap-3 mb-10">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActive(cat)}
              className={`px-6 py-2 rounded-full border transition 
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
              className="border p-2 rounded w-full 
                [&::-webkit-inner-spin-button]:appearance-none
                [&::-webkit-outer-spin-button]:appearance-none
                appearance-none bg-zinc-900"
            />

            {/* SUGERENCIAS */}
            <div className="mt-1 text-xs text-gray-400 flex gap-2 flex-wrap">

              <span
                className="px-2 py-1 bg-zinc-800 rounded cursor-pointer hover:bg-zinc-700"
                onClick={() => { setMinPrice(10000); setMaxPrice(100000); }}
              >
                10k - 100k
              </span>

              <span
                className="px-2 py-1 bg-zinc-800 rounded cursor-pointer hover:bg-zinc-700"
                onClick={() => { setMinPrice(100001); setMaxPrice(200000); }}
              >
                100k - 200k
              </span>

              <span
                className="px-2 py-1 bg-zinc-800 rounded cursor-pointer hover:bg-zinc-700"
                onClick={() => { setMinPrice(300001); setMaxPrice(500000); }}
              >
                300k - 500k
              </span>

              <span
                className="px-2 py-1 bg-zinc-800 rounded cursor-pointer hover:bg-zinc-700"
                onClick={() => { setMinPrice(500001); setMaxPrice(750000); }}
              >
                500k - 750k
              </span>

              <span
                className="px-2 py-1 bg-red-700 rounded cursor-pointer hover:bg-red-600"
                onClick={() => { setMinPrice(750001); setMaxPrice(""); }}
              >
                Mayor a 750k
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
              className="border p-2 rounded w-full 
                [&::-webkit-inner-spin-button]:appearance-none
                [&::-webkit-outer-spin-button]:appearance-none
                appearance-none bg-zinc-900"
            />
          </div>

          {/* COLOR */}
          <div>
            <label className="block text-sm font-medium">Color</label>
            <select
              className="border p-2 bg-zinc-900 rounded w-full"
              value={selectedColor}
              onChange={(e) => setSelectedColor(e.target.value)}
            >
              <option value="">Todos</option>
              {colors.map((c) => (
                <option key={c} value={c}>{c}</option>
              ))}
            </select>
          </div>

          {/* TIPO DE PRENDA */}
          <div>
            <label className="block text-sm font-medium">Tipo de ropa</label>
            <select
              className="border p-2 bg-zinc-900 rounded w-full"
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
              className="bg-zinc-900 rounded-xl overflow-hidden border border-zinc-800 hover:scale-105 transition transform"
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
                <button className="mt-4 w-full bg-red-600 py-2 rounded-lg hover:bg-red-700 transition font-semibold">
                  Ver producto
                </button>
              </div>
            </div>
          ))}
        </div>

        {filtered.length === 0 && (
          <p className="text-center text-gray-400 mt-12">
            No hay productos en esta categoría.
          </p>
        )}
      </section>
    </main>
  );
}
