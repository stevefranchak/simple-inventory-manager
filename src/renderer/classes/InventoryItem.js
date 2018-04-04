import { Document, EmbeddedDocument } from 'camo';

class Size extends EmbeddedDocument {
  constructor() {
    super();

    this.width = {
      type: Number,
      required: true,
    };

    this.height = {
      type: Number,
      required: true,
    };

    this.unit = {
      type: String,
      required: true,
      choices: ['in', 'ft'],
    };
  }
}

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
