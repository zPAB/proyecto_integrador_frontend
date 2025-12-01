// src/types/product.ts
export interface Product {
  id: string;
  name: string;
  description?: string;
  category: string;
  img: string;      // nombre del campo que usaremos para la URL de imagen en MockAPI
  price: number;
  color?: string;
  tipo?: string;
}
