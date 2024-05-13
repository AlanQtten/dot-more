const spaceMap = new Map();

export default function space(count: number): string {
  return (
    spaceMap.get(count) ||
    spaceMap.set(count, Array(count).fill(' ').join('')).get(count)
  );
}
