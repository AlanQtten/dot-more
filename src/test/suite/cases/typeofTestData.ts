import type { InlineCase, Case } from './types';

const dotTypeofTestData: InlineCase[] = [
  // test for basic func
  ['a.b.c', ['typeof a.b.c', 0]],
  // test for basic func with space before
  ['  a.b.c', ['typeof a.b.c', 2]],
  // test for basic func with some other code before
  // ['a.b c', ['typeof(c)', 4]],
  // test for string
  [`"a bc"`, ['typeof "a bc"', 0]],
  [`'a bc'`, [`typeof 'a bc'`, 0]],
  ['`a bc`', ['typeof `a bc`', 0]],
  // test for string with space before
  [`  "a bc"`, ['typeof "a bc"', 2]],
  [`   'a bc'`, [`typeof 'a bc'`, 3]],
  ['    `a bc`', ['typeof `a bc`', 4]],
  // test for string with some other code before
  [`const a = 1; "a bc"`, ['typeof "a bc"', 13]],
  [`const a = 1;  'a bc'`, [`typeof 'a bc'`, 14]],
  ['const a = 1;   `a bc`', ['typeof `a bc`', 15]],
  // test for bracket
  ['str.slice(a.b.c)', ['typeof str.slice(a.b.c)', 0]],
  ['str.slice(a.b.c, 1, 50)', ['typeof str.slice(a.b.c, 1, 50)', 0]],
  [
    'str.slice(String(a.b.c), 1, 50)',
    ['typeof str.slice(String(a.b.c), 1, 50)', 0],
  ],
  [
    'arr.filter(item => item !== -1 && Boolean(item))',
    ['typeof arr.filter(item => item !== -1 && Boolean(item))', 0],
  ],
  // test for bracket with space before
  ['  str.slice(a.b.c)', ['typeof str.slice(a.b.c)', 2]],
  ['   str.slice(a.b.c, 1, 50)', ['typeof str.slice(a.b.c, 1, 50)', 3]],
  [
    '    str.slice(String(a.b.c), 1, 50)',
    ['typeof str.slice(String(a.b.c), 1, 50)', 4],
  ],
  [
    '     arr.filter(item => item !== -1 && Boolean(item))',
    ['typeof arr.filter(item => item !== -1 && Boolean(item))', 5],
  ],
  // test for bracket with some other code before
  ['const a = 1; str.slice(a.b.c)', ['typeof str.slice(a.b.c)', 13]],
  [
    'const a = 1;  str.slice(a.b.c, 1, 50)',
    ['typeof str.slice(a.b.c, 1, 50)', 14],
  ],
  [
    'const a = 1;   str.slice(String(a.b.c), 1, 50)',
    ['typeof str.slice(String(a.b.c), 1, 50)', 15],
  ],
  [
    'const a = 1;    arr.filter(item => item !== -1 && Boolean(item))',
    ['typeof arr.filter(item => item !== -1 && Boolean(item))', 16],
  ],
  // more complex situation
  [`a + b === c / d && (e - f)`, [`typeof a + b === c / d && (e - f)`, 0]],
  [`  a + b === c / d && (e - f)`, [`typeof a + b === c / d && (e - f)`, 2]],
];

const _dotTypeofTestData: Case[] = dotTypeofTestData.map(
  ([_source, [target, sliceStart]]) => {
    const source = `${_source}.typeof`;

    return [source, [target, sliceStart, source.length]];
  }
);

export default _dotTypeofTestData;
