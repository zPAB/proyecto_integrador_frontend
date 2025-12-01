
"use client";

import { Card, CardHeader, CardContent, CardFooter, CardTitle } from "@/components/ui/Card";

interface Product {
  id: string;
  name: string;
  img: string;
  price: number;
}

export default function ProductCard({
  product,
  onView,
}: {
  product: Product;
  onView: () => void;
}) {
  return (
    <Card className="bg-zinc-900 text-white">
      <CardHeader>
        <img
          src={`/images/${product.img}`}
          alt={product.name}
          className="w-full h-48 object-cover rounded"
        />
      </CardHeader>
      <CardContent>
        <CardTitle>{product.name}</CardTitle>
        <p className="text-red-600 font-bold">${product.price.toLocaleString()}</p>
      </CardContent>
      <CardFooter className="flex justify-between">
        <button
          onClick={onView}
          className="bg-red-600 px-4 py-2 rounded hover:bg-red-700"
        >
          Ver producto
        </button>
      </CardFooter>
    </Card>
  );
}
