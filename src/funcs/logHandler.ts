import * as vscode from 'vscode';

import type { Handler } from './types';
import { matchFromContent } from './utils';

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

  let replaceText = '';

  const mergedWithMessage = withMessage && !isString;
  const needBracket = !(
    sliceContent.startsWith('(') &&
    sliceContent.endsWith(')') &&
    !mergedWithMessage
  );

  if (mergedWithMessage) {
    replaceText = `console.log${
      needBracket ? '(' : ''
    }\`${sliceContent.replaceAll('`', '\\`')}\`, ${sliceContent}${
      needBracket ? ')' : ''
    }`;
  } else {
    replaceText = `console.log${needBracket ? '(' : ''}${sliceContent}${
      needBracket ? ')' : ''
    }`;
  }

  edit.replace(new vscode.Range(sliceStart, sliceEnd), replaceText);
};

export default logHandler;
