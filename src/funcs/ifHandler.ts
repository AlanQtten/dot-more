import * as vscode from 'vscode';

import type { Handler } from "./types";
import { matchFromContent } from "./utils";

const ifHandler: Handler = (
  editor,
  edit,
  position
) => {
  const content = editor.document.lineAt(position).text;

  const {
    sliceContent,
    sliceStart
  } = matchFromContent(content, '.if');

  const preBlank = Array(sliceStart).fill(' ').join('');
  const replaceText = `if(${sliceContent}) {\n${preBlank}\t\n${preBlank}}`;

  edit.replace(
    new vscode.Range(
      new vscode.Position(position.line, sliceStart),
      new vscode.Position(position.line, content.length),
    ),
    replaceText
  );

  const focus = new vscode.Position(position.line + 1, 0);

  setTimeout(() => {
    editor.selection = new vscode.Selection(focus, focus);

    vscode.commands.executeCommand('cursorLineEnd');
  });
};

export default ifHandler;