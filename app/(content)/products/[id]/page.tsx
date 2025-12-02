
"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { getProductById } from "@/services/productService";
import { Product } from "@/types/product";
import { useCart } from "@/contexts/CartContext"; 

export default function ProductDetail({ params }: { params: { id: string } }) {
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [quantity, setQuantity] = useState(1);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({ name: "", email: "", address: "" });
  const router = useRouter();
  const { addToCart } = useCart(); // ✅ Obtenemos la función para agregar al carrito

  useEffect(() => {
    const fetchProduct = async () => {
      const fetchedProduct = await getProductById(params.id);
      setProduct(fetchedProduct);
      setLoading(false);
    };
    fetchProduct();
  }, [params.id]);

  const handleBuyClick = () => {
    setShowForm(true);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert("Compra realizada con éxito!");
    router.push("/products");
  };

  if (loading) {
    return <p className="text-center text-white">Cargando...</p>;
  }

  return (
    <div className="max-w-6xl mx-auto px-6 py-10 text-white">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Imagen */}
        <div className="relative">
          <img
            src={
              product?.img?.startsWith("http")
                ? product.img
                : `/images/${product?.img}`
            }
            alt={product?.name}
            className="w-full h-96 object-cover rounded-lg shadow-lg"
          />
          {product?.isOffer && (
            <div className="absolute top-4 left-4 bg-red-600 text-white px-4 py-2 rounded-full text-sm font-semibold">
              ¡Oferta!
            </div>
          )}
        </div>

        {/* Información */}
        <div>
          <h2 className="text-3xl font-bold">{product?.name}</h2>
          <p className="text-lg mt-4">{product?.category}</p>
          <p className="text-red-600 font-bold text-2xl mt-2">
            ${product?.price.toLocaleString()}
          </p>

          {/* Características */}
          <h3 className="text-xl font-semibold mt-4">Características</h3>
          <ul className="list-disc pl-5 space-y-2">
            {product?.features?.map((feature, index) => (
              <li key={index} className="text-gray-300">
                {feature}
              </li>
            ))}
          </ul>

          {/* Stock */}
          {product?.stock && product.stock > 0 && (
            <div className="mt-6">
              <p className="text-sm text-gray-400">Quedan {product.stock} unidades</p>
            </div>
          )}

          {/* Cantidad */}
          <div className="mt-4">
            <label htmlFor="quantity" className="text-sm">Cantidad:</label>
            <input
              type="number"
              id="quantity"
              value={quantity}
              onChange={(e) => setQuantity(Number(e.target.value))}
              className="border p-2 bg-zinc-900 text-white rounded w-full mt-2"
              min="1"
            />
          </div>

          {/* Botones */}
          <div className="mt-8 flex gap-4">
            <button
              onClick={() => router.push("/products")}
              className="bg-zinc-800 px-4 py-2 rounded hover:bg-zinc-700"
            >
              Volver
            </button>
            <button
              onClick={() => product && addToCart({ ...product, quantity })} // ✅ Agrega con cantidad
              className="bg-red-600 px-4 py-2 rounded hover:bg-red-700"
            >
              Agregar al carrito
            </button>
          </div>

          {/* Comprar directo */}
          <button
            onClick={handleBuyClick}
            className="mt-6 w-full bg-red-600 py-3 rounded-lg hover:bg-red-700 transition font-semibold"
          >
            Comprar
          </button>
        </div>
      </div>

      {/* Formulario de pago */}
      {showForm && (
        <form onSubmit={handleSubmit} className="mt-8 bg-zinc-900 p-6 rounded-lg shadow-lg">
          {/* Campos del formulario */}
        </form>
      )}
    </div>
  );
}
