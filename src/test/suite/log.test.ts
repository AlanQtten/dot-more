/* eslint-disable @typescript-eslint/ban-ts-comment */
import * as assert from 'assert';
import * as vscode from 'vscode';

import logHandler from '../../funcs/logHandler';
import type { LogHandlerOptions } from '../../funcs/logHandler';
import logTestData from './cases/logTestData';
import logMTestData from './cases/logMTestData';
import type { Case } from './cases/types';
import { getSuiteName } from './utilsForTest';

// const logTestData: Case[] = [];
// const logMTestData: Case[] = [];

const tester = (testData: Case[], options?: LogHandlerOptions) => () => {
  const _tester = (text: string) => {
    let rpText = '';
    let start = 0;
    let end = 0;
    logHandler(
      {
        document: {
          // @ts-ignore
          lineAt() {
            return { text };
          },
        },
      },
      {
        replace(range: vscode.Range, _rpText) {
          start = range.start.character;
          end = range.end.character;
          rpText = _rpText;
        },
      },
      {
        line: 0,
      },
      options
    );

    return [rpText, start, end];
  };

  let testCaseCount = 0;
  testData.forEach(([text, result]) => {
    testCaseCount++;
    assert.deepEqual(_tester(text), result);
  });
  console.log(`  Test Case Count: ${testCaseCount}`);
};

suite(getSuiteName('.log & .logM'), () => {
  test('.log:', tester(logTestData));
  test('.logM:', tester(logMTestData, { withMessage: true }));
});
