import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken"
import fs from "fs";
import { join } from "path";
import NoTokenException from "@exceptions/NoTokenException";
import InvalidTokenException from "@exceptions/InvalidTokenException";

const JWT_PUBLIC_KEY = fs.readFileSync(join(__dirname, "..", "..", "keys", "jwt_public.key"));

export const authenticateToken = (req: Request<any>, res: Response, next: NextFunction) => {
    const auth_header = req.headers.authorization;
    const token = auth_header && auth_header.split(" ")[1];

    if (!token) {
        next(new NoTokenException());
        return;
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
                next(new InvalidTokenException());
                return;
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