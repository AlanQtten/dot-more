import { describe, expect, test, vi } from 'vitest';
import { vscode } from './utils';
import { isSentence } from '../funcs/utils';
import { Language } from '../config/language';

vi.mock('vscode', () => vscode());

describe('isSentence', () => {
  test('parses JavaScript expressions', () => {
    expect(isSentence('foo?.bar ?? fallback', Language.javascript)).toBe(true);
    expect(isSentence('import.meta.env.MODE', Language.javascript)).toBe(true);
    expect(isSentence("import('./module.js')", Language.javascript)).toBe(true);
    expect(isSentence("object['import']", Language.javascript)).toBe(true);
  });

  test('parses TypeScript expressions only in TypeScript documents', () => {
    expect(isSentence('value as Result', Language.typescript)).toBe(true);
    expect(isSentence('value satisfies Result', Language.typescript)).toBe(true);
    expect(isSentence('value as Result', Language.javascript)).toBe(false);
  });

  test('parses TSX expressions', () => {
    expect(
      isSentence('<Component value={value} />', Language.typescriptreact)
    ).toBe(true);
  });

  test('rejects incomplete expressions', () => {
    expect(isSentence('foo(', Language.typescript)).toBe(false);
    expect(isSentence('import', Language.javascript)).toBe(false);
    expect(isSentence('const foo = 1', Language.typescript)).toBe(false);
  });
});
