import { Module } from '@nestjs/common';
import { CommandModule } from 'nestjs-command'
import { ExampleCommands } from './example.commands'

@Module({
    imports: [
      CommandModule,
    ],
    providers: [ExampleCommands],
  })
export class CommandsModule {}
