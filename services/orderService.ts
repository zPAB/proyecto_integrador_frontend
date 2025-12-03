// src/services/orderService.ts

export interface OrderItem {
  productId: string;
  quantity: number;
  name?: string;
  price?: number;
}

export interface Order {
  id?: string;
  userId: string;
  items: OrderItem[];
  total: number;
  date: string;
}

const API_URL_ORDERS = "https://6929b1f99d311cddf34ae56d.mockapi.io/orders";
const API_URL_PRODUCTS = "https://692b3daf7615a15ff24f1bd4.mockapi.io/products";

/** Obtener productos por ID */
export async function getProductById(id: string) {
  try {
    const res = await fetch(`${API_URL_PRODUCTS}/${id}`);
    if (!res.ok) throw new Error("Producto no encontrado");
    return await res.json();
  } catch (err) {
    console.error("Error getProductById:", err);
    return null;
  }
}

/** Obtener órdenes por usuario */
export async function getOrdersByUser(userId: string): Promise<Order[]> {
  try {
    const res = await fetch(`${API_URL_ORDERS}?userId=${userId}`, { cache: "no-store" });
    return await res.json();
  } catch (err) {
    console.error("Error getOrdersByUser:", err);
    return [];
  }
}

/** Crear una orden nueva */
export async function createOrder(order: Order): Promise<Order | null> {
  try {
    const res = await fetch(API_URL_ORDERS, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(order),
    });
    return await res.json();
  } catch (err) {
    console.error("Error createOrder:", err);
    return null;
  }
}
