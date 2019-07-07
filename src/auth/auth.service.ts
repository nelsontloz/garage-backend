import { Injectable, UnauthorizedException, ConflictException } from '@nestjs/common';
import { InjectModel } from 'nestjs-typegoose';
import Session from '../models/session.model';
import { ModelType } from 'typegoose';
import * as moment from 'moment';
import { AccountService } from '../account/account.service';
import * as bcrypt from 'bcrypt';

// TODO: add auth
@Injectable()
export class AuthService {
    constructor(@InjectModel(Session) private readonly sessionModel: ModelType<Session>,
                private readonly accountService: AccountService) { }

    async authenticate(email: string, password: string): Promise<any> {
        let accountId: string;
        const account = await this.accountService.findByEmail(email);

        if (!account || !await bcrypt.compare(password, account.password)) {
            throw new UnauthorizedException('Invalid credentials!');
        }

        accountId = account._id;
        const session = await this.sessionModel.findOne({
            account: account._id,
            expiration: {
                $gt: moment().toISOString(),
            },
            revoked: false,
        });

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
            account: accountId,
            timeStamp: moment().toISOString(),
            expiration: moment().add('60', 'minutes'),
        };
        const createSession = new this.sessionModel(createdSession);
        return await createSession.save();
    }

    async revokeSession(sessionId: string) {
        return await this.sessionModel.findOneAndUpdate({ _id: sessionId }, { revoked: true });
    }

    async getSession(accessToken: string) {
        return await this.sessionModel.findOne({ accessToken }).populate('account');
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
