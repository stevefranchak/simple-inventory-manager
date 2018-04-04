import { create as createInventoryItem, remove as removeInventoryItem } from './InventoryItem';

const actionCallbackMappings = {
  createInventoryItem,
  removeInventoryItem,
};

export default function runTestDataAction(userActions) {
  Object
    .entries(userActions)
    .forEach(([action, classname]) => {
      const actionCallback = `${action}${classname}`;
      if (typeof actionCallbackMappings[actionCallback] === 'function') {
        return actionCallbackMappings[actionCallback]();
      }

      /* eslint no-console: "off" */
      return console.error(`Action '${action}' is not supported for class '${classname}'`);
    });
}
