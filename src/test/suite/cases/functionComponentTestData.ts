import { Language } from '../../../config/language';
import { callable } from '../utilsForTest';
import type {
  InlineCase,
  Case,
  NumberPackage,
  NumberOrProcessNumberPackage,
} from './types';

export type ExtraOptions = {
  language: Language;
  getText: () => string;
};

const singleLineNumberPackage = (
  startCharacter = 0
): NumberOrProcessNumberPackage => [0, startCharacter, 0, (s) => s[0].length];

const functionComponentTestData: InlineCase<ExtraOptions>[] = [
  // test for basic func in Js
  [
    'apple',
    [
      `const Apple = (props) => {
    const { } = props;

    return <div>Apple</div>
}

export default Apple`,
      singleLineNumberPackage(),
    ],
    {
      language: Language.javascript,
      getText: () => '',
    },
  ],
  // test for basic func in Js and content has `export default`
  [
    'apple',
    [
      `const Apple = (props) => {
    const { } = props;

    return <div>Apple</div>
}`,
      singleLineNumberPackage(),
    ],
    {
      language: Language.javascript,
      getText: () => '\nexport default SomethingElse\n',
    },
  ],
  // test for basic func in Ts
  [
    'apple',
    [
      `type AppleProps = {}

const Apple = (props: AppleProps) => {
    const { } = props;

    return <div>Apple</div>
}

export default Apple`,
      singleLineNumberPackage(),
    ],
    {
      language: Language.typescript,
      getText: () => '',
    },
  ],
];

const _functionComponentTestData: Case<ExtraOptions>[] =
  functionComponentTestData.map(
    ([
      _source,
      [
        _target,
        _targetNumberPackage = [],
        _processLine = 0,
        debug = false,
      ] = [],
      extraOption,
    ]) => {
      const source = _source.split('\n');
      const target = _target!;
      const lastIndex = source.length - 1;
      const processLine = _processLine || lastIndex;

      source[processLine] = `${source[processLine]}.fc`;

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

      return [
        lm,
        [target, targetNumberPackage],
        processLine,
        debug,
        extraOption,
      ];
    }
  );

export default _functionComponentTestData;
