// src/app/(content)/products/[id]/page.tsx
import { getProductById } from "@/services/productService";

type Props = { params: { id: string } };

export default async function ProductDetail({ params }: Props) {
  const product = await getProductById(params.id);

  if (!product) {
    return <div className="p-10 text-white">Producto no encontrado</div>;
  }

  return (
    <main className="max-w-4xl mx-auto px-6 py-10 text-white">
      <img src={product.img} alt={product.name} className="w-full h-96 object-cover rounded" />
      <h1 className="text-3xl font-bold mt-6">{product.name}</h1>
      <p className="text-red-600 text-2xl font-bold mt-4">${product.price.toLocaleString()}</p>
      <p className="text-gray-300 mt-4">{product.description}</p>
    </main>
  );
}
