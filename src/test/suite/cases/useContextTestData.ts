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
};

const singleLineNumberPackage = (
  startCharacter = 0
): NumberOrProcessNumberPackage => [0, startCharacter, 0, (s) => s[0].length];

const useContextTestData: InlineCase<ExtraOptions>[] = [
  // test for basic func in Js
  [
    'apple',
    [
      `
const AppleContext = createContext(null);

export const AppleContextProvider = (props) => {
  const { children, value } = props;

  return <AppleContext.Provider value={value}>{children}</AppleContext.Provider>;
};

export const useApple = () => {
  const apple = useContext(AppleContext);

  return apple;
};
`,
      singleLineNumberPackage(),
    ],
    {
      language: Language.javascript,
    },
  ],
  // test for basic func in Ts
  [
    'apple',
    [
      `
type AppleContextValue = null

const AppleContext = createContext<AppleContextValue>(null);

type AppleContextProviderProps = PropsWithChildren<{
  value: AppleContextValue;
}>;

export const AppleContextProvider = (props: AppleContextProviderProps) => {
  const { children, value } = props;

  return <AppleContext.Provider value={value}>{children}</AppleContext.Provider>;
};

export const useApple = () => {
  const apple = useContext(AppleContext);

  return apple;
};
`,
      singleLineNumberPackage(),
    ],
    {
      language: Language.typescript,
    },
  ],
];

const _useContextTestData: Case<ExtraOptions>[] = useContextTestData.map(
  ([
    _source,
    [_target, _targetNumberPackage = [], _processLine = 0, debug = false] = [],
    extraOption,
  ]) => {
    const source = _source.split('\n');
    const target = _target!;
    const lastIndex = source.length - 1;
    const processLine = _processLine || lastIndex;

    source[processLine] = `${source[processLine]}.useContext`;

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

    return [lm, [target, targetNumberPackage], processLine, debug, extraOption];
  }
);

export default _useContextTestData;
