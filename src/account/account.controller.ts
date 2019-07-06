import { Controller, Post, Body } from '@nestjs/common';
import { plainToClass } from 'class-transformer';
import { CustomerService } from '../customer/customer.service';
import { UsersService } from '../users/users.service';
import AccountCreation from '../models/account-creation.model ';
import User, { UserType } from '../models/user.model';
import Customer from '../models/customer.model';
import { ObjectId } from 'bson';
import Account, { AccountType } from '../models/account.model';
import { AccountService } from './account.service';

@Controller('account')
export class AccountController {

    constructor(private readonly userService: UsersService, private readonly customerService: CustomerService,
                private readonly accountService: AccountService) { }

    @Post()
    async createCustomerAccount(@Body() account: AccountCreation) {
        const user: User = plainToClass(User, account);
        const customer: Customer = plainToClass(Customer, account);
        user.type = UserType.CUSTOMER;
        const customerPromise = this.customerService.create(customer);
        return await customerPromise.then((createdCustomer: Customer) => {
            user.customer = new ObjectId(createdCustomer._id);
            return this.userService.createUser(user);
        }).then((createdAccount: User) => {
            return {
                message: 'account created!',
            };
        });
    }

    @Post('/customer')
    async createCustomer(@Body() account: AccountCreation) {
        const createdAccount: Account = plainToClass(Account, account);
        createdAccount.type = AccountType.CUSTOMER;
        this.accountService.create(createdAccount);
    }
}
