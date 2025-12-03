// src/types/product.ts
export interface Product {
  id: string;
  name: string;
  description?: string;
  category: string;
  img?: string; // URL o nombre de archivo de la imagen en MockAPI
  image?: string; // algunos endpoints pueden devolver 'image'
  price: number;
  color?: string;
  tipo?: string;
  stock?: number;
  features?: string[];
  isOffer?: boolean;
  // campos extra que pueden venir en el mock
  [key: string]: unknown;
}
