<<<<<<< HEAD

=======
>>>>>>> 7670bdc (reorganizando productos y perfil y añadiendo una pagina de contacto)
"use client";

import { useEffect, useMemo, useState } from "react";
import { useProductStore } from "@/stores/useProductStore";
import ProductCard from "@/features/products/ProductCard";
import ProductModal from "@/features/products/ProductModal";

export default function ProductsPage() {
<<<<<<< HEAD
  const [selectedProductId, setSelectedProductId] = useState<string | null>(null);
=======
  const categories = ["Todo", "Hombre", "Mujer", "Unisex", "Accesorios"];
  const colors = ["Negro", "Blanco", "Rojo", "Azul", "Gris", "Café", "Beige"];
  const tipos = ["Camisetas", "Pantalones", "Chaquetas", "Tops", "Accesorios"];

  const [active, setActive] = useState("Todo");
  const [search, setSearch] = useState("");
  const [selectedColor, setSelectedColor] = useState("");
  const [tipoRopa, setTipoRopa] = useState("");
  const [minPrice, setMinPrice] = useState(0); // Cambié a tipo numérico
  const [maxPrice, setMaxPrice] = useState(750000); // Cambié a tipo numérico
>>>>>>> 7670bdc (reorganizando productos y perfil y añadiendo una pagina de contacto)

  const products = useProductStore((s) => s.products);
  const loading = useProductStore((s) => s.loading);
  const fetchProducts = useProductStore((s) => s.fetchProducts);

  useEffect(() => {
    if (products.length === 0) fetchProducts();
  }, [fetchProducts, products.length]);

<<<<<<< HEAD
  const filtered = useMemo(() => {
    return products; // Aquí puedes mantener tu lógica de filtros si la necesitas
  }, [products]);

  return (
    <main className="text-white w-full mt-1">
      {/* Aquí mantienes tu buscador y filtros */}
=======
  // Filtro de productos basado en los valores seleccionados
  const filtered = useMemo(() => {
    return products.filter((p) => {
      // Verifica la categoría seleccionada
      const matchCategory = active === "Todo" || p.category === active;

      // Verifica la búsqueda de nombre del producto
      const matchSearch = p.name.toLowerCase().includes(search.toLowerCase());

      // Verifica el color seleccionado
      const matchColor = selectedColor === "" || p.color === selectedColor;

      // Verifica el tipo de ropa seleccionado
      const matchTipo = tipoRopa === "" || p.tipo === tipoRopa;

      // Verifica los precios (asegurándose de que minPrice y maxPrice son números)
      const matchMin = minPrice === 0 || p.price >= minPrice;
      const matchMax = maxPrice === 750000 || p.price <= maxPrice;

      // Retorna el producto solo si todos los filtros coinciden
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
          {/* PRECIO MÍNIMO */}
          <div>
            <label className="block text-sm font-medium">Precio mínimo</label>
            <input
              type="number"
              placeholder="Ej: 10000"
              value={minPrice}
              onChange={(e) => setMinPrice(Number(e.target.value))}
              className="border p-2 rounded w-full bg-zinc-900 [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
            />
            {/* Sugerencias de precio removidas: ahora solo input numérico */}
          </div>

          {/* PRECIO MÁXIMO */}
          <div>
            <label className="block text-sm font-medium">Precio máximo</label>
            <input
              type="number"
              placeholder="Ej: 750000"
              value={maxPrice}
              onChange={(e) => setMaxPrice(Number(e.target.value))}
              className="border p-2 rounded w-full bg-zinc-900 [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
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
>>>>>>> 7670bdc (reorganizando productos y perfil y añadiendo una pagina de contacto)
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
