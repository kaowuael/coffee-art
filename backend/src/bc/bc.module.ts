// BcModule – moduł integracyjny.
// Umożliwia eksport BcService do innych modułów (Items, Sync Worker itd.)

import { Module } from '@nestjs/common';
import { BcService } from './bc.service';

@Module({
  // providers – rejestrujemy BcService w DI Container NestJS.
  providers: [BcService],

  // exports – dzięki temu ItemsModule będzie mógł importować BcModule
  // i używać BcService jako zależności (constructor(private bcService: BcService)).
  exports: [BcService],
})
export class BcModule {}
