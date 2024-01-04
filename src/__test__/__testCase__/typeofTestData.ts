import { callable } from '../utils';
import type { NumberPackage, NamedInlineCase, NamedCase } from './types';

const dotTypeofTestData: NamedInlineCase = {
  // ================ case ================
  'basic test': [
    ['a.b.c'],
    // with space before
    ['  a.b.c'],
    // pure string
    [`"a bc"`],
    [`'a bc'`],
    ['`a bc`'],
    // pure string with space before
    [`  "a bc"`],
    [`   'a bc'`],
    ['    `a bc`'],
  ],

  // ================ case ================
  'syntax with `bracket`': [
    ['str.slice(a.b.c)'],
    ['str.slice(a.b.c, 1, 50)'],
    ['str.slice(String(a.b.c), 1, 50)'],
    ['arr.filter(item => item !== -1 && Boolean(item))'],
    // with space before
    ['  str.slice(a.b.c)'],
    ['   str.slice(a.b.c, 1, 50)'],
    ['    str.slice(String(a.b.c), 1, 50)'],
    ['     arr.filter(item => item !== -1 && Boolean(item))'],
  ],

  // ================ case ================
  'other complex syntax': [
    [`a + b === c / d && (e - f)`],
    [`  a + b === c / d && (e - f)`],
    // multi line content
    [
      `{a:1,b:2,c:3,
d:4}`,
      [
        `typeof {a:1,b:2,c:3,\nd:4}`,
        [
          0,
          0,
          1,
          (s) => {
            return s[1].length;
          },
        ],
        1,
      ],
    ],
    [
      `{a:1,b:2,c:3,
e: [1,2,3, { test: 'ccc' }],
d:4}`,
      [
        "typeof {a:1,b:2,c:3,\ne: [1,2,3, { test: 'ccc' }],\nd:4}",
        [
          0,
          0,
          2,
          (s) => {
            return s[2].length;
          },
        ],
        2,
      ],
    ],
    [
      `console.log('some other code')
const a = 1
const b = a + 1
const c = a + b + 'c'

function f() {
  function __f() {
    arr.map(item => {
      const _item = String(item)
      const __item = Number(_item)
      const ___item = Boolean(__item)

      return {
        transform: [_item, __item, ___item.map(c => ({
          name: c.b.a
        }))],
        reg: /cc__\\[/,
        str: \`\${_item}_____[\${___item}]]]]\`,
        strIn: _item + '__item' + ___item,
        strOut: "_item",
        inAndOut: {
          [Symbol(__item)]: {
            ...Object.keys(__item + ___item)
          }
        }
      }
    })
  }
}`,
      [
        `typeof arr.map(item => {
      const _item = String(item)
      const __item = Number(_item)
      const ___item = Boolean(__item)

      return {
        transform: [_item, __item, ___item.map(c => ({
          name: c.b.a
        }))],
        reg: /cc__\\[/,
        str: \`\${_item}_____[\${___item}]]]]\`,
        strIn: _item + '__item' + ___item,
        strOut: "_item",
        inAndOut: {
          [Symbol(__item)]: {
            ...Object.keys(__item + ___item)
          }
        }
      }
    })`,
        [
          7,
          4,
          26,
          (s) => {
            return s[26].length;
          },
        ],
        26,
      ],
    ],
  ],
};

export default Object.keys(dotTypeofTestData).reduce<NamedCase>(
  (namedCase, name) => {
    namedCase[name] = dotTypeofTestData[name].map(
      ([
        _source,
        [_target, _targetNumberPackage = [], _processLine = 0] = [],
      ]) => {
        const source = _source.split('\n');
        const target = _target || `typeof ${_source.trimStart()}`;
        const lastIndex = source.length - 1;
        const processLine = _processLine || lastIndex;

        source[processLine] = `${source[processLine]}.typeof`;

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
