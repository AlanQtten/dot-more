/**
 * Prettier Configuration File
 * If options.editorconfig is true and an .editorconfig file is in your project,
 * Prettier will parse it and convert its properties to the corresponding Prettier configuration.
 */

export default {
  // 对应 .editorconfig max_line_length，暂时关闭
  // printWidth: 120,

  // 使用空格缩进，对应 .editorconfig indent_style
  useTabs: false,

  // 缩进量，对应 editorconfig indent_size or tab_width
  tabWidth: 2,

  // 在多行逗号分隔的句法结构(对象、数组等)中打印尾随逗号，TS 类型声明中不需要
  trailingComma: 'es5',

  // 剪头函数参数用括号包裹
  arrowParens: 'always',

  // js 中使用单引号，jsx 中使用双引号，eg: <div className="text" style={{ display: 'block' }} />
  singleQuote: true,
  jsxSingleQuote: false,

  // 语句末尾加分号
  semi: true,

  // { foo: bar }
  bracketSpacing: true,

  // 文件行尾，对应 .editorconfig end_of_line
  // endOfLine: 'auto',

  overrides: [
    {
      files: [
        'docs/**/*.md',
        'docs/src/pages/**/*.{js,tsx}',
        'docs/data/**/*.{js,tsx}',
      ],
      options: {
        // otherwise code blocks overflow on the docs website
        // The container is 751px
        printWidth: 85,
      },
    },
    {
      files: ['docs/pages/blog/**/*.md'],
      options: {
        // otherwise code blocks overflow on the blog website
        // The container is 692px
        printWidth: 82,
      },
    },
  ],
};
