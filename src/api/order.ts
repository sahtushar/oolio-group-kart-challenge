import axios from "axios";
import type { CartItem } from "@/types";

const API_BASE = "https://orderfoodonline.deno.dev/api";

export const placeOrder = async (items: CartItem[]) => {
  const response = await axios.post(`${API_BASE}/order`, {
    items: items.map((item) => ({
      product_id: item.product.id,
      quantity: item.quantity,
    })),
  });
  return response.data;
};
