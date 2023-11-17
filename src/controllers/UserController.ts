import ValidationException from "@exceptions/ValidationException";
import { NextFunction, Request, Response } from "express";
import { UserService } from "services/UserService";

interface ILoginBody {
    email: string;
    password: string
}

export class UserController {
    private userService = new UserService();

    public login = async (req: Request<{}, {}, ILoginBody>, res: Response, next: NextFunction) => {
        try {
            if (!req.body.email || !req.body.password) {
                throw new ValidationException("Email and Password Required")
            }
            res.status(200).json(
                {
                    token: await this.userService.login(req.body.email, req.body.password)
                }
            );
            next();
        } catch (e) {
            next(e);
        }
    }
}