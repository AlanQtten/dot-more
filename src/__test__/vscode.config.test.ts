import fs from 'node:fs';
import path from 'node:path';
import { describe, it, expect, vi } from 'vitest';
import { defaultValuesOfVscodeConfig } from '../config/vscodeConfig';

vi.mock('vscode', () => ({}));

describe('test for vscode config', () => {
  it('should sync', () => {
    const packageJson = JSON.parse(
      fs.readFileSync(path.resolve(__dirname, '../../package.json')).toString()
    );
    const vscodeConfig = packageJson.contributes.configuration.properties;
    Object.entries(vscodeConfig).forEach(
      ([key, value]: [string, { type: string; default: unknown }]) => {
        const realKey = key.slice('dotMore.'.length);

        expect(typeof defaultValuesOfVscodeConfig[realKey]).toEqual(value.type);
        expect(defaultValuesOfVscodeConfig[realKey]).toEqual(value.default);
      }
    );
  });
});
