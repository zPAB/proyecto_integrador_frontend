<<<<<<< HEAD

"use client";

import { useEffect, useState } from "react";
=======
"use client";

import { useState, useEffect } from "react";
>>>>>>> 7670bdc (reorganizando productos y perfil y añadiendo una pagina de contacto)
import { useRouter } from "next/navigation";
import { getProductById } from "@/services/productService";
import { Product } from "@/types/product"; // Asegúrate de tener el tipo Product

export default function ProductDetail({ params }: { params: { id: string } }) {
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [quantity, setQuantity] = useState(1);
  const [showForm, setShowForm] = useState(false); // Para mostrar el formulario de pago
  const [formData, setFormData] = useState({ name: "", email: "", address: "" });
  const router = useRouter();

<<<<<<< HEAD
export default function ProductDetail({ params }: Props) {
  const [product, setProduct] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const fetchProduct = async () => {
      const data = await getProductById(params.id);
      setProduct(data);
=======
  useEffect(() => {
    const fetchProduct = async () => {
      const fetchedProduct = await getProductById(params.id);
      setProduct(fetchedProduct);
>>>>>>> 7670bdc (reorganizando productos y perfil y añadiendo una pagina de contacto)
      setLoading(false);
    };
    fetchProduct();
  }, [params.id]);
<<<<<<< HEAD

  if (loading) {
    return <div className="p-10 text-white">Cargando producto...</div>;
  }
=======
>>>>>>> 7670bdc (reorganizando productos y perfil y añadiendo una pagina de contacto)

  const handleBuyClick = () => {
    setShowForm(true); // Muestra el formulario de pago cuando el usuario hace clic en "Comprar"
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Aquí iría la lógica para procesar el pago (puedes integrarlo con alguna API de pago si lo deseas)
    alert("Compra realizada con éxito!");
    router.push("/products");
  };

  if (loading) {
    return <p className="text-center text-white">Cargando...</p>;
  }

  return (
<<<<<<< HEAD
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
=======
    <div className="max-w-6xl mx-auto px-6 py-10 text-white">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Imagen del Producto */}
        <div className="relative">
          <img
            src={product?.img}
            alt={product?.name}
            className="w-full h-96 object-cover rounded-lg shadow-lg"
          />
          {product?.isOffer && (
            <div className="absolute top-4 left-4 bg-red-600 text-white px-4 py-2 rounded-full text-sm font-semibold">
              ¡Oferta!
            </div>
          )}
        </div>

        {/* Información del Producto */}
        <div>
          <h2 className="text-3xl font-bold">{product?.name}</h2>
          <p className="text-lg mt-4">{product?.category}</p>
          <p className="text-red-600 font-bold text-2xl mt-2">
            ${product?.price.toLocaleString()}
            {product?.isOffer && (
              <span className="line-through text-gray-400 text-base ml-2">
                ${product?.originalPrice?.toLocaleString()}
              </span>
            )}
          </p>

          {/* Descripción y Detalles */}
          <div className="mt-6 space-y-4">
            <h3 className="text-xl font-semibold">Descripción</h3>
            <p className="text-gray-300">{product?.description}</p>

            {/* Características del Producto */}
            <h3 className="text-xl font-semibold mt-4">Características</h3>
            <ul className="list-disc pl-5 space-y-2">
              {product?.features?.map((feature, index) => (
                <li key={index} className="text-gray-300">
                  {feature}
                </li>
              ))}
            </ul>
          </div>

          {/* Barra de Stock */}
          {product?.stock && product.stock > 0 && (
            <div className="mt-6">
              <p className="text-sm text-gray-400">Quedan {product.stock} unidades</p>
              <div className="relative pt-1">
                <div className="flex mb-2 items-center justify-between">
                  <div>
                    <span className="text-xs font-semibold inline-block py-1 px-2 uppercase rounded-full text-teal-600 bg-teal-200">
                      {Math.min((product.stock / 100) * 100, 100)}% Stock
                    </span>
                  </div>
                </div>
                <div className="flex mb-2">
                  <div
                    className="flex-1 bg-teal-200 rounded-full"
                    style={{
                      width: `${(product.stock / 100) * 100}%`,
                      height: "5px",
                      backgroundColor: "#38b2ac",
                    }}
                  ></div>
                </div>
              </div>
            </div>
          )}

          {/* Selector de Cantidad */}
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

          <button
            onClick={handleBuyClick}
            className="mt-6 w-full bg-red-600 py-3 rounded-lg hover:bg-red-700 transition font-semibold"
          >
            Comprar
          </button>
        </div>
      </div>

      {/* Formulario de Pago */}
      {showForm && (
        <form onSubmit={handleSubmit} className="mt-8 bg-zinc-900 p-6 rounded-lg shadow-lg">
          <h3 className="text-2xl mb-4 text-center font-bold text-red-600">Detalles de pago</h3>

          {/* Nombre */}
          <div className="mb-4">
            <label className="block text-sm font-medium">Nombre</label>
            <input
              type="text"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="w-full p-3 bg-zinc-800 rounded-lg text-white"
              required
            />
          </div>

          {/* Correo electrónico */}
          <div className="mb-4">
            <label className="block text-sm font-medium">Correo electrónico</label>
            <input
              type="email"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              className="w-full p-3 bg-zinc-800 rounded-lg text-white"
              required
            />
          </div>

          {/* Dirección */}
          <div className="mb-4">
            <label className="block text-sm font-medium">Dirección</label>
            <input
              type="text"
              value={formData.address}
              onChange={(e) => setFormData({ ...formData, address: e.target.value })}
              className="w-full p-3 bg-zinc-800 rounded-lg text-white"
              required
            />
          </div>

          {/* Botón de Confirmación */}
          <button
            type="submit"
            className="w-full bg-green-600 py-3 rounded-lg hover:bg-green-700 transition font-semibold"
          >
            Confirmar Compra
          </button>
        </form>
      )}
    </div>
>>>>>>> 7670bdc (reorganizando productos y perfil y añadiendo una pagina de contacto)
  );
}
