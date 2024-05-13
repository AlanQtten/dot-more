/* v8 ignore next 999 */
export type NumberOrProcessNumber =
  | number
  | ((source: LineMap, target: string) => number);

export type LineMap = Record<number, string>;

export type NumberPackage = [number, number, number, number];

export type NumberOrProcessNumberPackage = [
  /* startLine */ NumberOrProcessNumber,
  /* startCharacter */ NumberOrProcessNumber,
  /* endLine */ NumberOrProcessNumber,
  /* endCharacter */ NumberOrProcessNumber,
];

export type InlineCase<T = null> = [
  /* transform source */ string,
  [
    /* transform result */ string | undefined,
    NumberOrProcessNumberPackage,
    /* process line, default: last */ number?,
    /* debug default: false */ boolean?,
  ]?,
  T?,
];

export type NamedInlineCase<T = null> = Record<string, InlineCase<T>[]>;

export type Case<T = null> = [
  LineMap,
  [string, NumberPackage],
  /* process line */ number,
  T?,
];

export type NamedCase<T = null> = Record<string, Case<T>[]>;
