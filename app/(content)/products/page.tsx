
"use client";

import { useEffect, useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";
import { useProductStore } from "@/stores/useProductStore";
import ProductCard from "@/features/products/ProductCard";
import ProductModal from "@/features/products/ProductModal";

export default function ProductsPage() {
  const [selectedProductId, setSelectedProductId] = useState<string | null>(null);
  const searchParams = useSearchParams();

  const categories = ["Todo", "Hombre", "Mujer", "Unisex", "Accesorios"];
  const colors = ["Negro", "Blanco", "Rojo", "Azul", "Gris", "Café", "Beige"];
  const tipos = ["Camisetas", "Pantalones", "Chaquetas", "Tops", "Accesorios"];

  // Obtener categoría del query parameter
  const initialCategory = searchParams.get("cat") 
    ? searchParams.get("cat").charAt(0).toUpperCase() + searchParams.get("cat").slice(1)
    : "Todo";

  const [active, setActive] = useState(initialCategory);
  const [search, setSearch] = useState("");
  const [selectedColor, setSelectedColor] = useState("");
  const [tipoRopa, setTipoRopa] = useState("");
  // Use empty string for unset price filters so inputs start blank
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");

  const products = useProductStore((s) => s.products);
  const loading = useProductStore((s) => s.loading);
  const fetchProducts = useProductStore((s) => s.fetchProducts);

  useEffect(() => {
    if (products.length === 0) fetchProducts();
  }, [fetchProducts, products.length]);

  const filtered = useMemo(() => {
    return products.filter((p) => {
      const matchCategory = active === "Todo" || p.category === active;
      const matchSearch = p.name.toLowerCase().includes(search.toLowerCase());
      const matchColor = selectedColor === "" || p.color === selectedColor;
      const matchTipo = tipoRopa === "" || p.tipo === tipoRopa;
      const matchMin = minPrice === "" ? true : p.price >= Number(minPrice);
      const matchMax = maxPrice === "" ? true : p.price <= Number(maxPrice);

      return matchCategory && matchSearch && matchColor && matchTipo && matchMin && matchMax;
    });
  }, [products, active, search, selectedColor, tipoRopa, minPrice, maxPrice]);

  // Compute catalog-wide min/max prices for display above filters
  const catalogPriceRange = useMemo(() => {
    if (!products || products.length === 0) return { min: null as number | null, max: null as number | null };
    const prices = products.map((p) => p.price);
    return { min: Math.min(...prices), max: Math.max(...prices) };
  }, [products]);

  const formatMoney = (v: number | null) => (v === null ? "-" : `$${v.toLocaleString('es-ES')}`);

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

        {/* PRECIOS DEL CATÁLOGO */}
        <div className="flex gap-6 mb-6">
          <div className="text-sm text-gray-300">
            Precio más barato: <span className="font-semibold text-white">{formatMoney(catalogPriceRange.min)}</span>
          </div>
          <div className="text-sm text-gray-300">
            Precio más caro: <span className="font-semibold text-white">{formatMoney(catalogPriceRange.max)}</span>
          </div>
        </div>

        {/* FILTROS AVANZADOS */}
        <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-6 mb-8">
          {/* PRECIO MÍNIMO */}
          <div>
            <label className="block text-sm font-medium">Precio mínimo</label>
            <div className="relative">
              <input
                type="number"
                aria-label="Precio mínimo"
                placeholder="Ej: 10000"
                value={minPrice}
                onChange={(e) => setMinPrice(e.target.value)}
                className="border p-2 rounded w-full bg-zinc-900 [&::-webkit-outer-spin-button]:hidden [&::-webkit-inner-spin-button]:hidden"
              />
 
            </div>
          </div>

          {/* PRECIO MÁXIMO */}
          <div>
            <label className="block text-sm font-medium">Precio máximo</label>
            <div className="relative">
              <input
                type="number"
                aria-label="Precio máximo"
                placeholder="Ej: 200000"
                value={maxPrice}
                onChange={(e) => setMaxPrice(e.target.value)}
                max={200000}
                className="border p-2 rounded w-full bg-zinc-900 [&::-webkit-outer-spin-button]:hidden [&::-webkit-inner-spin-button]:hidden"
              />
 
            </div>
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
                <option key={c} value={c}>
                  {c}
                </option>
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
              <ProductCard
                key={item.id}
                product={item}
                onView={() => setSelectedProductId(item.id)}
              />
            ))}
          </div>
        )}
      </section>

      {/* Modal */}
      {selectedProductId && (
        <ProductModal
          productId={selectedProductId}
          onClose={() => setSelectedProductId(null)}
        />
      )}
    </main>
  );
}
