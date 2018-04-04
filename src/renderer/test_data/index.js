import { create as createInventoryItem, remove as removeInventoryItem } from './InventoryItem';

const actionCallbackMappings = {
  InventoryItem: {
    create: createInventoryItem,
    remove: removeInventoryItem,
  },
};

export default function runTestDataAction(userActions) {
  Object
    .entries(userActions)
    .forEach(([action, classname]) => {
      if (actionCallbackMappings[classname] && typeof actionCallbackMappings[classname][action] === 'function') {
        return actionCallbackMappings[classname][action]();
      }

      console.error(`Action '${action}' is not supported for class '${classname}'`);
    });
}
