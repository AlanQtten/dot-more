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
  const content = editor.document.lineAt(position).text;

  const { sliceContent, sliceStart, isString } =
    matchFromContent(content, withMessage ? '.logM' : '.log') ?? {};

  if (sliceStart === undefined || sliceContent === undefined) {
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

  edit.replace(
    new vscode.Range(
      new vscode.Position(position.line, sliceStart),
      new vscode.Position(position.line, content.length)
    ),
    replaceText
  );
};

export default logHandler;
