import * as vscode from 'vscode';

import type { Handler } from "./types";
import { matchFromContent } from "./utils";

const useStateHandler: Handler = (
  editor,
  edit,
  position
) => {
  const content = editor.document.lineAt(position).text;

  const {
    sliceContent,
    sliceStart
  } = matchFromContent(content, '.useState');

  if(!/^[a-zA-Z]+$/.test(sliceContent)) {
    return;
  }

  const replaceText = `const [${sliceContent}, set${sliceContent.slice(0, 1).toUpperCase()}${sliceContent.slice(1)}] = useState();`;

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

export default useStateHandler;