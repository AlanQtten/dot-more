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

  const _withMessage = withMessage && !isString;
  if (_withMessage) {
    replaceText = `console.log(\`${sliceContent.replaceAll(
      '`',
      '\\`'
    )}\`, ${sliceContent})`;
  } else {
    replaceText = `console.log(${sliceContent})`;
  }

  edit.replace(new vscode.Range(sliceStart, sliceEnd), replaceText);
};

export default logHandler;
