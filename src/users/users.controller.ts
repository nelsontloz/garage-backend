import { Controller, Get, Post, Body } from '@nestjs/common';
import { UsersService } from './users.service';
import User from '../models/user.model';

@Controller('users')
export class UsersController {

    constructor(private readonly userService: UsersService) { }

    @Post()
    async create(@Body() createUser: User) {
        return this.userService.createUser(createUser);
    }
}
