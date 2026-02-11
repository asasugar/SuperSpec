import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

export function getPackageRoot(): string {
  const __filename = fileURLToPath(import.meta.url);
  const __dirname = dirname(__filename);
  return join(__dirname, '..', '..');
}
