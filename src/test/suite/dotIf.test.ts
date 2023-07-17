// @ts-nocheck
import * as assert from 'assert';

import ifHandler from '../../funcs/ifHandler';
import dotIfTestData from './cases/dotIfTestData';

// const dotIfTestData = [];

const tester = (testData) => () => {
  const ifHandlerTester = (text) => {
    let rpText = '';
    let start = 0;
    let end = 0;
    ifHandler(
      {
        document: {
          lineAt() { return { text }; }
        }
      },
      {
        replace(range, _rpText) {
          start = range.start.character;
          end = range.end.character;
          rpText = _rpText;
        }
      },
      {
        line: 0,
      }
    );

    return [rpText, start, end];
  };

  let testCaseCount = 0;
  testData.forEach(([text, result]) => {
    testCaseCount++;
    assert.deepEqual(
      ifHandlerTester(text),
      result
    );
  });
  console.log(`  Test Case Count: ${testCaseCount}`);
};

suite('Extension .if Suite', () => {
  test('Test .if', tester(dotIfTestData));
});