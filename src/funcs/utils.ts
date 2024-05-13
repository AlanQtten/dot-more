export function isStringPrefixOrSuffix(character) {
  return character.length === 1 && /'|"|`/.test(character);
}

export const updateStartIndexWhileContainBlank = (content, start) => {
  if(content.indexOf(' ') === -1) {
    return 0;
  }

  return content.split('').findLastIndex((v: string) => v === ' ') + 1;
};

export const matchFromContent = (
  content: string,
  trigger: string
) => {
  const triggerMessageLength = trigger.length;
  if(content.length <= triggerMessageLength) {
    return;
  }
  const l = content.length;

  const lastCharacterIndex = content.length - 1 - triggerMessageLength;
  const lastCharacter = content[lastCharacterIndex];
  
  let sliceStart = 0;
  let isString = false;
  if(isStringPrefixOrSuffix(lastCharacter)) {
    const _sliceStart = content
      .slice(0, lastCharacterIndex)
      .split('')
      .findLastIndex((v, index, arr) => {
        return v === lastCharacter && arr[index - 1] !== '\\';
      });
    
    _sliceStart !== -1 && (sliceStart = _sliceStart);
    isString = true;
  }else if(lastCharacter === ')') {
    const items = content.split('');
    const l = items.length;
    let leftBracket = 0;
    let rightBracket = 0;
    let _sliceStart = 0;
    for(let i = l - 1 - triggerMessageLength; i >= 0; i--) {
      if(items[i] === '(') {
        leftBracket++;
      }else if(items[i] === ')') {
        rightBracket++;
      }else {
        continue;
      }

      if(leftBracket === rightBracket) {
        _sliceStart = i;
        break;
      }    
    }
    sliceStart = updateStartIndexWhileContainBlank(content.slice(0, _sliceStart), _sliceStart);
  }else {
    sliceStart = updateStartIndexWhileContainBlank(content, sliceStart);
  }

  return {
    sliceContent: content.slice(sliceStart, l - triggerMessageLength),
    sliceStart,
    isString,
  };
};