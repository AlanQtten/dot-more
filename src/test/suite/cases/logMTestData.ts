import type { InlineCase, Case } from './types';

const dotLogMTestData: InlineCase[] = [
  // test for basic func
  ['a.b.c', ['console.log(`a.b.c`, a.b.c)', 0]],
  // test for basic func with space before
  ['  a.b.c', ['console.log(`a.b.c`, a.b.c)', 2]],
  // test for basic func with some other code before
  // ['a.b c', ['console.log(`c`, c)', 4]],
  // test for string
  [`"a bc"`, ['console.log("a bc")', 0]],
  [`'a bc'`, [`console.log('a bc')`, 0]],
  ['`a bc`', ['console.log(`a bc`)', 0]],
  // test for string with space before
  [`  "a bc"`, ['console.log("a bc")', 2]],
  [`   'a bc'`, [`console.log('a bc')`, 3]],
  ['    `a bc`', ['console.log(`a bc`)', 4]],
  // test for string with some other code before
  [`const a = 1; "a bc"`, ['console.log("a bc")', 13]],
  [`const a = 1;  'a bc'`, [`console.log('a bc')`, 14]],
  ['const a = 1;   `a bc`', ['console.log(`a bc`)', 15]],
  // test for bracket
  [
    'str.slice(a.b.c)',
    ['console.log(`str.slice(a.b.c)`, str.slice(a.b.c))', 0],
  ],
  [
    'str.slice(a.b.c, 1, 50)',
    ['console.log(`str.slice(a.b.c, 1, 50)`, str.slice(a.b.c, 1, 50))', 0],
  ],
  [
    'str.slice(String(a.b.c), 1, 50)',
    [
      'console.log(`str.slice(String(a.b.c), 1, 50)`, str.slice(String(a.b.c), 1, 50))',
      0,
    ],
  ],
  [
    'arr.filter(item => item !== -1 && Boolean(item))',
    [
      'console.log(`arr.filter(item => item !== -1 && Boolean(item))`, arr.filter(item => item !== -1 && Boolean(item)))',
      0,
    ],
  ],
  // test for bracket with space before
  [
    '  str.slice(a.b.c)',
    ['console.log(`str.slice(a.b.c)`, str.slice(a.b.c))', 2],
  ],
  [
    '   str.slice(a.b.c, 1, 50)',
    ['console.log(`str.slice(a.b.c, 1, 50)`, str.slice(a.b.c, 1, 50))', 3],
  ],
  [
    '    str.slice(String(a.b.c), 1, 50)',
    [
      'console.log(`str.slice(String(a.b.c), 1, 50)`, str.slice(String(a.b.c), 1, 50))',
      4,
    ],
  ],
  [
    '     arr.filter(item => item !== -1 && Boolean(item))',
    [
      'console.log(`arr.filter(item => item !== -1 && Boolean(item))`, arr.filter(item => item !== -1 && Boolean(item)))',
      5,
    ],
  ],
  // test for bracket with some other code before
  [
    'const a = 1; str.slice(a.b.c)',
    ['console.log(`str.slice(a.b.c)`, str.slice(a.b.c))', 13],
  ],
  [
    'const a = 1;  str.slice(a.b.c, 1, 50)',
    ['console.log(`str.slice(a.b.c, 1, 50)`, str.slice(a.b.c, 1, 50))', 14],
  ],
  [
    'const a = 1;   str.slice(String(a.b.c), 1, 50)',
    [
      'console.log(`str.slice(String(a.b.c), 1, 50)`, str.slice(String(a.b.c), 1, 50))',
      15,
    ],
  ],
  [
    'const a = 1;    arr.filter(item => item !== -1 && Boolean(item))',
    [
      'console.log(`arr.filter(item => item !== -1 && Boolean(item))`, arr.filter(item => item !== -1 && Boolean(item)))',
      16,
    ],
  ],
  // test for code include `
  [
    "Array.concat([`a.b.c`], ['d.e.f'])",
    [
      `console.log(\`Array.concat([\\\`a.b.c\\\`], ['d.e.f'])\`, Array.concat([\`a.b.c\`], ['d.e.f']))`,
      0,
    ],
  ],
  // test for code include ` and with space before
  [
    "  Array.concat([`a.b.c`], ['d.e.f'])",
    [
      `console.log(\`Array.concat([\\\`a.b.c\\\`], ['d.e.f'])\`, Array.concat([\`a.b.c\`], ['d.e.f']))`,
      2,
    ],
  ],
  [
    "   Array.concat([`a.b.c`], ['d.e.f'])",
    [
      `console.log(\`Array.concat([\\\`a.b.c\\\`], ['d.e.f'])\`, Array.concat([\`a.b.c\`], ['d.e.f']))`,
      3,
    ],
  ],
  [
    "    Array.concat([`a.b.c`], ['d.e.f'])",
    [
      `console.log(\`Array.concat([\\\`a.b.c\\\`], ['d.e.f'])\`, Array.concat([\`a.b.c\`], ['d.e.f']))`,
      4,
    ],
  ],
  // test for code include ` and with some other code before
  [
    "const a = 123;  Array.concat([`a.b.c`], ['d.e.f'])",
    [
      `console.log(\`Array.concat([\\\`a.b.c\\\`], ['d.e.f'])\`, Array.concat([\`a.b.c\`], ['d.e.f']))`,
      16,
    ],
  ],
  // test for "typeof"
  ['typeof a.b.c', ['console.log(`typeof a.b.c`, typeof a.b.c)', 0]],
  // test for "typeof" with space before
  ['  typeof a.b.c', ['console.log(`typeof a.b.c`, typeof a.b.c)', 2]],
  ['   typeof a.b.c', ['console.log(`typeof a.b.c`, typeof a.b.c)', 3]],
  ['    typeof a.b.c', ['console.log(`typeof a.b.c`, typeof a.b.c)', 4]],
  // test for "typeof" with some other code before
  [
    'const a = 1;  typeof a.b.c',
    ['console.log(`typeof a.b.c`, typeof a.b.c)', 14],
  ],
  [
    'const a = 1;   typeof a.b.c',
    ['console.log(`typeof a.b.c`, typeof a.b.c)', 15],
  ],
  [
    'const a = 1;    typeof a.b.c',
    ['console.log(`typeof a.b.c`, typeof a.b.c)', 16],
  ],
  // test for "typeof" with bracket
  [
    'typeof str.slice(a.b.c)',
    ['console.log(`typeof str.slice(a.b.c)`, typeof str.slice(a.b.c))', 0],
  ],
  // test for "typeof" with bracket and with space before
  [
    '  typeof str.slice(a.b.c)',
    ['console.log(`typeof str.slice(a.b.c)`, typeof str.slice(a.b.c))', 2],
  ],
  [
    '   typeof str.slice(a.b.c, 1, 50)',
    [
      'console.log(`typeof str.slice(a.b.c, 1, 50)`, typeof str.slice(a.b.c, 1, 50))',
      3,
    ],
  ],
  [
    '    typeof str.slice(String(a.b.c), 1, 50)',
    [
      'console.log(`typeof str.slice(String(a.b.c), 1, 50)`, typeof str.slice(String(a.b.c), 1, 50))',
      4,
    ],
  ],
  [
    '     typeof arr.filter(item => item !== -1 && Boolean(item))',
    [
      'console.log(`typeof arr.filter(item => item !== -1 && Boolean(item))`, typeof arr.filter(item => item !== -1 && Boolean(item)))',
      5,
    ],
  ],
  // test for "typeof" with bracket and with some other code before
  [
    'const a = 1; typeof str.slice(a.b.c)',
    ['console.log(`typeof str.slice(a.b.c)`, typeof str.slice(a.b.c))', 13],
  ],
  [
    'const a = 1;  typeof str.slice(a.b.c, 1, 50)',
    [
      'console.log(`typeof str.slice(a.b.c, 1, 50)`, typeof str.slice(a.b.c, 1, 50))',
      14,
    ],
  ],
  [
    'const a = 1;   typeof str.slice(String(a.b.c), 1, 50)',
    [
      'console.log(`typeof str.slice(String(a.b.c), 1, 50)`, typeof str.slice(String(a.b.c), 1, 50))',
      15,
    ],
  ],
  [
    'const a = 1;    typeof arr.filter(item => item !== -1 && Boolean(item))',
    [
      'console.log(`typeof arr.filter(item => item !== -1 && Boolean(item))`, typeof arr.filter(item => item !== -1 && Boolean(item)))',
      16,
    ],
  ],
  // more complex situation
  [
    `a + b === c / d && (e - f)`,
    [
      `console.log(\`a + b === c / d && (e - f)\`, a + b === c / d && (e - f))`,
      0,
    ],
  ],
  [
    `  a + b === c / d && (e - f)`,
    [
      `console.log(\`a + b === c / d && (e - f)\`, a + b === c / d && (e - f))`,
      2,
    ],
  ],
  [
    `typeof a + b === c / d && (e - f) === 'function'`,
    [
      `console.log(\`typeof a + b === c / d && (e - f) === 'function'\`, typeof a + b === c / d && (e - f) === 'function')`,
      0,
    ],
  ],
  [
    `  typeof a + b === c / d && (e - f) === 'function'`,
    [
      `console.log(\`typeof a + b === c / d && (e - f) === 'function'\`, typeof a + b === c / d && (e - f) === 'function')`,
      2,
    ],
  ],
  [
    `const a = 1;  typeof a + b === c / d && (e - f) === 'function'`,
    [
      `console.log(\`typeof a + b === c / d && (e - f) === 'function'\`, typeof a + b === c / d && (e - f) === 'function')`,
      14,
    ],
  ],
];

const _dotLogMTestData: Case[] = dotLogMTestData.map(
  ([_source, [target, sliceStart]]) => {
    const source = `${_source}.logM`;

    return [source, [target, sliceStart, source.length]];
  }
);

export default _dotLogMTestData;
