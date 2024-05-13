import * as vscode from 'vscode';
import { Language } from '../config/language';

const stringSymbolTester = /'|"|`/;
export function isStringStatement(statement: string) {
  return (
    stringSymbolTester.test(statement[0]) &&
    stringSymbolTester.test(statement[statement.length - 1])
  );
}

export const updateStartIndexWhileContainBlank = (content: string): number => {
  if (content.indexOf(' ') === -1) {
    return 0;
  }

  return content.split('').findIndex((letter) => letter !== ' ');
};

const isSentence = (sentence: string): boolean => {
  try {
    // eslint-disable-next-line @typescript-eslint/no-implied-eval
    new Function(`const a = ${sentence}`);
    return true;
  } catch (e) {
    return false;
  }
};

export const matchFromContent = (
  document: vscode.TextDocument,
  position: vscode.Position,
  trigger: string
):
  | {
      sliceStart: vscode.Position;
      sliceEnd: vscode.Position;
      sliceContent: string;
      isString: boolean;
    }
  | undefined => {
  const triggerMessageLength = trigger.length;
  const currentRowText = document.lineAt(position).text;
  if (currentRowText.length <= triggerMessageLength) {
    return;
  }
  const currentRow = currentRowText.slice(
    0,
    currentRowText.length - triggerMessageLength
  );
  const trimCurrentRow = currentRow.trim();

  // 分析当前行是否成句
  if (isSentence(trimCurrentRow)) {
    return {
      sliceStart: new vscode.Position(
        position.line,
        currentRow.length - currentRow.trimStart().length
      ),
      sliceEnd: new vscode.Position(position.line, currentRowText.length),
      sliceContent: trimCurrentRow,
      isString: isStringStatement(trimCurrentRow),
    };
  }
  let ticker = position.line - 1;
  let joinContent = `${document.lineAt(ticker).text}\n${currentRow}`;

  while (ticker >= 0) {
    const tickRow = document.lineAt(ticker).text;
    if (isSentence(joinContent)) {
      return {
        sliceStart: new vscode.Position(
          ticker,
          tickRow.length - tickRow.trimStart().length
        ),
        sliceEnd: new vscode.Position(position.line, currentRowText.length),
        sliceContent: joinContent.trimStart(),
        isString: false,
      };
    }
    ticker--;
    joinContent = `${document.lineAt(ticker).text}\n${joinContent}`;
  }
};

export const firstLetterToUpperCase = (str: string) => {
  return `${str.slice(0, 1).toUpperCase()}${str.slice(1)}`;
};

export const firstLetterToLowerCase = (str: string) => {
  return `${str.slice(0, 1).toLowerCase()}${str.slice(1)}`;
};

export const contentHasText = (content: string, text: string) => {
  return (
    content.split('\n').findIndex((line) => line.indexOf(text) !== -1) !== -1
  );
};

export const isTsDocument = (document?: vscode.TextDocument) => {
  const _document = document ?? vscode.window.activeTextEditor?.document;
  const lId = _document?.languageId;

  return lId === Language.typescriptreact || lId === Language.typescript;
};
