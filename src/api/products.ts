// import axios from "axios";
import type { Product } from "@/types";
import axios from "axios";
import { API_BASE } from "./mockData";

export const fetchProducts = async (): Promise<Product[]> => {
  const response = await axios.get(`${API_BASE}/product`);
  return response.data;
};
