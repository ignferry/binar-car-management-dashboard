import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken"
import fs from "fs";
import { join } from "path";

const JWT_PUBLIC_KEY = fs.readFileSync(join(__dirname, "..", "..", "keys", "jwt_public.key"));

export const authenticateToken = (req: Request<any>, res: Response, next: NextFunction) => {
    const auth_header = req.headers.authorization;
    const token = auth_header && auth_header.split(" ")[1];

    if (!token) {
        return res.status(401).json(
            {
                message: "Invalid Token"
            }
        );
    }

    jwt.verify(
        token,
        JWT_PUBLIC_KEY,
        (err) => {
            if (err) {
                return res.status(403).json(
                    {
                        message: "Forbidden"
                    }
                )
            }
            next();
        }
    );
}