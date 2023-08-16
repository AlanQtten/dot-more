import { callable } from '../utilsForTest';
import type {
  InlineCase,
  Case,
  NumberPackage,
  NumberOrProcessNumberPackage,
} from './types';

const singleLineNumberPackage = (
  startCharacter = 0
): NumberOrProcessNumberPackage => [0, startCharacter, 0, (s) => s[0].length];

const useStateTestData: InlineCase[] = [
  // test for basic func
  ['a', ['const [a, setA] = useState();', singleLineNumberPackage()]],
  // test for basic func with space before
  ['  a', ['const [a, setA] = useState();', singleLineNumberPackage(2)]],
  ['   a', ['const [a, setA] = useState();', singleLineNumberPackage(3)]],
  ['    a', ['const [a, setA] = useState();', singleLineNumberPackage(4)]],
  // test for more complex word
  [
    'appleAndBanana',
    [
      'const [appleAndBanana, setAppleAndBanana] = useState();',
      singleLineNumberPackage(),
    ],
  ],
];

const _useStateTestData: Case[] = useStateTestData.map(
  ([
    _source,
    [_target, _targetNumberPackage = [], _processLine = 0, debug = false] = [],
  ]) => {
    const source = _source.split('\n');
    const target = _target!;
    const lastIndex = source.length - 1;
    const processLine = _processLine || lastIndex;

    source[processLine] = `${source[processLine]}.useState`;

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

export default _useStateTestData;
