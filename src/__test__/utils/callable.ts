type Func = (...args: any[]) => any;
export default function callable<T>(
  f: T,
  ...args: T extends Func ? Parameters<T> : []
): T extends Func ? ReturnType<T> : Exclude<T, Func> {
  if (typeof f === 'function') {
    return f(...args);
  }
  return f as any;
  // return f;
}
