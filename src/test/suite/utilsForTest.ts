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
