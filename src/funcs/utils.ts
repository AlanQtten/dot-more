import * as vscode from 'vscode';

const stringSymbolTester = /'|"|`/;
export function isStringStatement(statement: string) {
  return (
    stringSymbolTester.test(statement[0]) &&
    stringSymbolTester.test(statement[statement.length - 1])
  );
}

const leftLargeBracketTester = /{/g;
const rightLargeBracketTester = /}/g;
const leftMiddleBracketTester = /\[/g;
const rightMiddleBracketTester = /]/g;
const leftSmallBracketTester = /\(/g;
const rightSmallBracketTester = /\)/g;

const countOfChar = (str: string, tester: RegExp) => {
  return Array.from(str.matchAll(tester) ?? []).length;
};

export const updateStartIndexWhileContainBlank = (content: string): number => {
  if (content.indexOf(' ') === -1) {
    return 0;
  }

  return content.split('').findIndex((letter) => letter !== ' ');
};

const singleQuotaReplacer = /'([^']*)'/g;
const doubleQuotaReplacer = /"([^']*)"/g;
const commaReplacer = /`([^']*)`/g;
const regExpReplacer = /\/([^']*)\//g;
const isSentence = (sentence: string) => {
  const _sentence = sentence
    .replace(commaReplacer, '')
    .replace(singleQuotaReplacer, '')
    .replace(doubleQuotaReplacer, '')
    .replace(regExpReplacer, '');

  return (
    countOfChar(_sentence, leftLargeBracketTester) ===
      countOfChar(_sentence, rightLargeBracketTester) &&
    countOfChar(_sentence, leftMiddleBracketTester) ===
      countOfChar(_sentence, rightMiddleBracketTester) &&
    countOfChar(_sentence, leftSmallBracketTester) ===
      countOfChar(_sentence, rightSmallBracketTester)
  );
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

  // const l = content.length;
  // const analyzeSentence = content.slice(0, l - triggerMessageLength);
  // const sliceStart = analyzeSentence.match(/\S/)?.index ?? 0;

  // const lastCharacterIndex = analyzeSentence.length - 1;
  // const lastCharacter = analyzeSentence[lastCharacterIndex];

  // let isString = false;
  // if (isStringStatement(analyzeSentence)) {
  //   const _sliceStart = analyzeSentence
  //     .slice(0, lastCharacterIndex)
  //     .split('')
  //     .findLastIndex((v, index, arr) => {
  //       return v === lastCharacter && arr[index - 1] !== '\\';
  //     });

  //   _sliceStart !== -1 && (sliceStart = _sliceStart);
  //   isString = true;
  // } else {
  //   sliceStart = updateStartIndexWhileContainBlank(analyzeSentence);
  // }

  // sliceStart += preLength ? preLength - 1 : 0;

  // return {
  //   sliceContent: content.slice(sliceStart, l - triggerMessageLength),
  //   sliceStart,
  //   isString,
  // };
};
