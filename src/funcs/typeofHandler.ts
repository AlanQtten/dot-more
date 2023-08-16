import * as vscode from 'vscode';

import type { Handler } from './types';
import { matchFromContent } from './utils';

const typeofHandler: Handler = (editor, edit, position) => {
  const { sliceStart, sliceEnd, sliceContent } =
    matchFromContent(editor.document, position, '.typeof') ?? {};

  if (!sliceStart || !sliceEnd) {
    return;
  }

  const replaceText = `typeof ${sliceContent}`;

  edit.replace(new vscode.Range(sliceStart, sliceEnd), replaceText);
};

export default typeofHandler;
