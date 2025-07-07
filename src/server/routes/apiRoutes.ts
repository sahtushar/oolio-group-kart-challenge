import type { Express } from "express";
import {
  getProducts,
  getProductById,
} from "../controllers/productController.js";
import { placeOrder } from "../controllers/orderController.js";
import { verifyApiKey } from "../middlewares/apiKeyMiddleware.js";

export const registerRoutes = (app: Express) => {
  app.get("/api/product", (req, res) => {
    void getProducts(req, res);
  });
  app.get("/api/product/:productId", (req, res) => {
    void getProductById(req, res);
  });
  app.post("/api/order", verifyApiKey, (req, res) => {
    void placeOrder(req, res);
  });
};
