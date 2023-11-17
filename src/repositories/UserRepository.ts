import { UserModel } from "@models/UserModel";

export class UserRepository {
    public async getUserByEmail(email: string): Promise<UserModel> {
        return await UserModel
            .query()
            .findOne(
                {
                    email: email
                }
            )
            .throwIfNotFound();
    }
}