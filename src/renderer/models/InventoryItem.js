import { Document } from 'camo';
import Size from './Size';

export default class InventoryItem extends Document {
  constructor() {
    super();

    this.productNumber = {
      type: Number,
      validate: value => parseInt(value, 10) === value,
      unique: true,
      required: true,
    };

    this.productName = {
      type: String,
      unique: true,
      required: true,
    };

    this.price = {
      type: Number,
    };

    this.size = {
      type: Size,
    };

    this.created = {
      type: Date,
      default: Date.now,
    };

    this.lastModified = {
      type: Date,
      default: Date.now,
    };
  }

  static collectionName() {
    return 'inventory_items';
  }
}
