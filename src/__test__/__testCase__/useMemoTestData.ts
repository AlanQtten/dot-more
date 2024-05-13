import { callable, space } from '../utils';
import type {
  NumberPackage,
  NumberOrProcessNumberPackage,
  NamedInlineCase,
  NamedCase,
} from './types';

const singleLineNumberPackage = (
  startCharacter = 0
): NumberOrProcessNumberPackage => [0, startCharacter, 0, (s) => s[0].length];

const useMemoTestData: NamedInlineCase = {
  // ================ case ================
  'basic test': [
    [
      'apple',
      ['const apple = useMemo(() => {\n\t\n}, [])', singleLineNumberPackage()],
    ],
    // with space before
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
  ],
};

export default Object.keys(useMemoTestData).reduce<NamedCase>(
  (namedCase, name) => {
    namedCase[name] = useMemoTestData[name].map(
      ([
        _source,
        [_target, _targetNumberPackage = [], _processLine = 0] = [],
      ]) => {
        const source = _source.split('\n');
        const target = _target!;
        const lastIndex = source.length - 1;
        const processLine = _processLine || lastIndex;

        source[processLine] = `${source[processLine]}.useMemo`;

        const lm = source.reduce<Record<number, string>>(
          (lineMap, row, index) => {
            lineMap[index] = row;

            return lineMap;
          },
          {}
        );

        const targetNumberPackage: NumberPackage = _targetNumberPackage.map(
          (n) => callable(n, lm, target)
        ) as NumberPackage;

        return [lm, [target, targetNumberPackage], processLine];
      }
    );

    return namedCase;
  },
  {}
);
