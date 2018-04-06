import InventoryItem from '../models/InventoryItem';
import { bulkSaveFromObjects } from '../utils';

const testData = [
  {
    productName: 'First Product',
  },
  {
    productNumber: 2,
    productName: 'Green Water Bottle',
    price: 2.99,
    size: {
      width: 3,
      height: 4,
      unit: 'in',
    },
  },
  {
    productName: 'Third Product',
  },
];

export function create() {
  return bulkSaveFromObjects(testData, InventoryItem);
}

export function remove() {
  return InventoryItem.deleteMany({});
}
