const stringSymbolTester = /'|"|`/;
export function isStringStatement(statement: string) {
  const _statement = statement.trim();

  return (
    stringSymbolTester.test(_statement[0]) &&
    stringSymbolTester.test(_statement[_statement.length - 1])
  );
}

const calcLength = (strArr: string[]) => {
  return strArr.reduce((l, c) => l + c.length + 1, 0);
};

export const updateStartIndexWhileContainBlank = (content: string): number => {
  if (content.indexOf(' ') === -1) {
    return 0;
  }

  return content.split('').findIndex((letter) => letter !== ' ');
};

export const matchFromContent = (
  content: string,
  trigger: string
):
  | {
      sliceContent?: string;
      sliceStart?: number;
      isString?: boolean;
    }
  | undefined => {
  const triggerMessageLength = trigger.length;
  if (content.length <= triggerMessageLength) {
    return;
  }
  const l = content.length;
  const logicSentences = content.slice(0, l - triggerMessageLength).split(';');
  const analyzeSentence = logicSentences.pop() ?? '';
  const preLength = calcLength(logicSentences);

  const lastCharacterIndex = analyzeSentence.length - 1;
  const lastCharacter = analyzeSentence[lastCharacterIndex];

  let sliceStart = 0;
  let isString = false;
  if (isStringStatement(analyzeSentence)) {
    const _sliceStart = analyzeSentence
      .slice(0, lastCharacterIndex)
      .split('')
      .findLastIndex((v, index, arr) => {
        return v === lastCharacter && arr[index - 1] !== '\\';
      });

    _sliceStart !== -1 && (sliceStart = _sliceStart);
    isString = true;
  } else {
    sliceStart = updateStartIndexWhileContainBlank(analyzeSentence);
  }

  sliceStart += preLength;

  return {
    sliceContent: content.slice(sliceStart, l - triggerMessageLength),
    sliceStart,
    isString,
  };
};
