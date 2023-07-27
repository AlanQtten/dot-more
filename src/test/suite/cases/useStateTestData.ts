import type { InlineCase, Case } from './types';

const useStateTestData: InlineCase[] = [
  // test for basic func
  ['a', ['const [a, setA] = useState();', 0]],
  // test for basic func with space before
  ['  a', ['const [a, setA] = useState();', 2]],
  ['   a', ['const [a, setA] = useState();', 3]],
  ['    a', ['const [a, setA] = useState();', 4]],
  // test for more complex word
  [
    'appleAndBanana',
    ['const [appleAndBanana, setAppleAndBanana] = useState();', 0],
  ],
];

const _useStateTestData: Case[] = useStateTestData.map(
  ([_source, [target, sliceStart]]) => {
    const source = `${_source}.useState`;

    return [source, [target, sliceStart, source.length]];
  }
);

export default _useStateTestData;
