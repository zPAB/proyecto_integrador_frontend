// src/features/products/ProductCard.tsx
"use client";

import Link from "next/link";
import { Product } from "@/types/product";

export default function ProductCard({ product }: { product: Product }) {
  return (
    <article className="bg-zinc-900 rounded-xl overflow-hidden border border-zinc-800 hover:scale-105 transform transition cursor-pointer">
      <Link href={`/products/${product.id}`}>
        <img
          src={product.img}
          alt={product.name}
          className="h-64 w-full object-cover"
        />
      </Link>

      <div className="p-5">
        <h3 className="font-semibold text-lg">{product.name}</h3>
        <p className="text-gray-400 text-sm">{product.category}</p>

        <p className="text-red-600 font-bold text-xl mt-2">
          ${Number(product.price).toLocaleString()}
        </p>

        <Link
          href={`/products/${product.id}`}
          className="mt-4 inline-block w-full bg-red-600 py-2 rounded-lg hover:bg-red-700 text-center font-semibold"
        >
          Ver producto
        </Link>
      </div>
    </article>
  );
}
