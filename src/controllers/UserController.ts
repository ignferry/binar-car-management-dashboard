import type { NextFunction, Request, Response } from 'express';
import { UserService } from '@services/UserService';

interface IAuthBody {
  email: string;
  password: string;
}

export class UserController {
  private readonly userService = new UserService();

  public register = async (
    req: Request<unknown, unknown, IAuthBody>,
    res: Response,
    next: NextFunction,
  ): Promise<void> => {
    try {
      await this.userService.register(req.body.email, req.body.password);
      res.status(200).json({
        message: 'Registration successful',
      });
    } catch (e) {
      next(e);
    }
  };

  public login = async (
    req: Request<unknown, unknown, IAuthBody>,
    res: Response,
    next: NextFunction,
  ): Promise<void> => {
    try {
      res.status(200).json({
        token: await this.userService.login(req.body.email, req.body.password),
      });
      next();
    } catch (e) {
      next(e);
    }
  };
}
