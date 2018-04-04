/* eslint no-console: "off" */

import connectDb from '../db.js';
import { create as createInventoryItem, remove as removeInventoryItem } from './InventoryItem';

const actionCallbackMappings = {
  createInventoryItem,
  removeInventoryItem,
};

function runTestDataAction(userActions) {
  return Promise.all(
    Object
      .entries(userActions)
      .map(([action, classname]) => {
        const actionCallback = `${action}${classname}`;
        if (typeof actionCallbackMappings[actionCallback] === 'function') {
          return actionCallbackMappings[actionCallback]();
        }

        console.error(`Action '${action}' is not supported for class '${classname}'`);
        return Promise.resolve();
      }),
    );
}

export default async function init(userActions, callback) {
  await connectDb();
  try {
    await runTestDataAction(userActions);
  } catch (err) {
    console.error('Error while executing an action on a class:\n', err);
  }
  if (typeof callback === 'function') {
    callback();
  }
}
