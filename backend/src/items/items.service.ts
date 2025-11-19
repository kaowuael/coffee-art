import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Item, ItemDocument } from './item.schema';

@Injectable()
export class ItemsService {
  constructor(
    @InjectModel(Item.name)
    private readonly itemModel: Model<ItemDocument>,
  ) {}

  async findAll(): Promise<ItemDocument[]> {
    return this.itemModel.find().exec();
  }

  async findOne(itemId: string): Promise<ItemDocument | null> {
    return this.itemModel.findOne({ itemId }).exec();
  }
}
