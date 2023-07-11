# dot-more

## 自动补全
通过.xxx的语法来快捷补全
```js
// ${c}表示光标位置

a.b.c.log    
// console.log(a.b.c)

"a b c".log
// console.log("a b c")

arr.filter(item => Boolean(item)).log
// console.log(arr.filter(item => Boolean(item)))

a.b.c.logM 
// console.log(`a.b.c`, a.b.c)

a.b.c.if    
/**
 * if(a.b.c) {
 *   ${c}
 * }
 */

```
一些react语法
```tsx
// ${c}表示光标位置

apple.useState
// const [apple, setApple] = useState(${c})

apple.useMemo
/**
 * const apple = useMemo(() => {
 *   ${c}
 * }, [])
 */
```

## 配置
|配置|说明|默认值|
|---|---|---|
|dotMore.disableReactExtends|是否禁用react扩展|false|