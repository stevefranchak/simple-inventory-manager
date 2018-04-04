import InventoryItem from '../models/InventoryItem';

const testData = [
  {
    productNumber: 0,
    productName: 'Green Water Bottle',
    price: 2.99,
    size: {
      width: 3,
      height: 4,
      unit: 'in',
    },
  },
];

export function create() {
  return Promise.all(
    testData.map(
      dataObject => InventoryItem.create(dataObject).save(),
    ),
  );
}

export function remove() {
  return InventoryItem.deleteMany({});
}
