// src/app/(content)/products/page.tsx
"use client";

import { useEffect, useMemo, useState } from "react";
import { useProductStore } from "@/stores/useProductStore";
import ProductCard from "@/features/products/ProductCard";

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

  const products = useProductStore((s) => s.products);
  const loading = useProductStore((s) => s.loading);
  const fetchProducts = useProductStore((s) => s.fetchProducts);

  useEffect(() => {
    if (products.length === 0) fetchProducts();
  }, [fetchProducts]);

  // Si quieres usar el array local con 40 productos en vez de MockAPI,
  // reemplaza el store.products por tu array local aquí.
  const filtered = useMemo(() => {
    return products.filter((p) => {
      const matchCategory = active === "Todo" || p.category === active;
      const matchSearch = p.name.toLowerCase().includes(search.toLowerCase());
      const matchColor = selectedColor === "" || p.color === selectedColor;
      const matchTipo = tipoRopa === "" || p.tipo === tipoRopa;
      const matchMin = minPrice === "" || p.price >= Number(minPrice);
      const matchMax = maxPrice === "" || p.price <= Number(maxPrice);

      return matchCategory && matchSearch && matchColor && matchTipo && matchMin && matchMax;
    });
  }, [products, active, search, selectedColor, tipoRopa, minPrice, maxPrice]);

  return (
    <main className="text-white w-full mt-1">
      {/* HERO */}
      <section
        className="relative h-[45vh] bg-cover bg-center flex items-center justify-center"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1512436991641-6745cdb1723f')",
        }}
      >
        <div className="absolute inset-0 bg-black/70"></div>
        <h1 className="relative text-5xl font-bold text-red-600">Colección Completa</h1>
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
              className={`px-6 py-2 rounded-full border transition cursor-pointer ${
                active === cat ? "bg-red-600 border-red-600" : "border-zinc-700 hover:bg-zinc-800"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* FILTROS AVANZADOS */}
        <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-6 mb-8">
          <div>
            <label className="block text-sm font-medium">Precio mínimo</label>
            <input
              type="number"
              placeholder="Ej: 10000"
              value={minPrice}
              onChange={(e) => setMinPrice(e.target.value)}
              className="border p-2 rounded w-full bg-zinc-900 [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
            />
            <div className="mt-1 text-xs text-gray-400 flex gap-2 flex-wrap">
              <span
                className="px-2 py-1 bg-zinc-800 rounded cursor-pointer hover:bg-zinc-700"
                onClick={() => {
                  setMinPrice("10000");
                  setMaxPrice("100000");
                }}
              >
                10k - 100k
              </span>
              <span
                className="px-2 py-1 bg-zinc-800 rounded cursor-pointer hover:bg-zinc-700"
                onClick={() => {
                  setMinPrice("100000");
                  setMaxPrice("200000");
                }}
              >
                100k - 200k
              </span>
              <span
                className="px-2 py-1 bg-zinc-800 rounded cursor-pointer hover:bg-zinc-700"
                onClick={() => {
                  setMinPrice("300000");
                  setMaxPrice("500000");
                }}
              >
                300k - 500k
              </span>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium">Precio máximo</label>
            <input
              type="number"
              placeholder="Ej: 750000"
              value={maxPrice}
              onChange={(e) => setMaxPrice(e.target.value)}
              className="border p-2 rounded w-full bg-zinc-900 [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
            />
          </div>

          <div>
            <label className="block text-sm font-medium">Color</label>
            <select
              className="border p-2 bg-zinc-900 rounded w-full cursor-pointer"
              value={selectedColor}
              onChange={(e) => setSelectedColor(e.target.value)}
            >
              <option value="">Todos</option>
              {colors.map((c) => (
                <option key={c} value={c}>
                  {c}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium">Tipo de ropa</label>
            <select
              className="border p-2 bg-zinc-900 rounded w-full cursor-pointer"
              value={tipoRopa}
              onChange={(e) => setTipoRopa(e.target.value)}
            >
              <option value="">Todos</option>
              {tipos.map((t) => (
                <option key={t} value={t}>
                  {t}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* GRID DE PRODUCTOS */}
      <section className="max-w-6xl mx-auto px-6 pb-16">
        {loading ? (
          <p className="text-center">Cargando...</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
            {filtered.map((item) => (
              <ProductCard key={item.id} product={item} />
            ))}
          </div>
        )}

        {!loading && filtered.length === 0 && (
          <p className="text-center text-gray-400 mt-12 text-lg">No hay productos en esta categoría.</p>
        )}
      </section>
    </main>
  );
}
