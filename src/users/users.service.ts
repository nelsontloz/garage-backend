import { Injectable } from '@nestjs/common';
import User from '../models/user.model';
import { ModelType } from 'typegoose';
import { InjectModel } from 'nestjs-typegoose';

@Injectable()
export class UsersService {

    constructor(@InjectModel(User) private readonly UserModel: ModelType<User>) { }

    async createUser(user: User): Promise<User> {
        const createUser = new this.UserModel(user);
        return await createUser.save();
    }

    async findUserByEmail(email: string): Promise<User> {
        return await this.UserModel.findOne({ email }).exec();
    }
}
