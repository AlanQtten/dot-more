import { describe, expect, vi, test } from 'vitest';
import useStateTestData from './__testCase__/useStateTestData';
import useMemoTestData from './__testCase__/useMemoTestData';
import useContextTestData, {
  ExtraOptions,
} from './__testCase__/useContextTestData';
import functionComponentTestData, {
  ExtraOptions as FCExtraOptions,
} from './__testCase__/functionComponentTestData';
import { LineMap } from './__testCase__/types';
import { vscode, Range, Position } from './utils';
import useStateHandler from '../funcs/useStateHandler';
import useMemoHandler from '../funcs/useMemoHandler';
import useContextHandler from '../funcs/useContextHandler';
import functionComponentHandler from '../funcs/functionComponentHandler';
import { Language } from '../config/language';

vi.mock('vscode', () => {
  return vscode();
});

const _tester = <
  T extends
    | typeof useStateHandler
    | typeof useMemoHandler
    | typeof useContextHandler
    | typeof functionComponentHandler,
>(
  jsExtendHandler: T,
  line: number,
  lineMap: LineMap,
  extraOption?: ExtraOptions | FCExtraOptions
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
        languageId: extraOption?.language ?? Language.javascript,
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        getText: extraOption?.getText ?? (() => ''),
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
    extraOption
  );

  return [rpText, [startLine, startCharacter, endLine, endCharacter]];
};

describe('test for .useState', () => {
  Object.keys(useStateTestData).forEach((name) => {
    test(`${name}(${useStateTestData[name].length})`, () => {
      useStateTestData[name].forEach(([lineMap, result, line]) => {
        expect(_tester(useStateHandler, line, lineMap)).toStrictEqual(result);
      });
    });
  });
});

describe('test for .useMemo', () => {
  Object.keys(useMemoTestData).forEach((name) => {
    test(`${name}(${useMemoTestData[name].length})`, () => {
      useMemoTestData[name].forEach(([lineMap, result, line]) => {
        expect(_tester(useMemoHandler, line, lineMap)).toStrictEqual(result);
      });
    });
  });
});

describe('test for .useContext', () => {
  Object.keys(useContextTestData).forEach((name) => {
    test(`${name}(${useContextTestData[name].length})`, () => {
      useContextTestData[name].forEach(
        ([lineMap, result, line, extraOption]) => {
          expect(
            _tester(useContextHandler, line, lineMap, extraOption)
          ).toStrictEqual(result);
        }
      );
    });
  });
});

describe('test for .fc', () => {
  Object.keys(functionComponentTestData).forEach((name) => {
    test(`${name}(${functionComponentTestData[name].length})`, () => {
      functionComponentTestData[name].forEach(
        ([lineMap, result, line, extraOption]) => {
          expect(
            _tester(functionComponentHandler, line, lineMap, extraOption)
          ).toStrictEqual(result);
        }
      );
    });
  });
});

describe('extra test', () => {
  test('extra test for coverage', () => {
    expect(_tester(useStateHandler, 0, { 0: '' })).toEqual(['', [0, 0, 0, 0]]);
    expect(_tester(useStateHandler, 0, { 0: 'a.b.useState' })).toEqual([
      '',
      [0, 0, 0, 0],
    ]);
    expect(_tester(useMemoHandler, 0, { 0: '' })).toEqual(['', [0, 0, 0, 0]]);
    expect(_tester(useMemoHandler, 0, { 0: 'a.b.useMemo' })).toEqual([
      '',
      [0, 0, 0, 0],
    ]);
    expect(_tester(useContextHandler, 0, { 0: '' })).toEqual([
      '',
      [0, 0, 0, 0],
    ]);
    expect(_tester(useContextHandler, 0, { 0: 'a.b.useContext' })).toEqual([
      '',
      [0, 0, 0, 0],
    ]);
    expect(_tester(functionComponentHandler, 0, { 0: '' })).toEqual([
      '',
      [0, 0, 0, 0],
    ]);
    expect(_tester(functionComponentHandler, 0, { 0: 'a.b.fc' })).toEqual([
      '',
      [0, 0, 0, 0],
    ]);
  });
});
