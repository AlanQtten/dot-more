import * as vscode from 'vscode';

import type { Handler } from './types';
import { matchFromContent } from './utils';
import autoImport from './autoImport';

const useMemoHandler: Handler = (editor, edit, position) => {
  const { sliceStart, sliceEnd, sliceContent } =
    matchFromContent(editor.document, position, '.useMemo') ?? {};

  if (!sliceStart || !sliceEnd || !sliceContent) {
    return;
  }

  if (!/^[a-zA-Z]+$/.test(sliceContent)) {
    return;
  }

  const preBlank = Array(sliceStart.character).fill(' ').join('');
  const replaceText = `const ${sliceContent} = useMemo(() => {\n${preBlank}\t\n${preBlank}}, [])`;

  edit.replace(new vscode.Range(sliceStart, sliceEnd), replaceText);

  const focus = new vscode.Position(position.line + 1, 0);

  setTimeout(() => {
    editor.selection = new vscode.Selection(focus, focus);

    vscode.commands.executeCommand('cursorLineEnd');
  });

  autoImport(edit, {
    importTarget: 'useMemo',
    importFrom: 'react',
  });
};

export default useMemoHandler;
