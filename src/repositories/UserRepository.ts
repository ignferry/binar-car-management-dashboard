import { UserModel } from '@models/UserModel';
import bcrypt from 'bcrypt';

export class UserRepository {
  public async addUser(email: string, password: string): Promise<void> {
    await UserModel.query()
      .insert({
        email,
        password: await bcrypt.hash(password, 10),
        is_admin: true,
      })
      .returning('*');
  }

  public async getUserByEmail(email: string): Promise<UserModel | undefined> {
    return await UserModel.query().findOne({
      email,
    });
  }
}
