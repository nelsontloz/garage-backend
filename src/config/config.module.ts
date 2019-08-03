import { Module } from '@nestjs/common';
import { ConfigService } from './config.service';

export const configFactory = () => {
  return new ConfigService(
    `environment/${process.env.NODE_ENV ? process.env.NODE_ENV : 'dev'}.env`,
  );
};

@Module({
  providers: [
    {
      provide: ConfigService,
      useValue: configFactory(),
    },
  ],
  exports: [ConfigService],
})
export class ConfigModule {}
