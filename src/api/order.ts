// import axios from "axios";
import type { Order } from "@/types";
import axios from "axios";
import { API_BASE } from "./mockData";

export const placeOrder = async (order: Order) => {
  const headers = {
    api_key: "apitest",
  };

  const response = await axios.post(
    `${API_BASE}/order`,
    {
      items: order.items.map((item) => ({
        product_id: item.product.id,
        quantity: item.quantity,
      })),
    },
    { headers },
  );

  const orders = localStorage.getItem("orders") || "[]";

  localStorage.setItem(
    "orders",
    JSON.stringify([...JSON.parse(orders), order]),
  );

  return response.data;
};
