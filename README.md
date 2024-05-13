# Dot More

## example
![example](https://raw.githubusercontent.com/AlanQtten/dot-more/main/assets/example.gif)

## auto complete
use .xxx to complete you sentence quickly, just like Webstorm
```js
// ${c} means keyboard cursor

a.b.c.log    
// console.log(a.b.c)

"a b c".log
// console.log("a b c")

arr.filter(item => Boolean(item)).log
// console.log(arr.filter(item => Boolean(item)))

typeof a + b / c + d && e === 'function'.log
// console.log(typeof a + b / c + d && e === 'function')

{
  a: [1,2,3],
  b: /\[some reg/,
  c: `some str`,
  d: {
    // ...
  }
}.log
/**
 * console.log({
 *  a: [1,2,3],
 *  b: /\[some reg/,
 *  c: `some str`,
 *  d: {
 *    // ...
 *  }
 * })
 */

a.b.c.logM 
// console.log(`a.b.c`, a.b.c)

a.b.c.if    
/**
 * if(a.b.c) {
 *   ${c}
 * }
 */

a.b.c.typeof
// typeof a.b.c

typeof a + b / c + d && e === 'function'.if
/**
 * if(typeof a + b / c + d && e === 'function') {
 *   ${c}
 * }
 */

```
some react extend grammar
```tsx
// ${c} means keyboard cursor

apple.useState
// const [apple, setApple] = useState(${c})

apple.useMemo
/**
 * const apple = useMemo(() => {
 *   ${c}
 * }, [])
 */
```

## Config
|config|description|default value|
|---|---|---|
|dotMore.disableReactExtends|whether to disable react grammar extend|false|