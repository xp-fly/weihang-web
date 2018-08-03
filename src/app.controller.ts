import {Get, Controller, Res} from '@nestjs/common';
import { AppService } from './app.service';
import * as path from 'path';
import {readFile} from 'fs';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  root(): string {
    return this.appService.root();
  }

  @Get('index')
  async renderIndex(@Res() response: Response): Promise<any> {
    const filePath = path.resolve(__dirname, '../../weihang_view/dist/index.html');
    response.sendFile(filePath);
  }
}
