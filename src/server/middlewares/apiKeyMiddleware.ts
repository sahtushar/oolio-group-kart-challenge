import type { Request, Response, NextFunction } from "express";

export const verifyApiKey = (
  req: Request,
  res: Response,
  next: NextFunction,
): void => {
  const apiKey =
    req.headers["api_key"] ||
    req.headers["apikey"] ||
    req.headers["authorization"];

  const normalizedKey = Array.isArray(apiKey) ? apiKey[0] : apiKey;

  if (normalizedKey !== "apitest") {
    res.status(401).json({ message: "Invalid or missing API key" });
    return; // ensure return type is void
  }

  next();
};
