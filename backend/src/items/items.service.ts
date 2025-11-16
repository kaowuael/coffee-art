import { Injectable } from '@nestjs/common';

@Injectable()
export class ItemsService {
  // na razie mock – później tu wepniemy BC/Mongo
  private readonly items = [
    {
      id: 'DEMO-001',
      name: 'Demo Coffee 1',
      description: 'Sample item from Coffee.art backend',
      price: 49.99,
      currency: 'PLN',
    },
    {
      id: 'DEMO-002',
      name: 'Demo Coffee 2',
      description: 'Another sample item from Coffee.art backend',
      price: 79.99,
      currency: 'PLN',
    },
  ];

  findAll() {
    return this.items;
  }
}