const spaceMap = new Map();

export function space(count) {
  return spaceMap.get(count) || spaceMap.set(count, Array(count).fill(' ').join('')).get(count);
}