import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ItemsModule } from './items/items.module';

// 👉 DODAJ TO:
import { MongooseModule } from '@nestjs/mongoose';
import { BcModule } from './bc/bc.module';

@Module({
  imports: [
    // 👉 MongoDB podłączone globalnie
    MongooseModule.forRoot(
      process.env.MONGO_URL || 'mongodb://localhost:27017/coffeeart',
    ),

    ItemsModule,
    BcModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
