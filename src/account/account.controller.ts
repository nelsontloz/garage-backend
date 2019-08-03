import { Controller, Post, Body, Get } from '@nestjs/common';
import { plainToClass } from 'class-transformer';
import AccountCreation from '../models/account-creation.model ';
import Account, { AccountType } from '../models/account.model';
import { AccountService } from './account.service';
import * as bcryptjs from 'bcryptjs';

@Controller('account')
export class AccountController {
  constructor(private readonly accountService: AccountService) {}

  @Post()
  async createCustomer(@Body() account: AccountCreation) {
    const createdAccount: Account = plainToClass(Account, account);
    createdAccount.type = AccountType.CUSTOMER;
    createdAccount.password = await bcryptjs.hash(account.password, 10);
    return await this.accountService.create(createdAccount).then(() => {
      return {
        message: 'account created!',
      };
    });
  }

  @Get()
  async getAccounts() {
    return await this.accountService
      .findCustomerAccounts()
      .then((customers: Account[]) => {
        return customers;
      });
  }
}
