/* eslint-disable @typescript-eslint/ban-ts-comment */
import * as assert from 'assert';
import * as vscode from 'vscode';

import logHandler from '../../funcs/logHandler';
import type { LogHandlerOptions } from '../../funcs/logHandler';
import logTestData from './cases/logTestData';
import logMTestData from './cases/logMTestData';
import type { Case, LineMap } from './cases/types';
import { getSuiteName } from './utilsForTest';

// const logTestData: Case[] = [];
// const logMTestData: Case[] = [];

const tester = (testData: Case[], options?: LogHandlerOptions) => () => {
  const _tester = (lineMap: LineMap, line: number, debug: boolean) => {
    let rpText = '';
    let startLine = 0;
    let startCharacter = 0;
    let endLine = 0;
    let endCharacter = 0;
    logHandler(
      {
        document: {
          // @ts-ignore
          lineAt(p) {
            return { text: lineMap[typeof p === 'number' ? p : p.line] };
          },
        },
      },
      {
        replace(range: vscode.Range, _rpText) {
          startLine = range.start.line;
          startCharacter = range.start.character;

          endLine = range.end.line;
          endCharacter = range.end.character;

          rpText = _rpText;
        },
      },
      {
        line,
      },
      options
    );

    return [rpText, [startLine, startCharacter, endLine, endCharacter]];
  };

  let testCaseCount = 0;
  testData.forEach(([lineMap, result, line, debug]) => {
    testCaseCount++;
    assert.deepEqual(_tester(lineMap, line, debug), result);
  });
  console.log(`  Test Case Count: ${testCaseCount}`);
};

logTestData.length &&
  suite(getSuiteName('.log'), () => {
    test('.log:', tester(logTestData));
  });

logMTestData.length &&
  suite(getSuiteName('.logM'), () => {
    test('.logM:', tester(logMTestData, { withMessage: true }));
  });
