import * as vscode from 'vscode';

import type { Handler } from './types';
import { firstLetterToUpperCase, matchFromContent } from './utils';
import autoImport from './autoImport';

const useStateHandler: Handler = (editor, edit, position) => {
  const { sliceStart, sliceEnd, sliceContent } =
    matchFromContent(editor.document, position, '.useState') ?? {};

  if (!sliceStart || !sliceEnd || !sliceContent) {
    return;
  }

  if (!/^[a-zA-Z]+$/.test(sliceContent)) {
    return;
  }

  const replaceText = `const [${sliceContent}, set${firstLetterToUpperCase(
    sliceContent
  )}] = useState();`;

  edit.replace(new vscode.Range(sliceStart, sliceEnd), replaceText);

  autoImport(edit, {
    importTarget: 'useState',
    importFrom: 'react',
  });
};

export default useStateHandler;
