import { EmbeddedDocument } from 'camo';

export default class Size extends EmbeddedDocument {
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
