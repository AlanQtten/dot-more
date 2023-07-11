import * as vscode from 'vscode';

import type { Handler } from "./types";
import { matchFromContent } from "./utils";

const useMemoHandler: Handler = (
  editor,
  edit,
  position
) => {
  const content = editor.document.lineAt(position).text;

  const {
    sliceContent,
    sliceStart,
    isString,
  } = matchFromContent(content, '.useMemo');

  if(!/^[a-zA-Z]+$/.test(sliceContent)) {
    return;
  }

  const preBlank = Array(sliceStart).fill(' ').join('');
  const replaceText = `const ${sliceContent} = useMemo(() => {\n${preBlank}\t\n${preBlank}}, [])`;

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

export default useMemoHandler;