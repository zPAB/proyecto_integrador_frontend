
"use client";

import { useState, useEffect } from "react";
import { Heart } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";

interface Product {
  id: string;
  name: string;
  img?: string;
  image?: string;
  price: number;
}

export default function ProductCard({
  product,
  onView,
}: {
  product: Product;
  onView?: () => void;
}) {
  const { user } = useAuth();
  const [isFavorited, setIsFavorited] = useState(false);
  const [loading, setLoading] = useState(false);

  // Cargar estado de favoritos
  useEffect(() => {
    if (!user) return;

    const loadFavorites = async () => {
      try {
        const res = await fetch(`https://6929b1f99d311cddf34ae56d.mockapi.io/usuarios/${user.uid}`);
        if (res.ok) {
          const userData = await res.json();
          setIsFavorited(userData.favorites?.includes(product.id) || false);
        }
      } catch (error) {
        console.error("Error loading favorites:", error);
      }
    };

    loadFavorites();
  }, [user, product.id]);

  const handleToggleFavorite = async (e: React.MouseEvent) => {
    e.stopPropagation();

    if (!user) {
      alert("Debes iniciar sesión para agregar favoritos");
      return;
    }

    setLoading(true);

    try {
      const res = await fetch(`https://6929b1f99d311cddf34ae56d.mockapi.io/usuarios/${user.uid}`);
      if (!res.ok) throw new Error("Usuario no encontrado");

      const userData = await res.json();
      let newFavorites = userData.favorites || [];

      if (isFavorited) {
        newFavorites = newFavorites.filter((id: string) => id !== product.id);
      } else {
        if (!newFavorites.includes(product.id)) {
          newFavorites.push(product.id);
        }
      }

      const updateRes = await fetch(
        `https://6929b1f99d311cddf34ae56d.mockapi.io/usuarios/${user.uid}`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ ...userData, favorites: newFavorites }),
        }
      );

      if (updateRes.ok) {
        setIsFavorited(!isFavorited);
      }
    } catch (error) {
      console.error("Error toggling favorite:", error);
      alert("Error al actualizar favorito");
    } finally {
      setLoading(false);
    }
  };

  // Resolver imagen (URL completa o nombre de archivo)
  const resolveImageSrc = () => {
    const imgName = product.img || product.image || "";
    if (imgName.startsWith("http")) {
      return imgName;
    }
    return `/images/${imgName}`;
  };

  return (
    <div className="bg-zinc-900 text-white rounded-lg overflow-hidden border border-zinc-800 hover:border-red-600 transition-colors">
      {/* Imagen con botón favorito */}
      <div className="relative">
        <img
          src={resolveImageSrc()}
          alt={product.name}
          className="w-full h-48 object-cover"
        />
        <button
          onClick={handleToggleFavorite}
          disabled={loading}
          className="absolute top-3 right-3 bg-black/60 hover:bg-black/80 rounded-full p-2 transition-all"
        >
          <Heart
            size={20}
            className={`${
              isFavorited
                ? "fill-red-600 text-red-600"
                : "text-gray-300 hover:text-red-600"
            } transition-colors`}
          />
        </button>
      </div>

      {/* Contenido */}
      <div className="p-4">
        <h3 className="font-semibold mb-2 line-clamp-2">{product.name}</h3>
        <p className="text-red-600 font-bold mb-4">${product.price.toLocaleString()}</p>

        {/* Botón Ver Producto */}
        <button
          onClick={onView}
          className="w-full text-center bg-red-600 hover:bg-red-700 px-4 py-2 rounded font-semibold transition-colors"
        >
          Ver producto
        </button>
      </div>
    </div>
  );
}
