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
};

const singleLineNumberPackage = (
  startCharacter = 0
): NumberOrProcessNumberPackage => [0, startCharacter, 0, (s) => s[0].length];

const useContextTestData: NamedInlineCase<ExtraOptions> = {
  // ================ case ================
  'basic func with Js': [
    [
      'apple',
      [
        `
const AppleContext = createContext(null);

export const AppleProvider = (props) => {
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
  ],

  // ================ case ================
  'basic func with Ts': [
    [
      'apple',
      [
        `
type AppleContextValue = null

const AppleContext = createContext<AppleContextValue>(null);

type AppleProviderProps = PropsWithChildren<{
  value: AppleContextValue;
}>;

export const AppleProvider = (props: AppleProviderProps) => {
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
  ],
};

export default Object.keys(useContextTestData).reduce<NamedCase<ExtraOptions>>(
  (namedCase, name) => {
    namedCase[name] = useContextTestData[name].map(
      ([
        _source,
        [_target, _targetNumberPackage = [], _processLine = 0] = [],
        extraOption,
      ]) => {
        const source = _source.split('\n');
        const target = _target!;
        const lastIndex = source.length - 1;
        const processLine = _processLine || lastIndex;

        source[processLine] = `${source[processLine]}.useContext`;

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
