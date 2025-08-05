import * as vscode from 'vscode';

import type { Handler } from './types';
import { matchFromContent } from './utils';
import { get } from '../config/vscodeConfig';

export type LogHandlerOptions = {
  withMessage: boolean;
};

const logHandler: Handler<LogHandlerOptions> = (
  editor,
  edit,
  position,
  { withMessage = false } = { withMessage: false }
) => {
  const { sliceStart, sliceEnd, sliceContent, isString } =
    matchFromContent(
      editor.document,
      position,
      withMessage ? '.logM' : '.log'
    ) ?? {};

  if (!sliceStart || !sliceEnd || !sliceContent) {
    return;
  }

  const maxLengthOfWithMessage = get('maxLengthOfLogmPrefixMessage');
  const cloneLogResult = get('alwaysCloneLogResult');
  let replaceText = '';

  const mergedWithMessage = withMessage && !isString;
  const needBracket = !(
    sliceContent.startsWith('(') && sliceContent.endsWith(')')
  );

  const wrapWithClone = cloneLogResult
    ? (str: string) => `structuredClone(${str})`
    : (str: string) => str;

  if (mergedWithMessage) {
    let message = `${
      cloneLogResult ? `[[cloned]]::` : ''
    }${sliceContent.replaceAll('`', '\\`')}`;

    if (message.length > maxLengthOfWithMessage) {
      message = `${message.slice(0, maxLengthOfWithMessage)}...`;
    }

    replaceText = `console.log(\`${message}\`, ${wrapWithClone(sliceContent)})`;
  } else {
    replaceText = `console.log${needBracket ? '(' : ''}${wrapWithClone(
      sliceContent
    )}${needBracket ? ')' : ''}`;
  }

  edit.replace(new vscode.Range(sliceStart, sliceEnd), replaceText);
};

export default logHandler;
