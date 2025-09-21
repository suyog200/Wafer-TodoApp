import type { Request, Response } from "express";
declare global {
    namespace Express {
        interface Request {
            userId?: string;
        }
    }
}
export declare const getTasks: (req: Request, res: Response) => Promise<void>;
export declare const addTask: (req: Request, res: Response) => Promise<void>;
export declare const updateTask: (req: Request, res: Response) => Promise<void>;
export declare const deleteTask: (req: Request, res: Response) => Promise<void>;
export declare const getTaskById: (req: Request, res: Response) => Promise<void>;
export declare const updateTaskStatus: (req: Request, res: Response) => Promise<void>;
