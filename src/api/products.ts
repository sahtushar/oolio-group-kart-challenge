// import axios from "axios";
import type { Product } from "@/types";
import { productsData } from "./mockData";

// const API_BASE = "https://orderfoodonline.deno.dev/api";

export const fetchProducts = async (): Promise<Product[]> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(productsData as unknown as Product[]);
    }, 1000);
  });
};
