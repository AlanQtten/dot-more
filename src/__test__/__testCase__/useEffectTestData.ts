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

const useEffectTestData: NamedInlineCase = {
  // ================ case ================
  'basic test': [
    [
      'apple',
      [
        `useEffect(() => {\n\tconsole.log(\`apple change\`)\n}, [apple])`,
        singleLineNumberPackage(),
      ],
    ],
    // with space before
    [
      '  apple',
      [
        `useEffect(() => {\n${space(2)}\tconsole.log(\`apple change\`)\n${space(
          2
        )}}, [apple])`,
        singleLineNumberPackage(2),
      ],
    ],
  ],
};

export default Object.keys(useEffectTestData).reduce<NamedCase>(
  (namedCase, name) => {
    namedCase[name] = useEffectTestData[name].map(
      ([
        _source,
        [_target, _targetNumberPackage = [], _processLine = 0] = [],
        extraOption,
      ]) => {
        const source = _source.split('\n');
        const target = _target!;
        const lastIndex = source.length - 1;
        const processLine = _processLine || lastIndex;

        source[processLine] = `${source[processLine]}.useEffect`;

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

        return [lm, [target, targetNumberPackage], processLine, extraOption];
      }
    );

    return namedCase;
  },
  {}
);
