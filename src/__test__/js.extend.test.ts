import { describe, expect, vi, test } from 'vitest';
import logTestData from './__testCase__/logTestData';
import logMTestData from './__testCase__/logMTestData';
import typeofTestData from './__testCase__/typeofTestData';
import ifTestData from './__testCase__/ifTestData';
import { LineMap } from './__testCase__/types';
import { vscode, Range, Position } from './utils';
import logHandler, { LogHandlerOptions } from '../funcs/logHandler';
import typeofHandler from '../funcs/typeofHandler';
import ifHandler from '../funcs/ifHandler';

vi.mock('vscode', () => {
  return vscode();
});

const _tester = <
  T extends typeof logHandler | typeof typeofHandler | typeof ifHandler,
>(
  jsExtendHandler: T,
  line: number,
  lineMap: LineMap,
  options?: LogHandlerOptions
) => {
  let rpText = '';
  let startLine = 0;
  let startCharacter = 0;
  let endLine = 0;
  let endCharacter = 0;
  jsExtendHandler(
    {
      document: {
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        lineAt(p: Position) {
          return { text: lineMap[typeof p === 'number' ? p : p.line] };
        },
      },
    },
    {
      replace(range: Range, _rpText) {
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

describe('test for .log', () => {
  Object.keys(logTestData).forEach((name) => {
    test(`${name}(${logTestData[name].length})`, () => {
      logTestData[name].forEach(([lineMap, result, line]) => {
        expect(_tester(logHandler, line, lineMap)).toStrictEqual(result);
      });
    });
  });

  // extra test for .log
  expect(_tester(logHandler, 0, { 0: 'a.b.c.log // apple' })).toStrictEqual([
    'console.log(a.b.c)',
    [0, 0, 0, 9],
  ]);
  expect(
    _tester(logHandler, 2, {
      0: 'list.map(item => ({',
      1: '  ...item',
      2: '})).log // apple',
    })
  ).toStrictEqual([
    `console.log(list.map(item => ({\n  ...item\n})))`,
    [0, 0, 2, 7],
  ]);
});

describe('test for .logM', () => {
  Object.keys(logMTestData).forEach((name) => {
    test(`${name}(${logMTestData[name].length})`, () => {
      logMTestData[name].forEach(([lineMap, result, line]) => {
        expect(
          _tester(logHandler, line, lineMap, { withMessage: true })
        ).toStrictEqual(result);
      });
    });
  });
});

describe('test for .typeof', () => {
  Object.keys(typeofTestData).forEach((name) => {
    test(`${name}(${typeofTestData[name].length})`, () => {
      typeofTestData[name].forEach(([lineMap, result, line]) => {
        expect(_tester(typeofHandler, line, lineMap)).toStrictEqual(result);
      });
    });
  });
});

describe('test for .if', () => {
  Object.keys(ifTestData).forEach((name) => {
    test(`${name}(${ifTestData[name].length})`, () => {
      ifTestData[name].forEach(([lineMap, result, line]) => {
        expect(_tester(ifHandler, line, lineMap)).toStrictEqual(result);
      });
    });
  });
});

describe('extra test', () => {
  // just for coverage
  test('extra test for coverage', () => {
    expect(_tester(logHandler, 0, { 0: '.log' })).toStrictEqual([
      '',
      [0, 0, 0, 0],
    ]);
    expect(_tester(ifHandler, 0, { 0: '.log' })).toStrictEqual([
      '',
      [0, 0, 0, 0],
    ]);
    expect(_tester(typeofHandler, 0, { 0: '.log' })).toStrictEqual([
      '',
      [0, 0, 0, 0],
    ]);
  });
});
