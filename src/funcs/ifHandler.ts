import * as vscode from 'vscode';

import type { Handler } from './types';
import { matchFromContent } from './utils';

const ifHandler: Handler = (editor, edit, position) => {
  const { sliceStart, sliceEnd, sliceContent } =
    matchFromContent(editor.document, position, '.if') ?? {};

  if (!sliceStart || !sliceEnd) {
    return;
  }

  const preBlank = Array(sliceStart.character).fill(' ').join('');
  const replaceText = `if(${sliceContent}) {\n${preBlank}\t\n${preBlank}}`;

  edit.replace(new vscode.Range(sliceStart, sliceEnd), replaceText);

  const focus = new vscode.Position(position.line + 1, 0);

  setTimeout(() => {
    editor.selection = new vscode.Selection(focus, focus);

    vscode.commands.executeCommand('cursorLineEnd');
  });
};

export default ifHandler;
