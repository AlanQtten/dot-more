/* eslint-disable @typescript-eslint/ban-ts-comment */
import * as assert from 'assert';
import * as vscode from 'vscode';

import functionComponentHandler from '../../funcs/functionComponentHandler';
import functionComponentTestData, {
  ExtraOptions,
} from './cases/functionComponentTestData';
import { getSuiteName } from './utilsForTest';
import { LineMap } from './cases/types';

// const functionComponentTestData: any[] = [];

const tester = () => {
  const _tester = (
    lineMap: LineMap,
    line: number,
    debug: boolean,
    extraOption: ExtraOptions
  ) => {
    let rpText = '';
    let startLine = 0;
    let startCharacter = 0;
    let endLine = 0;
    let endCharacter = 0;
    functionComponentHandler(
      {
        document: {
          // @ts-ignore
          lineAt(p) {
            return { text: lineMap[typeof p === 'number' ? p : p.line] };
          },
          languageId: extraOption.language,
          getText: extraOption.getText,
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
        insert() {
          // TODO
        },
      },
      {
        line,
      }
    );

    return [rpText, [startLine, startCharacter, endLine, endCharacter]];
  };

  let testCaseCount = 0;
  functionComponentTestData.forEach(
    ([lineMap, result, line, debug, extraOption]) => {
      testCaseCount++;
      assert.deepEqual(_tester(lineMap, line, debug, extraOption!), result);
    }
  );
  console.log(`  Test Case Count: ${testCaseCount}`);
};

functionComponentTestData.length &&
  suite(getSuiteName('.fc'), () => {
    test('.fc:', tester);
  });
