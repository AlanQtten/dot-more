import { callable, space } from '../utils';
import type {
  NamedInlineCase,
  NumberPackage,
  NumberOrProcessNumberPackage,
  NamedCase,
} from './types';

const singleLineNumberPackage = (
  startCharacter = 0
): NumberOrProcessNumberPackage => [0, startCharacter, 0, (s) => s[0].length];

const ifTestData: NamedInlineCase = {
  // ================ case ================
  'basic test': [
    ['a.b.c'],
    // with space before
    ['  a.b.c', ['if(a.b.c) {\n  \t\n  }', singleLineNumberPackage(2)]],
    // pure string
    [`"a bc"`],
    [`'a bc'`],
    ['`a bc`'],
    // pure string with space before
    [
      `  "a bc"`,
      [`if("a bc") {\n${space(2)}\t\n${space(2)}}`, singleLineNumberPackage(2)],
    ],
    [
      `   'a bc'`,
      [`if('a bc') {\n${space(3)}\t\n${space(3)}}`, singleLineNumberPackage(3)],
    ],
    [
      '    `a bc`',
      [
        `if(\`a bc\`) {\n${space(4)}\t\n${space(4)}}`,
        singleLineNumberPackage(4),
      ],
    ],
  ],

  // ================ case ================
  'syntax with `bracket`': [
    ['str.slice(a.b.c)'],
    ['str.slice(a.b.c, 1, 50)'],
    ['str.slice(String(a.b.c), 1, 50)'],
    ['arr.filter(item => item !== -1 && Boolean(item))'],
    // with space before
    [
      '  str.slice(a.b.c)',
      [
        `if(str.slice(a.b.c)) {\n${space(2)}\t\n${space(2)}}`,
        singleLineNumberPackage(2),
      ],
    ],
    [
      '   str.slice(a.b.c, 1, 50)',
      [
        `if(str.slice(a.b.c, 1, 50)) {\n${space(3)}\t\n${space(3)}}`,
        singleLineNumberPackage(3),
      ],
    ],
    [
      '    str.slice(String(a.b.c), 1, 50)',
      [
        `if(str.slice(String(a.b.c), 1, 50)) {\n${space(4)}\t\n${space(4)}}`,
        singleLineNumberPackage(4),
      ],
    ],
    [
      '     arr.filter(item => item !== -1 && Boolean(item))',
      [
        `if(arr.filter(item => item !== -1 && Boolean(item))) {\n${space(
          5
        )}\t\n${space(5)}}`,
        singleLineNumberPackage(5),
      ],
    ],
  ],

  // ================ case ================
  'syntax with `typeof`': [
    ['typeof a.b.c'],
    // with space before
    [
      '  typeof a.b.c',
      [
        `if(typeof a.b.c) {\n${space(2)}\t\n${space(2)}}`,
        singleLineNumberPackage(2),
      ],
    ],
    [
      '   typeof a.b.c',
      [
        `if(typeof a.b.c) {\n${space(3)}\t\n${space(3)}}`,
        singleLineNumberPackage(3),
      ],
    ],
    [
      '    typeof a.b.c',
      [
        `if(typeof a.b.c) {\n${space(4)}\t\n${space(4)}}`,
        singleLineNumberPackage(4),
      ],
    ],
  ],

  // ================ case ================
  'syntax with `bracket` and `typeof`': [
    ['typeof str.slice(a.b.c)'],
    // with space before
    [
      '  typeof str.slice(a.b.c)',
      [
        `if(typeof str.slice(a.b.c)) {\n${space(2)}\t\n${space(2)}}`,
        singleLineNumberPackage(2),
      ],
    ],
    [
      '   typeof str.slice(a.b.c, 1, 50)',
      [
        `if(typeof str.slice(a.b.c, 1, 50)) {\n${space(3)}\t\n${space(3)}}`,
        singleLineNumberPackage(3),
      ],
    ],
    [
      '    typeof str.slice(String(a.b.c), 1, 50)',
      [
        `if(typeof str.slice(String(a.b.c), 1, 50)) {\n${space(4)}\t\n${space(
          4
        )}}`,
        singleLineNumberPackage(4),
      ],
    ],
    [
      '     typeof arr.filter(item => item !== -1 && Boolean(item))',
      [
        `if(typeof arr.filter(item => item !== -1 && Boolean(item))) {\n${space(
          5
        )}\t\n${space(5)}}`,
        singleLineNumberPackage(5),
      ],
    ],
  ],

  // ================ case ================
  'other complex syntax': [
    [`a + b === c / d && (e - f)`],
    [
      `  a + b === c / d && (e - f)`,
      [
        `if(a + b === c / d && (e - f)) {\n${space(2)}\t\n${space(2)}}`,
        singleLineNumberPackage(2),
      ],
    ],
    [`typeof a + b === c / d && (e - f) === 'function'`],
    [
      `  typeof a + b === c / d && (e - f) === 'function'`,
      [
        `if(typeof a + b === c / d && (e - f) === 'function') {\n${space(
          2
        )}\t\n${space(2)}}`,
        singleLineNumberPackage(2),
      ],
    ],
    // multi line content
    [
      `{a:1,b:2,c:3,
d:4}`,
      [
        `if({a:1,b:2,c:3,\nd:4}) {\n\t\n}`,
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
        "if({a:1,b:2,c:3,\ne: [1,2,3, { test: 'ccc' }],\nd:4}) {\n\t\n}",
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
        `if(arr.map(item => {
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
    })) {\n${space(4)}\t\n${space(4)}}`,
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
    }) === { a: [1,2,3] }
  }
}`,
      [
        `if(arr.map(item => {
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
    }) === { a: [1,2,3] }) {\n${space(4)}\t\n${space(4)}}`,
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
    [
      `console.log('some other code')
console.log('some other code');
const a = b + c / d

someArr.map((item, i) => {
  return {
    a: a.aa.aaa,
    aa: aa.aaa.aaaa,
    aaa: aaa.aaaa.aaaaa,
    b: b.bb.bbb,
    bb: -1 / 2 + i * (1 / 9),
    bbb: bbb.bbbb.bbbbb
  };
})`,
      [
        `if(someArr.map((item, i) => {
  return {
    a: a.aa.aaa,
    aa: aa.aaa.aaaa,
    aaa: aaa.aaaa.aaaaa,
    b: b.bb.bbb,
    bb: -1 / 2 + i * (1 / 9),
    bbb: bbb.bbbb.bbbbb
  };
})) {\n\t\n}`,
        [
          4,
          0,
          13,
          (s) => {
            return s[13].length;
          },
        ],
        13,
      ],
    ],
    [
      `console.log('some other code')
console.log('some other code');
const a = b + c / d

someArr.map((item, i) => {
  return {
    a: a.aa.aaa,
    aa: aa.aaa.aaaa,
    aaa: aaa.aaaa.aaaaa,
    b: b.bb.bbb,
    bb: -1 / 2 + i * (1 / 9) / /test[^ ]/,
    bbb: bbb.bbbb.bbbbb
  };
})`,
      [
        `if(someArr.map((item, i) => {
  return {
    a: a.aa.aaa,
    aa: aa.aaa.aaaa,
    aaa: aaa.aaaa.aaaaa,
    b: b.bb.bbb,
    bb: -1 / 2 + i * (1 / 9) / /test[^ ]/,
    bbb: bbb.bbbb.bbbbb
  };
})) {\n\t\n}`,
        [
          4,
          0,
          13,
          (s) => {
            return s[13].length;
          },
        ],
        13,
      ],
    ],
  ],
};

export default Object.keys(ifTestData).reduce<NamedCase>((namedCase, name) => {
  namedCase[name] = ifTestData[name].map(
    ([
      _source,
      [_target, _targetNumberPackage = [], _processLine = 0] = [],
    ]) => {
      const source = _source.split('\n');
      const target = _target || `if(${_source.trimStart()}) {\n\t\n}`;
      const lastIndex = source.length - 1;
      const processLine = _processLine || lastIndex;

      source[processLine] = `${source[processLine]}.if`;

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
}, {});
