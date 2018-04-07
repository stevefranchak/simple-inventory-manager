import { EmbeddedDocument } from 'camo';

export default class Photo extends EmbeddedDocument {
  constructor() {
    super();

    this.path = {
      type: String,
      required: true,
    };
  }
}
