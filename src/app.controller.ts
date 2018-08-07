import {Get, Controller, Res} from '@nestjs/common';
import { AppService } from './app.service';
import * as path from 'path';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  root(): string {
    return this.appService.root();
  }

  @Get('index')
  async renderIndex(@Res() response: any): Promise<any> {
    const filePath = path.resolve(__dirname, '../../weihang_view/dist/index.html');
    response.sendFile(filePath);
  }
}
