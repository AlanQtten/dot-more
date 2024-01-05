import { Language } from '../../config/language';

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

export const vscode = (vscodeConfig?: Record<string, boolean>) => ({
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
          return vscodeConfig?.[key] ?? true;
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
