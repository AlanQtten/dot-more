/* eslint-disable @typescript-eslint/ban-ts-comment */
import * as assert from 'assert';
import * as vscode from 'vscode';

import typeofHandler from '../../funcs/typeofHandler';
import typeofTestData from './cases/typeofTestData';
import { getSuiteName } from './utilsForTest';

const tester = () => {
  const _tester = (text: string) => {
    let rpText = '';
    let start = 0;
    let end = 0;
    typeofHandler(
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
  typeofTestData.forEach(([text, result]) => {
    testCaseCount++;
    assert.deepEqual(_tester(text), result);
  });
  console.log(`  Test Case Count: ${testCaseCount}`);
};

suite(getSuiteName('typeof'), () => {
  test('.typeof:', tester);
});
