import * as vscode from 'vscode';

import type { Handler } from './types';
import { matchFromContent } from './utils';
import { get } from '../config/vscodeConfig';

export type LogHandlerOptions = {
  withMessage?: boolean;
  clone?: boolean;
};

const logHandler: Handler<LogHandlerOptions> = (
  editor,
  edit,
  position,
  { withMessage = false, clone } = { withMessage: false, clone: false }
) => {
  const { sliceStart, sliceEnd, sliceContent, isString } =
    matchFromContent(
      editor.document,
      position,
      // eslint-disable-next-line no-nested-ternary
      clone ? '.logClone' : withMessage ? '.logM' : '.log'
    ) ?? {};

  if (!sliceStart || !sliceEnd || !sliceContent) {
    return;
  }

  const maxLengthOfWithMessage = get('maxLengthOfLogmPrefixMessage');

  let replaceText = '';

  const mergedWithMessage = withMessage && !isString;
  const needBracket = !(
    sliceContent.startsWith('(') && sliceContent.endsWith(')')
  );

  const wrapWithClone = clone
    ? (str: string) => `structuredClone(${str})`
    : (str: string) => str;

  if (mergedWithMessage) {
    const clonePrefix = `${
      clone ? `'%c C ', '${get('clonePrefixStyle')}', ` : ''
    }`;

    let message = sliceContent.replaceAll('`', '\\`');
    if (message.length > maxLengthOfWithMessage) {
      message = `${message.slice(0, maxLengthOfWithMessage)}...`;
    }

    replaceText = `console.log(${clonePrefix}\`${message}\`, ${wrapWithClone(
      sliceContent
    )})`;
  } else {
    replaceText = `console.log${needBracket ? '(' : ''}${wrapWithClone(
      sliceContent
    )}${needBracket ? ')' : ''}`;
  }

  edit.replace(new vscode.Range(sliceStart, sliceEnd), replaceText);
};

export default logHandler;
