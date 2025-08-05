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

        const { type } = value;
        let defaultValue = value.default;

        if (!defaultValue) {
          defaultValue =
            {
              number: Number.MAX_SAFE_INTEGER,
              boolean: false,
            }[type] ?? defaultValue;
        }

        expect(typeof defaultValuesOfVscodeConfig[realKey]).toEqual(type);
        expect(defaultValuesOfVscodeConfig[realKey]).toEqual(defaultValue);
      }
    );
  });
});
