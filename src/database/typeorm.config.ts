import { ConfigService } from '@nestjs/config';
import {
  TypeOrmModuleAsyncOptions,
  TypeOrmModuleOptions,
} from '@nestjs/typeorm';

const configService = new ConfigService();
const pathDataBase = 'dist/src/database';

export const typeOrmAsyncConfig: TypeOrmModuleAsyncOptions = {
  useFactory: async (): Promise<TypeOrmModuleOptions> => {
    const isProduction = configService.get('NODE_ENV') === 'production';

    return {
      ssl: isProduction,
      extra: {
        ssl: isProduction
          ? {
              rejectUnauthorized: false,
            }
          : false,
      },
      type: 'postgres',
      port: configService.get<number>('DB_PORT'),
      username: configService.get<string>('DB_USERNAME'),
      password: configService.get('DB_PASSWORD'),
      database: configService.get<string>('DB_DATABASE'),
      host: configService.get<string>('DB_HOST'),
      migrationsTableName: 'migrations_table',
      entities: ['dist/**/*.entity{.ts,.js}'],
      migrations: [`${pathDataBase}/migrations/*{.ts,.js}`],
      subscribers: [`${pathDataBase}/subscribers/*{.ts,.js}`],
      synchronize: false,
      logger: 'advanced-console',
      logging: isProduction ? false : true
    };
  },
};
