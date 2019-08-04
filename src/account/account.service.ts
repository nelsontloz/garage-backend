import { Injectable } from '@nestjs/common';
import { InjectModel } from 'nestjs-typegoose';
import Account, { AccountType } from '../models/account.model';
import { ModelType } from 'typegoose';
import { ObjectId } from 'bson';

@Injectable()
export class AccountService {
  constructor(
    @InjectModel(Account) private readonly accountModel: ModelType<Account>,
  ) {}

  async create(account: Account): Promise<Account> {
    const createdCat = new this.accountModel(account);
    return await createdCat.save();
  }

  async findByEmail(email: string): Promise<Account> {
    return await this.accountModel.findOne({ email });
  }

  async findCustomerAccounts(): Promise<Account[]> {
    return await this.accountModel.find(
      { type: AccountType.CUSTOMER },
      { password: 0 },
    );
  }

  async deleteCustomer(accountId: string) {
    return await this.accountModel.deleteOne({
      _id: new ObjectId(accountId),
    });
  }
}
