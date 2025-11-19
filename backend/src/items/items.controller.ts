import { Controller, Get, Param } from '@nestjs/common';
import { ItemsService } from './items.service';

@Controller('items')
export class ItemsController {
  constructor(private readonly itemsService: ItemsService) {}

  @Get()
  findAll() {
    return this.itemsService.findAll();
  }

  @Get(':itemId')
  findOne(@Param('itemId') itemId: string) {
    return this.itemsService.findOne(itemId);
  }
}
