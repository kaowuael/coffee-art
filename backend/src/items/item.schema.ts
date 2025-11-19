import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type ItemDocument = Item & Document;

@Schema({ timestamps: true })
export class Item {
  @Prop({ required: true, unique: true })
  itemId: string; // ID z BC (No.)

  @Prop({ required: true })
  name: string;

  @Prop()
  description: string;

  @Prop()
  imageUrl: string;

  @Prop({ default: 0 })
  price: number;

  @Prop({ default: 'PLN' })
  currency: string;

  @Prop({ default: true })
  visible: boolean;

  @Prop({ type: Object })
  attributes: Record<string, any>;

  @Prop({ default: [] })
  categories: string[];
}

export const ItemSchema = SchemaFactory.createForClass(Item);
