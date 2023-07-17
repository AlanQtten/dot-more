import { space } from "../utilsForTest";

export default [
  // test for basic func
  ['a.b.c', ['if(a.b.c) {\n\t\n}', 0]],
  // test for basic func with space before
  ['  a.b.c', ['if(a.b.c) {\n  \t\n  }', 2]],
  // test for basic func with some other code before
  // ['a.b c', [`if(c) {\n${space(4)}\t\n${space(4)}}`, 4]],
  // test for string 
  [`"a bc"`, ['if("a bc") {\n\t\n}', 0]],
  [`'a bc'`, [`if('a bc') {\n\t\n}`, 0]],
  ["`a bc`", ['if(`a bc`) {\n\t\n}', 0]],
  // test for string with space before
  [`  "a bc"`, [`if("a bc") {\n${space(2)}\t\n${space(2)}}`, 2]],
  [`   'a bc'`, [`if('a bc') {\n${space(3)}\t\n${space(3)}}`, 3]],
  ["    `a bc`", [`if(\`a bc\`) {\n${space(4)}\t\n${space(4)}}`, 4]],
  // test for string with some other code before
  [`const a = 1; "a bc"`, [`if("a bc") {\n${space(13)}\t\n${space(13)}}`, 13]],
  [`const a = 1;  'a bc'`, [`if('a bc') {\n${space(14)}\t\n${space(14)}}`, 14]],
  ["const a = 1;   `a bc`", [`if(\`a bc\`) {\n${space(15)}\t\n${space(15)}}`, 15]],
  // test for bracket
  ['str.slice(a.b.c)', ['if(str.slice(a.b.c)) {\n\t\n}', 0]],
  ['str.slice(a.b.c, 1, 50)', ['if(str.slice(a.b.c, 1, 50)) {\n\t\n}', 0]],
  ['str.slice(String(a.b.c), 1, 50)', ['if(str.slice(String(a.b.c), 1, 50)) {\n\t\n}', 0]],
  ['arr.filter(item => item !== -1 && Boolean(item))', ['if(arr.filter(item => item !== -1 && Boolean(item))) {\n\t\n}', 0]],
  // test for bracket with space before
  ['  str.slice(a.b.c)', [`if(str.slice(a.b.c)) {\n${space(2)}\t\n${space(2)}}`, 2]],
  ['   str.slice(a.b.c, 1, 50)', [`if(str.slice(a.b.c, 1, 50)) {\n${space(3)}\t\n${space(3)}}`, 3]],
  ['    str.slice(String(a.b.c), 1, 50)', [`if(str.slice(String(a.b.c), 1, 50)) {\n${space(4)}\t\n${space(4)}}`, 4]],
  [
    '     arr.filter(item => item !== -1 && Boolean(item))',
    [`if(arr.filter(item => item !== -1 && Boolean(item))) {\n${space(5)}\t\n${space(5)}}`, 5]
  ],
  // test for bracket with some other code before
  ['const a = 1; str.slice(a.b.c)', [`if(str.slice(a.b.c)) {\n${space(13)}\t\n${space(13)}}`, 13]],
  ['const a = 1;  str.slice(a.b.c, 1, 50)', [`if(str.slice(a.b.c, 1, 50)) {\n${space(14)}\t\n${space(14)}}`, 14]],
  ['const a = 1;   str.slice(String(a.b.c), 1, 50)', [`if(str.slice(String(a.b.c), 1, 50)) {\n${space(15)}\t\n${space(15)}}`, 15]],
  [
    'const a = 1;    arr.filter(item => item !== -1 && Boolean(item))', 
    [`if(arr.filter(item => item !== -1 && Boolean(item))) {\n${space(16)}\t\n${space(16)}}`, 16]
  ],
  // test for "typeof"
  ['typeof a.b.c', [`if(typeof a.b.c) {\n\t\n}`, 0]],
  // test for "typeof" with space before
  ['  typeof a.b.c', [`if(typeof a.b.c) {\n${space(2)}\t\n${space(2)}}`, 2]],
  ['   typeof a.b.c', [`if(typeof a.b.c) {\n${space(3)}\t\n${space(3)}}`, 3]],
  ['    typeof a.b.c', [`if(typeof a.b.c) {\n${space(4)}\t\n${space(4)}}`, 4]],
  // test for "typeof" with some other code before
  ['const a = 1;  typeof a.b.c', [`if(typeof a.b.c) {\n${space(14)}\t\n${space(14)}}`, 14]],
  ['const a = 1;   typeof a.b.c', [`if(typeof a.b.c) {\n${space(15)}\t\n${space(15)}}`, 15]],
  ['const a = 1;    typeof a.b.c', [`if(typeof a.b.c) {\n${space(16)}\t\n${space(16)}}`, 16]],
  // test for "typeof" with bracket
  ['typeof str.slice(a.b.c)', ['if(typeof str.slice(a.b.c)) {\n\t\n}', 0]],
  // test for "typeof" with bracket and with space before
  ['  typeof str.slice(a.b.c)', [`if(typeof str.slice(a.b.c)) {\n${space(2)}\t\n${space(2)}}`, 2]],
  ['   typeof str.slice(a.b.c, 1, 50)', [`if(typeof str.slice(a.b.c, 1, 50)) {\n${space(3)}\t\n${space(3)}}`, 3]],
  ['    typeof str.slice(String(a.b.c), 1, 50)', [`if(typeof str.slice(String(a.b.c), 1, 50)) {\n${space(4)}\t\n${space(4)}}`, 4]],
  ['     typeof arr.filter(item => item !== -1 && Boolean(item))', [`if(typeof arr.filter(item => item !== -1 && Boolean(item))) {\n${space(5)}\t\n${space(5)}}`, 5]],
  // test for "typeof" with bracket and with some other code before
  ['const a = 1;  typeof str.slice(a.b.c)', [`if(typeof str.slice(a.b.c)) {\n${space(14)}\t\n${space(14)}}`, 14]],
  ['const a = 1;   typeof str.slice(a.b.c, 1, 50)', [`if(typeof str.slice(a.b.c, 1, 50)) {\n${space(15)}\t\n${space(15)}}`, 15]],
  ['const a = 1;    typeof str.slice(String(a.b.c), 1, 50)', [`if(typeof str.slice(String(a.b.c), 1, 50)) {\n${space(16)}\t\n${space(16)}}`, 16]],
  ['const a = 1;     typeof arr.filter(item => item !== -1 && Boolean(item))', [`if(typeof arr.filter(item => item !== -1 && Boolean(item))) {\n${space(17)}\t\n${space(17)}}`, 17]],
  // more complex situation
  [`a + b === c / d && (e - f)`, [`if(a + b === c / d && (e - f)) {\n\t\n}`, 0]],
  [`  a + b === c / d && (e - f)`, [`if(a + b === c / d && (e - f)) {\n${space(2)}\t\n${space(2)}}`, 2]],
  [`typeof a + b === c / d && (e - f) === 'function'`, [`if(typeof a + b === c / d && (e - f) === 'function') {\n\t\n}`, 0]],
  [`  typeof a + b === c / d && (e - f) === 'function'`, [`if(typeof a + b === c / d && (e - f) === 'function') {\n${space(2)}\t\n${space(2)}}`, 2]],
  [`const a = 1;  typeof a + b === c / d && (e - f) === 'function'`, [`if(typeof a + b === c / d && (e - f) === 'function') {\n${space(14)}\t\n${space(14)}}`, 14]],
].map(([_source, [target, sliceStart]]) => {
  const source = `${_source}.if`;
  
  return [
    source,
    [target, sliceStart, source.length]
  ];
});