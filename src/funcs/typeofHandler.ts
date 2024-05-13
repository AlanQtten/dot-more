import * as vscode from 'vscode';

import type { Handler } from "./types";
import { matchFromContent } from "./utils";

const typeofHandler: Handler = (
  editor,
  edit,
  position
) => {
  const content = editor.document.lineAt(position).text;

  const {
    sliceContent,
    sliceStart
  } = matchFromContent(content, '.typeof');

  const replaceText = `typeof ${sliceContent}`;

  edit.replace(
    new vscode.Range(
      new vscode.Position(position.line, sliceStart),
      new vscode.Position(position.line, content.length),
    ),
    replaceText
  );

  // const focus = new vscode.Position(position.line, sliceStart + replaceText.length - 2);

  // setTimeout(() => {
  //   editor.selection = new vscode.Selection(focus, focus);
  // });
};

export default typeofHandler;