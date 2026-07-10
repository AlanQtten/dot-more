import { parseExpression, type ParserPlugin } from '@babel/parser';
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

export const isSentence = (sentence: string, languageId: string): boolean => {
  const plugins: ParserPlugin[] = [];
  const isTypeScript =
    languageId === Language.typescript ||
    languageId === Language.typescriptreact;
  const isReact =
    languageId === Language.javascriptreact ||
    languageId === Language.typescriptreact;

  if (isTypeScript) {
    plugins.push('typescript');
  }

  if (isReact) {
    plugins.push('jsx');
  }

  try {
    parseExpression(sentence, {
      sourceType: 'module',
      plugins,
    });
    return true;
  } catch {
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

  const dotIndex = currentRowText.slice(0, position.character).lastIndexOf('.');
  const currentRow = currentRowText.slice(0, dotIndex);
  const trimCurrentRow = currentRow.trim();

  // 分析当前行是否成句
  if (isSentence(trimCurrentRow, document.languageId)) {
    return {
      sliceStart: new vscode.Position(
        position.line,
        currentRow.length - currentRow.trimStart().length
      ),
      sliceEnd: new vscode.Position(position.line, dotIndex + trigger.length),
      sliceContent: trimCurrentRow,
      isString: isStringStatement(trimCurrentRow),
    };
  }
  let ticker = position.line - 1;
  let joinContent = `${document.lineAt(ticker).text}\n${currentRow}`;

  while (ticker >= 0) {
    const tickRow = document.lineAt(ticker).text;
    if (isSentence(joinContent, document.languageId)) {
      return {
        sliceStart: new vscode.Position(
          ticker,
          tickRow.length - tickRow.trimStart().length
        ),
        sliceEnd: new vscode.Position(position.line, dotIndex + trigger.length),
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

export const sliceByEndOf = (content: string, end: string, start: string) => {
  const endPoint = content.indexOf(end);
  if (endPoint === -1) {
    return '';
  }

  const startPoint = content.slice(0, endPoint).lastIndexOf(start);

  return content.slice(startPoint, endPoint + end.length);
};
