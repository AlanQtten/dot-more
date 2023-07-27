import { space } from '../utilsForTest';
import type { InlineCase, Case } from './types';

const useMemoTestData: InlineCase[] = [
  // test for basic func
  ['apple', ['const apple = useMemo(() => {\n\t\n}, [])', 0]],
  // test for basic func with space before
  [
    '  apple',
    [`const apple = useMemo(() => {\n${space(2)}\t\n${space(2)}}, [])`, 2],
  ],
  [
    '   apple',
    [`const apple = useMemo(() => {\n${space(3)}\t\n${space(3)}}, [])`, 3],
  ],
  [
    '    apple',
    [`const apple = useMemo(() => {\n${space(4)}\t\n${space(4)}}, [])`, 4],
  ],
];
const _useMemoTestData: Case[] = useMemoTestData.map(
  ([_source, [target, sliceStart]]) => {
    const source = `${_source}.useMemo`;

    return [source, [target, sliceStart, source.length]];
  }
);

export default _useMemoTestData;
