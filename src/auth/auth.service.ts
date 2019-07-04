import { Injectable, UnauthorizedException, ConflictException } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import User from '../models/user.model';
import { InjectModel } from 'nestjs-typegoose';
import Session from '../models/session.model';
import { ModelType } from 'typegoose';
import * as moment from 'moment';

// TODO: add auth
@Injectable()
export class AuthService {
    constructor(@InjectModel(Session) private readonly sessionModel: ModelType<Session>,
                private readonly usersService: UsersService) { }

    async authenticate(email: string, password: string): Promise<any> {
        let userId: string;
        return await this.usersService.findUserByEmail(email)
            .then((user: User) => {
                if (!user || user.password !== password) {
                    throw new UnauthorizedException();
                }
                userId = user._id;
                return this.sessionModel.findOne({
                    user: user._id,
                    expiration: {
                        $gt: moment().toISOString(),
                    },
                    revoked: false,
                });
            })
            .then((session: Session) => {
                if (session) {
                    const currentDate = moment();
                    const sessionDate = moment(session.expiration);
                    throw new ConflictException({
                        message: 'A session already active!',
                        sessionId: session._id
                    });
                }
                const createdSession = {
                    accessToken: this.generateMongoId(),
                    user: userId,
                    timeStamp: moment().toISOString(),
                    expiration: moment().add('60', 'minutes'),
                };
                const createSession = new this.sessionModel(createdSession);
                return createSession.save();
            });
    }

    async revokeSession(sessionId: string) {
        return await this.sessionModel.findOneAndUpdate({ _id: sessionId }, { revoked: true });
    }

    async getSession(accessToken: string) {
        return await this.sessionModel.findOne({ accessToken }).populate('user');
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
