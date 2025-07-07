import type { Request, Response } from "express";
import type { Order } from "../../types";

export const placeOrder = (req: Request, res: Response) => {
  const { items } = req.body;

  if (!Array.isArray(items) || items.length === 0) {
    return res.status(400).json({ message: "Items are required" });
  }
  const randomUUID = crypto.randomUUID();

  // Fake order response
  const order: Order = {
    date: new Date().toISOString(),
    items,
    orderConfirmed: true,
    orderId: randomUUID,
  };

  res.status(200).json(order);
};
