// @ts-nocheck
import * as assert from 'assert';

import logHandler from '../../funcs/logHandler';
import dotLogTestData from './cases/dotLogTestData';
import dotLogMTestData from './cases/dotLogMTestData';

// const dotLogMTestData = [];

const tester = (testData, options) => () => {
  const logHandlerTester = (text) => {
    let rpText = '';
    let start = 0;
    let end = 0;
    logHandler(
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
      },
      options
    );

    return [rpText, start, end];
  };

  let testCaseCount = 0;
  testData.forEach(([text, result]) => {
    testCaseCount++;
    assert.deepEqual(
      logHandlerTester(text),
      result
    );
  });
  console.log(`  Test Case Count: ${testCaseCount}`);
};

suite('Extension .log & .logM Suite', () => {
  test('Test .log', tester(dotLogTestData));
  test('Test .logM', tester(dotLogMTestData, { withMessage: true }));
});