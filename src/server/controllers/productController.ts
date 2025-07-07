import type { Request, Response } from "express";
import { productsData } from "../../api/mockData.js";

export const getProducts = (__req: Request, res: Response) => {
  res.json(productsData);
};

export const getProductById = (req: Request, res: Response) => {
  const { productId } = req.params;
  const product = productsData.find((p) => p.id === productId);

  if (!product) {
    return res.status(404).json({ message: "Product not found" });
  }

  res.json(product);
};
