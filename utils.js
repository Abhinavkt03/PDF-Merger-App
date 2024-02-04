// utils.mjs

import { fileURLToPath } from 'url';
import { dirname } from 'path';

export function getCurrentDirname(importMetaUrl) {
  const __filename = fileURLToPath(importMetaUrl);
  return dirname(__filename);
}
