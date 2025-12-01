// src/stores/useProductStore.ts
import { create } from "zustand";
import { Product } from "@/types/product";
import { getProducts } from "@/services/productService";

type State = {
  products: Product[];
  loading: boolean;
  error?: string | null;
  fetchProducts: () => Promise<void>;
};

export const useProductStore = create<State>((set) => ({
  products: [],
  loading: false,
  error: null,
  fetchProducts: async () => {
    set({ loading: true, error: null });
    try {
      const data = await getProducts();
      set({ products: data, loading: false });
    } catch (err: any) {
      set({ error: err.message || "Error", loading: false });
    }
  },
}));
