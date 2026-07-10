# CHANGELOG

## 2.0.0

- 🌟 a brand new logo(build by chatgpt)
- 🐛 refactor content matching to support ts code

## 1.2.0

- 💥 remove `alwaysCloneLogResult` and provide a separate command to log with clone

## 1.1.0

`2025-08-05`

- 🌟 support customize length of prefix message of `logM`
- 🌟 support use `structuredClone` to log result

## 1.0.4

`2024-03-19`

- 🌟 support log with something comment behind, eg:

```js
apple.log // some comment behind
// =>
console.log(apple) // some comment behind

list.map(item => ({
  ...item
})).log // some comment behind
// =>
console.log(list.map(item => ({
  ...item
}))) // some comment behind
```

## 1.0.3

`2024-03-14`

- 🌟 support log multiple value: `(x, y).log` => `console.log(x, y)`

## 1.0.2

`2024-01-31`

- 🌟 print value with `.useEffect`
- 🌟 support some es6 syntax with `import`(e.g. import.meta.url、import(...))

## 1.0.1

`2024-01-09`

- 🐛 fix some issue with `autoImport`
- ✍️ add test case for `.useEffect`

## 1.0.0

`2024-01-04`

- 🌟 refactor project with `pnpm` & `vite` & `vitest`

## 0.0.8

`2023-11-30`

- 🌟 add feature `.useEffect`
- 🌟 adjust code with `.useContext`

## 0.0.7

`2023-11-13`

- 🐛 fix repeat import issue

## 0.0.6

`2023-11-07`

- 🌟 add auto import for some api(useState, useMemo etc)
- 🌟 add feature `.useContext`
- 🌟 add feature `.fc`
- 🌟 add config `dotMore.disableAutoImport`
- 🚀 performance improve

## 0.0.5

`2023-08-17`

- 🚀 performance improve

## 0.0.4

`2023-08-16`

- 💥 remove support for one line with multiple sentence
- 🌟 add support for multiple line with one sentence

## 0.0.3

`2023-07-17`

- 🌟 add feature `.typeof`
- 🌟 add support for more syntax
  - such as sentence with operator or typeof etc
- ✍️ change README language to english

## 0.0.2

`2023-07-11`

- 🌟 add react extends
- 🌟 add config `dotMore.disableReactExtends`
- 🌟 add feature `.useState`
- 🌟 add feature `.useMemo`
- 🌟 refactor `.log`,`.logM`,`.if` and support more syntax
- 🌟 add auto test script
- 💥 remove `.for`

## 0.0.1

`2023-07-05`

- 🌟 add feature `.log`
- 🌟 add feature `.if`
- 🌟 add feature `.logM`
- 🌟 add feature `.for`
- 🌟 init LICENSE & README
