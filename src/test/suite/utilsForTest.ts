const spaceMap = new Map();

export function space(count: number): string {
  return (
    spaceMap.get(count) ||
    spaceMap.set(count, Array(count).fill(' ').join('')).get(count)
  );
}

export function getSuiteName(word: string) {
  return `\n--------------------Test Suite< ${word} >--------------------`;
}

type Func = (...args: any[]) => any;
export function callable<T>(
  f: T,
  ...args: T extends Func ? Parameters<T> : []
): T extends Func ? ReturnType<T> : Exclude<T, Func> {
  if (typeof f === 'function') {
    return f(...args);
  }
  return f as any;
  // return f;
}
