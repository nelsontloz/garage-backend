import {
  Injectable,
  UnauthorizedException,
  ConflictException,
} from '@nestjs/common';
import { InjectModel } from 'nestjs-typegoose';
import Session from '../models/session.model';
import { ModelType } from 'typegoose';
import * as moment from 'moment';
import { AccountService } from '../account/account.service';
import * as bcryptjs from 'bcryptjs';

// TODO: add auth
@Injectable()
export class AuthService {
  constructor(
    @InjectModel(Session) private readonly sessionModel: ModelType<Session>,
    private readonly accountService: AccountService,
  ) {}

  async authenticate(email: string, password: string): Promise<any> {
    const account = await this.accountService.findByEmail(email);

    if (!account || !(await bcryptjs.compare(password, account.password))) {
      throw new UnauthorizedException('Invalid credentials!');
    }
    const session = await this.sessionModel.findOne({
      account: account._id,
      expiration: {
        $gt: moment().toISOString(),
      },
      revoked: false,
    });

    if (session) {
      throw new ConflictException({
        message: 'A session already active!',
        sessionId: session._id,
      });
    }
    const createdSession = {
      accessToken: this.generateMongoId(),
      account,
      timeStamp: moment().toISOString(),
      expiration: moment().add('60', 'minutes'),
    };
    const createSession = new this.sessionModel(createdSession);
    const sec = await createSession.save();
    return await this.getSession(sec.accessToken);
  }

  async revokeSession(accessToken: string) {
    return await this.sessionModel.findOneAndUpdate(
      { accessToken },
      { revoked: true },
    );
  }

  async getSession(accessToken: string) {
    return await this.sessionModel
      .findOne({
        accessToken,
        expiration: {
          $gt: new Date(),
        },
      })
      .populate('account', '-password');
  }

  private generateMongoId() {
    // tslint:disable-next-line: no-bitwise
    const timestamp = ((new Date().getTime() / 1000) | 0).toString(16);
    return (
      timestamp +
      'xxxxxxxxxxxxxxxx'
        .replace(/[x]/g, () => {
          // tslint:disable-next-line: no-bitwise
          return ((Math.random() * 16) | 0).toString(16);
        })
        .toLowerCase()
    );
  }
}
