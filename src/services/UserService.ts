import WrongAuthCredentialsException from "@exceptions/WrongAuthCredentialsException";
import { UserRepository } from "@repositories/UserRepository";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import fs from "fs";
import { join } from "path";

export class UserService {
    private UserRepository = new UserRepository();
    private JWT_PRIVATE_KEY: Buffer;
    constructor () {
        try {
            this.JWT_PRIVATE_KEY = fs.readFileSync(join(__dirname, "..", "..", "keys", "jwt_private.key"));
        } catch {
            throw new Error("JWT Key Undefined");
        }
    }

    public async login(email: string, password: string): Promise<string> {
        const user = await this.UserRepository.getUserByEmail(email);

        if (!user || !(await bcrypt.compare(password, user.password))) {
            throw new WrongAuthCredentialsException();
        }

        return jwt.sign(
            {
                id: user.id,
                email: user.email
            },
            this.JWT_PRIVATE_KEY,
            {
                expiresIn: "8h",
                algorithm: "RS256"
            }
        );
    }
}