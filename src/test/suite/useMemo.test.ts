/* eslint-disable @typescript-eslint/ban-ts-comment */
import * as assert from 'assert';
import * as vscode from 'vscode';

import useMemoHandler from '../../funcs/useMemoHandler';
import useMemoTestData from './cases/useMemoTestData';
import { getSuiteName } from './utilsForTest';
import { LineMap } from './cases/types';

// const useMemoTestData: any[] = [];

const tester = () => {
  const _tester = (lineMap: LineMap, line: number, debug: boolean) => {
    let rpText = '';
    let startLine = 0;
    let startCharacter = 0;
    let endLine = 0;
    let endCharacter = 0;
    useMemoHandler(
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
      }
    );

    return [rpText, [startLine, startCharacter, endLine, endCharacter]];
  };

  let testCaseCount = 0;
  useMemoTestData.forEach(([lineMap, result, line, debug]) => {
    testCaseCount++;
    assert.deepEqual(_tester(lineMap, line, debug), result);
  });
  console.log(`  Test Case Count: ${testCaseCount}`);
};

suite(getSuiteName('.useMemo'), () => {
  test('.useMemo:', tester);
});
