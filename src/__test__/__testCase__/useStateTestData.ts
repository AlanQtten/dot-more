import { callable } from '../utils';
import type {
  NumberPackage,
  NumberOrProcessNumberPackage,
  NamedInlineCase,
  NamedCase,
} from './types';

const singleLineNumberPackage = (
  startCharacter = 0
): NumberOrProcessNumberPackage => [0, startCharacter, 0, (s) => s[0].length];

const useStateTestData: NamedInlineCase = {
  // ================ case ================
  'basic test': [
    ['a', ['const [a, setA] = useState();', singleLineNumberPackage()]],
    // with space before
    ['  a', ['const [a, setA] = useState();', singleLineNumberPackage(2)]],
    ['   a', ['const [a, setA] = useState();', singleLineNumberPackage(3)]],
    ['    a', ['const [a, setA] = useState();', singleLineNumberPackage(4)]],
  ],

  // ================ case ================
  'other complex syntax': [
    [
      'appleAndBanana',
      [
        'const [appleAndBanana, setAppleAndBanana] = useState();',
        singleLineNumberPackage(),
      ],
    ],
  ],
};

export default Object.keys(useStateTestData).reduce<NamedCase>(
  (namedCase, name) => {
    namedCase[name] = useStateTestData[name].map(
      ([
        _source,
        [_target, _targetNumberPackage = [], _processLine = 0] = [],
      ]) => {
        const source = _source.split('\n');
        const target = _target!;
        const lastIndex = source.length - 1;
        const processLine = _processLine || lastIndex;

        source[processLine] = `${source[processLine]}.useState`;

        const lm = source.reduce<Record<number, string>>(
          (lineMap, row, index) => {
            lineMap[index] = row;

            return lineMap;
          },
          {}
        );

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

        return [lm, [target, targetNumberPackage], processLine];
      }
    );

    return namedCase;
  },
  {}
);
