import * as vscode from 'vscode';

import type { Handler } from './types';
import { matchFromContent } from './utils';

const useStateHandler: Handler = (editor, edit, position) => {
  const { sliceStart, sliceEnd, sliceContent } =
    matchFromContent(editor.document, position, '.useState') ?? {};

  if (!sliceStart || !sliceEnd || !sliceContent) {
    return;
  }

  if (!/^[a-zA-Z]+$/.test(sliceContent)) {
    return;
  }

  const replaceText = `const [${sliceContent}, set${sliceContent
    .slice(0, 1)
    .toUpperCase()}${sliceContent.slice(1)}] = useState();`;

  edit.replace(new vscode.Range(sliceStart, sliceEnd), replaceText);
};

export default useStateHandler;
