import { remote, app } from 'electron';

export function getAppDataDirectory() {
  const PATH = 'userData';
  if (remote && remote.app) {
    return remote.app.getPath(PATH);
  }

  return app.getPath(PATH);
}

// Influence from https://decembersoft.com/posts/promises-in-serial-with-array-reduce/
export function resolveTasksSerially(tasks) {
  return tasks.reduce(
    (promiseChain, currentTask) =>
      promiseChain.then(chainResults =>
        currentTask().then(currentResult => [...chainResults, currentResult]),
      ),
    Promise.resolve([]),
  );
}

export function mapObjectToOdmClassInstance(object, odmClass) {
  return odmClass.create(object);
}

export function mapObjectListToOdmClassInstances(objects, odmClass) {
  return objects.map(object => mapObjectToOdmClassInstance(object, odmClass));
}

export function bulkSave(odmClassInstances) {
  return resolveTasksSerially(
    odmClassInstances.map(odmClassInstance =>
      odmClassInstance.save.bind(odmClassInstance),
    ),
  );
}

export function bulkSaveFromObjects(objects, odmClass) {
  return bulkSave(mapObjectListToOdmClassInstances(objects, odmClass));
}
