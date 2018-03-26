/* eslint import/prefer-default-export: "off" */

import { remote } from 'electron';

export function getAppDataDirectory() {
  return remote.app.getPath('userData');
}
