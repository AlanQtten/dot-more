/* eslint-disable @typescript-eslint/ban-ts-comment */
import * as assert from 'assert';
import * as vscode from 'vscode';

import ifHandler from '../../funcs/ifHandler';
import ifTestData from './cases/ifTestData';
import { getSuiteName } from './utilsForTest';

// const ifTestData: any[] = [];

const tester = () => {
  const _tester = (text: string) => {
    let rpText = '';
    let start = 0;
    let end = 0;
    ifHandler(
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
      }
    );

    return [rpText, start, end];
  };

  let testCaseCount = 0;
  ifTestData.forEach(([text, result]) => {
    testCaseCount++;
    assert.deepEqual(_tester(text), result);
  });
  console.log(`  Test Case Count: ${testCaseCount}`);
};

suite(getSuiteName('if'), () => {
  test('.if:', tester);
});
