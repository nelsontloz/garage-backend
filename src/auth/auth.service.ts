import { Injectable } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import User from '../models/user.model';
import { InjectModel } from 'nestjs-typegoose';
import Session from '../models/session.model';
import { ModelType } from 'typegoose';

// TODO: add auth
@Injectable()
export class AuthService {
    constructor(@InjectModel(Session) private readonly sessionModel: ModelType<Session>,
                private readonly usersService: UsersService) { }

    async authenticate(email: string, password: string): Promise<any> {
        return await this.usersService.findUserByEmail(email)
            .then((user: User) => {
                if (user.password !== password) {
                    return;
                }
                const createSession = new this.sessionModel({ accessToken: this.generateMongoId(), user: user._id });
                return createSession.save();
            });
    }

    async validateSession(accessToken: string) {
        return await this.sessionModel.findOne({accessToken}).populate('user');
    }

    private generateMongoId() {
    // tslint:disable-next-line: no-bitwise
        const timestamp = (new Date().getTime() / 1000 | 0).toString(16);
        return timestamp + 'xxxxxxxxxxxxxxxx'.replace(/[x]/g, () => {
    // tslint:disable-next-line: no-bitwise
            return (Math.random() * 16 | 0).toString(16);
        }).toLowerCase();
    }
}
