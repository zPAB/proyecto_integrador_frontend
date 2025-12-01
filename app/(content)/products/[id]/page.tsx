
"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { getProductById } from "@/services/productService";

type Props = { params: { id: string } };

export default function ProductDetail({ params }: Props) {
  const [product, setProduct] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const fetchProduct = async () => {
      const data = await getProductById(params.id);
      setProduct(data);
      setLoading(false);
    };
    fetchProduct();
  }, [params.id]);

  if (loading) {
    return <div className="p-10 text-white">Cargando producto...</div>;
  }

  if (!product) {
    return <div className="p-10 text-white">Producto no encontrado</div>;
  }

  return (
    <main className="max-w-4xl mx-auto px-6 py-10 text-white">
      <img
        src={`/images/${product.img}`} // Ajusta si viene de la API
        alt={product.name}
        className="w-full h-96 object-cover rounded"
      />
      <h1 className="text-3xl font-bold mt-6">{product.name}</h1>
      <p className="text-red-600 text-2xl font-bold mt-4">
        ${product.price.toLocaleString()}
      </p>
      <p className="text-gray-300 mt-4">{product.description}</p>

      <div className="mt-6 text-gray-400">
        <p>Categoría: {product.category}</p>
        <p>Color: {product.color}</p>
        <p>Tipo: {product.tipo}</p>
      </div>

      <div className="mt-8 flex gap-4">
        <button
          onClick={() => router.push("/products")}
          className="bg-zinc-800 px-4 py-2 rounded hover:bg-zinc-700"
        >
          Volver a productos
        </button>
        <button className="bg-red-600 px-4 py-2 rounded hover:bg-red-700">
          Agregar al carrito
        </button>
      </div>
    </main>
  );
}
