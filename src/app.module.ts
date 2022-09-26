import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { CommandModule } from 'nestjs-command'

import { DatabaseModule } from '@database/database.module';
import { ModulesModule } from '@modules/modules.module';
import { CoreModule } from '@core/core.module';
import { CommandsModule } from "@commands/commands.module";
import { configValidationSchema } from '@app/config.schema'

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      validationSchema: configValidationSchema
    }),
    DatabaseModule,
    CoreModule,
    ModulesModule,
    CommandModule,
    CommandsModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
