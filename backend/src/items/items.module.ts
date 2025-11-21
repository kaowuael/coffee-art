import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ItemsService } from './items.service';
import { ItemsController } from './items.controller';
import { Item, ItemSchema } from './item.schema';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    // Wczytanie .env jako globalnej konfiguracji
    ConfigModule.forRoot({
      isGlobal: true,
    }),

    // Podłączenie modelu Item do Mongo
    MongooseModule.forFeature([{ name: Item.name, schema: ItemSchema }]),
  ],
  controllers: [ItemsController],
  providers: [ItemsService],
})
export class ItemsModule {}
