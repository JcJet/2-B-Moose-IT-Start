import { Injectable } from '@nestjs/common';

@Injectable()
export class Hw4Service {
  getHello(): string {
    return 'Hello World!';
  }
}
