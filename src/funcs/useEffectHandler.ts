import * as vscode from 'vscode';

import type { Handler } from './types';
import { matchFromContent } from './utils';
import autoImport from './autoImport';

const useEffectHandler: Handler = (editor, edit, position) => {
  const { sliceStart, sliceEnd, sliceContent } =
    matchFromContent(editor.document, position, '.useEffect') ?? {};

  if (!sliceStart || !sliceEnd || !sliceContent) {
    return;
  }

  const preBlank = Array(sliceStart.character).fill(' ').join('');
  const replaceText = `useEffect(() => {\n${preBlank}\tconsole.log(\`${sliceContent} change\`, ${sliceContent})\n${preBlank}}, [${sliceContent}])`;

  edit.replace(new vscode.Range(sliceStart, sliceEnd), replaceText);

  const focus = new vscode.Position(position.line + 1, 0);

  setTimeout(() => {
    editor.selection = new vscode.Selection(focus, focus);

    vscode.commands.executeCommand('cursorLineEnd');
  });

  autoImport(editor, edit, {
    importTarget: 'useEffect',
    importFrom: 'react',
  });
};

export default useEffectHandler;
