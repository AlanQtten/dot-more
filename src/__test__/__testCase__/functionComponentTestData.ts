import { Language } from '../../config/language';
import { callable } from '../utils';
import type {
  NumberPackage,
  NumberOrProcessNumberPackage,
  NamedInlineCase,
  NamedCase,
} from './types';

export type ExtraOptions = {
  language: Language;
  getText: () => string;
};

const singleLineNumberPackage = (
  startCharacter = 0
): NumberOrProcessNumberPackage => [0, startCharacter, 0, (s) => s[0].length];

const functionComponentTestData: NamedInlineCase<ExtraOptions> = {
  // ================ case ================
  'basic func with Js': [
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
    // with `export default`
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
  ],

  // ================ case ================
  'basic func with Ts': [
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
  ],
};

export default Object.keys(functionComponentTestData).reduce<
  NamedCase<ExtraOptions>
>((namedCase, name) => {
  namedCase[name] = functionComponentTestData[name].map(
    ([
      _source,
      [_target, _targetNumberPackage = [], _processLine = 0] = [],
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

      const targetNumberPackage: NumberPackage = _targetNumberPackage.map((n) =>
        callable(n, lm, target)
      ) as NumberPackage;

      return [lm, [target, targetNumberPackage], processLine, extraOption];
    }
  );

  return namedCase;
}, {});
