export default [
  // test for basic func
  ['a.b.c', ['console.log(`a.b.c`, a.b.c)', 0]],
  // test for basic func with space before
  ['  a.b.c', ['console.log(`a.b.c`, a.b.c)', 2]],
  // test for basic func with some other code before
  ['a.b c', ['console.log(`c`, c)', 4]],
  // test for string 
  [`"a bc"`, ['console.log("a bc")', 0]],
  [`'a bc'`, [`console.log('a bc')`, 0]],
  ["`a bc`", ['console.log(`a bc`)', 0]],
  // test for string with space before
  [`  "a bc"`, ['console.log("a bc")', 2]],
  [`   'a bc'`, [`console.log('a bc')`, 3]],
  ["    `a bc`", ['console.log(`a bc`)', 4]],
  // test for string with some other code before
  [`const a = 1; "a bc"`, ['console.log("a bc")', 13]],
  [`const a = 1;  'a bc'`, [`console.log('a bc')`, 14]],
  ["const a = 1;   `a bc`", ['console.log(`a bc`)', 15]],
  // test for bracket
  ['str.slice(a.b.c)', ['console.log(`str.slice(a.b.c)`, str.slice(a.b.c))', 0]],
  ['str.slice(a.b.c, 1, 50)', ['console.log(`str.slice(a.b.c, 1, 50)`, str.slice(a.b.c, 1, 50))', 0]],
  ['str.slice(String(a.b.c), 1, 50)', ['console.log(`str.slice(String(a.b.c), 1, 50)`, str.slice(String(a.b.c), 1, 50))', 0]],
  [
    'arr.filter(item => item !== -1 && Boolean(item))', 
    ['console.log(`arr.filter(item => item !== -1 && Boolean(item))`, arr.filter(item => item !== -1 && Boolean(item)))', 0]
  ],
  // test for bracket with space before
  ['  str.slice(a.b.c)', ['console.log(`str.slice(a.b.c)`, str.slice(a.b.c))', 2]],
  ['   str.slice(a.b.c, 1, 50)', ['console.log(`str.slice(a.b.c, 1, 50)`, str.slice(a.b.c, 1, 50))', 3]],
  ['    str.slice(String(a.b.c), 1, 50)', ['console.log(`str.slice(String(a.b.c), 1, 50)`, str.slice(String(a.b.c), 1, 50))', 4]],
  [
    '     arr.filter(item => item !== -1 && Boolean(item))', 
    ['console.log(`arr.filter(item => item !== -1 && Boolean(item))`, arr.filter(item => item !== -1 && Boolean(item)))', 5]
  ],
  // test for bracket with some other code before
  ['const a = 1; str.slice(a.b.c)', ['console.log(`str.slice(a.b.c)`, str.slice(a.b.c))', 13]],
  ['const a = 1;  str.slice(a.b.c, 1, 50)', ['console.log(`str.slice(a.b.c, 1, 50)`, str.slice(a.b.c, 1, 50))', 14]],
  ['const a = 1;   str.slice(String(a.b.c), 1, 50)', ['console.log(`str.slice(String(a.b.c), 1, 50)`, str.slice(String(a.b.c), 1, 50))', 15]],
  [
    'const a = 1;    arr.filter(item => item !== -1 && Boolean(item))', 
    ['console.log(`arr.filter(item => item !== -1 && Boolean(item))`, arr.filter(item => item !== -1 && Boolean(item)))', 16]
  ],
  // test for code include `
  [
    "Array.concat([`a.b.c`], ['d.e.f'])", 
    [`console.log(\`Array.concat([\\\`a.b.c\\\`], ['d.e.f'])\`, Array.concat([\`a.b.c\`], ['d.e.f']))`, 0]
  ],
  // test for code include ` and with space before
  [
    "  Array.concat([`a.b.c`], ['d.e.f'])", 
    [`console.log(\`Array.concat([\\\`a.b.c\\\`], ['d.e.f'])\`, Array.concat([\`a.b.c\`], ['d.e.f']))`, 2]
  ],
  [
    "   Array.concat([`a.b.c`], ['d.e.f'])", 
    [`console.log(\`Array.concat([\\\`a.b.c\\\`], ['d.e.f'])\`, Array.concat([\`a.b.c\`], ['d.e.f']))`, 3]
  ],
  [
    "    Array.concat([`a.b.c`], ['d.e.f'])", 
    [`console.log(\`Array.concat([\\\`a.b.c\\\`], ['d.e.f'])\`, Array.concat([\`a.b.c\`], ['d.e.f']))`, 4]
  ],
  // test for code include ` and with some other code before
  [
    "const a = 123;  Array.concat([`a.b.c`], ['d.e.f'])", 
    [`console.log(\`Array.concat([\\\`a.b.c\\\`], ['d.e.f'])\`, Array.concat([\`a.b.c\`], ['d.e.f']))`, 16]
  ]
].map(([_source, [target, sliceStart]]) => {
  const source = `${_source}.logM`;
  
  return [
    source,
    [target, sliceStart, source.length]
  ];
});