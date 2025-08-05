import { Language } from '../../config/language';
import { type VscodeConfig } from '../../config/vscodeConfig';

export class Position {
  line: number;

  character: number;

  constructor(line: number, character: number) {
    this.line = line;
    this.character = character;
  }
}

export class Range {
  start: Position;

  end: Position;

  constructor(start: Position, end: Position) {
    this.start = start;
    this.end = end;
  }
}

export class Selection {}

export interface LineAt {
  (p: Position): { text: number };
}

export const vscode = (vscodeConfig?: VscodeConfig | (() => VscodeConfig)) => ({
  Range,
  Position,
  Selection,
  commands: {
    executeCommand() {},
  },
  workspace: {
    getConfiguration() {
      return {
        get(key) {
          const rawConfig =
            typeof vscodeConfig === 'function' ? vscodeConfig() : vscodeConfig;

          return rawConfig?.[key];
        },
      };
    },
  },
  window: {
    activeTextEditor: {
      document: {
        languageId: Language.javascript,
      },
    },
  },
});
