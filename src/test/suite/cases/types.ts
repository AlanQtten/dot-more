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
export type Case<T = null> = [
  Record<number, string>,
  [string, NumberPackage],
  /* process line */ number,
  /* debug */ boolean,
  T?,
];