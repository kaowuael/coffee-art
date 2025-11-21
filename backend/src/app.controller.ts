import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { BcService } from './bc/bc.service';
import { BcPingResponse } from './bc/dto/bc-ping-response';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private readonly bcService: BcService, // ← wstrzykujemy BC service
  ) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Get('health')
  getHealth() {
    return {
      status: 'ok',
      service: 'coffee.art-backend',
      timestamp: new Date().toISOString(),
    };
  }
  @Get('bc/ping')
  pingBc(): Promise<BcPingResponse> {
    return this.bcService.ping();
  }
}
