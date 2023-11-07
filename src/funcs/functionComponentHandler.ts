import * as vscode from 'vscode';

import type { Handler } from './types';
import {
  contentHasText,
  firstLetterToUpperCase,
  isTsDocument,
  matchFromContent,
} from './utils';

const functionComponentHandler: Handler = (editor, edit, position) => {
  const { sliceStart, sliceEnd, sliceContent } =
    matchFromContent(editor.document, position, '.fc') ?? {};

  if (!sliceStart || !sliceEnd || !sliceContent) {
    return;
  }

  if (!/^[a-zA-Z]+$/.test(sliceContent)) {
    return;
  }

  const fcName = firstLetterToUpperCase(sliceContent);

  const isTs = isTsDocument(editor.document);

  let replaceText = `${
    isTs ? `type ${fcName}Props = {}\n\n` : ``
  }const ${fcName} = (props${isTs ? `: ${fcName}Props` : ``}) => {
    const { } = props;

    return <div>${fcName}</div>
}`;

  if (!contentHasText(editor.document.getText(), 'export default')) {
    replaceText += `\n\nexport default ${fcName}`;
  }

  edit.replace(new vscode.Range(sliceStart, sliceEnd), replaceText);
};

export default functionComponentHandler;
