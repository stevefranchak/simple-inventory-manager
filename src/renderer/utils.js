/* eslint import/prefer-default-export: "off" */

import { remote, app } from 'electron';

export function getAppDataDirectory() {
  const PATH = 'userData';
  if (remote && remote.app) {
    return remote.app.getPath(PATH);
  }

  return app.getPath(PATH);
}
