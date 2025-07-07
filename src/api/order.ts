// import axios from "axios";
import type { Order } from "@/types";
import axios from "axios";
import { API_BASE } from "./mockData";

export const placeOrder = async (items: Order["items"]) => {
  const headers = {
    api_key: "apitest",
  };

  const response = await axios.post(
    `${API_BASE}/order`,
    {
      items: items.map((item) => ({
        product_id: item.product.id,
        quantity: item.quantity,
        product: {
          price: item.product.price,
          name: item.product.name,
        },
      })),
    },
    { headers },
  );

  const orders = localStorage.getItem("orders") || "[]";

  localStorage.setItem(
    "orders",
    JSON.stringify([...JSON.parse(orders), response.data]),
  );

  return response.data;
};
