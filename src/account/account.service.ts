import { Injectable } from '@nestjs/common';
import { InjectModel } from 'nestjs-typegoose';
import Account from '../models/account.model';
import { ModelType } from 'typegoose';

@Injectable()
export class AccountService {

    constructor(@InjectModel(Account) private readonly accountModel: ModelType<Account>) { }

    async create(account: Account): Promise<Account> {
        const createdCat = new this.accountModel(account);
        return await createdCat.save();
    }
}
