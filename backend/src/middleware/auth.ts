import jwt from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";

export const protect = (req: Request, res: Response, next: NextFunction) => {
  const authHeader = req.headers.authorization;

  if (authHeader && authHeader.startsWith("Bearer")) {
    const token = authHeader.split(" ")[1];
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET || "test");
      if (typeof decoded === "object" && decoded !== null && "id" in decoded) {
        // @ts-ignore
        req.userId = (decoded as jwt.JwtPayload).id;
        next();
      } else {
        return res.status(401).json({ message: "Invalid token payload" });
      }
    } catch (err) {
      return res.status(401).json({ message: "Invalid token" });
    }
  } else {
    return res.status(401).json({ message: "No token provided" });
  }
};
