import { callable, space } from '../utilsForTest';
import type {
  InlineCase,
  Case,
  NumberPackage,
  NumberOrProcessNumberPackage,
} from './types';

const singleLineNumberPackage = (
  startCharacter = 0
): NumberOrProcessNumberPackage => [0, startCharacter, 0, (s) => s[0].length];

const useMemoTestData: InlineCase[] = [
  // test for basic func
  [
    'apple',
    ['const apple = useMemo(() => {\n\t\n}, [])', singleLineNumberPackage()],
  ],
  // test for basic func with space before
  [
    '  apple',
    [
      `const apple = useMemo(() => {\n${space(2)}\t\n${space(2)}}, [])`,
      singleLineNumberPackage(2),
    ],
  ],
  [
    '   apple',
    [
      `const apple = useMemo(() => {\n${space(3)}\t\n${space(3)}}, [])`,
      singleLineNumberPackage(3),
    ],
  ],
  [
    '    apple',
    [
      `const apple = useMemo(() => {\n${space(4)}\t\n${space(4)}}, [])`,
      singleLineNumberPackage(4),
    ],
  ],
];
const _useMemoTestData: Case[] = useMemoTestData.map(
  ([
    _source,
    [_target, _targetNumberPackage = [], _processLine = 0, debug = false] = [],
  ]) => {
    const source = _source.split('\n');
    const target = _target!;
    const lastIndex = source.length - 1;
    const processLine = _processLine || lastIndex;

    source[processLine] = `${source[processLine]}.useMemo`;

    const lm = source.reduce<Record<number, string>>((lineMap, row, index) => {
      lineMap[index] = row;

      return lineMap;
    }, {});

    const targetNumberPackage: NumberPackage = _targetNumberPackage.length
      ? (_targetNumberPackage.map((n) =>
          callable(n, lm, target)
        ) as NumberPackage)
      : [
          0,
          source[lastIndex].length - source[lastIndex].trimStart().length,
          0,
          source[lastIndex].length,
        ];

    return [lm, [target, targetNumberPackage], processLine, debug];
  }
);

export default _useMemoTestData;
