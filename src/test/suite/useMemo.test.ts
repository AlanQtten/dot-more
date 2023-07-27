/* eslint-disable @typescript-eslint/ban-ts-comment */
import * as assert from 'assert';
import * as vscode from 'vscode';

import useMemoHandler from '../../funcs/useMemoHandler';
import useMemoTestData from './cases/useMemoTestData';
import { getSuiteName } from './utilsForTest';

// const useMemoTestData: any[] = [];

const tester = () => {
  const _tester = (text: string) => {
    let rpText = '';
    let start = 0;
    let end = 0;
    useMemoHandler(
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
  useMemoTestData.forEach(([text, result]) => {
    testCaseCount++;
    assert.deepEqual(_tester(text), result);
  });
  console.log(`  Test Case Count: ${testCaseCount}`);
};

suite(getSuiteName('useMemo'), () => {
  test('.useMemo:', tester);
});
