"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.protect = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const protect = (req, res, next) => {
    const authHeader = req.headers.authorization;
    if (authHeader && authHeader.startsWith("Bearer")) {
        const token = authHeader.split(" ")[1];
        try {
            const decoded = jsonwebtoken_1.default.verify(token, process.env.JWT_SECRET || "test");
            if (typeof decoded === "object" && decoded !== null && "id" in decoded) {
                // @ts-ignore
                req.userId = decoded.id;
                next();
            }
            else {
                return res.status(401).json({ message: "Invalid token payload" });
            }
        }
        catch (err) {
            return res.status(401).json({ message: "Invalid token" });
        }
    }
    else {
        return res.status(401).json({ message: "No token provided" });
    }
};
exports.protect = protect;
//# sourceMappingURL=auth.js.map