import { Command } from 'nestjs-command';
import { Injectable } from '@nestjs/common';


@Injectable()
export class ExampleCommands {
  constructor() {}

  @Command({
    command: 'launch:message',
    describe: 'Lanzar mensaje de prueba',
  })
  async create() {
    console.log('Este es un mensaje de prueba');
  }
}