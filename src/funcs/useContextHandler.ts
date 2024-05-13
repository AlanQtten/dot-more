import * as vscode from 'vscode';

import type { Handler } from './types';
import {
  firstLetterToLowerCase,
  firstLetterToUpperCase,
  isTsDocument,
  matchFromContent,
} from './utils';
import autoImport from './autoImport';

const useContextHandler: Handler = (editor, edit, position) => {
  const { sliceStart, sliceEnd, sliceContent } =
    matchFromContent(editor.document, position, '.useContext') ?? {};

  if (!sliceStart || !sliceEnd || !sliceContent) {
    return;
  }

  if (!/^[a-zA-Z]+$/.test(sliceContent)) {
    return;
  }

  const isTs = isTsDocument(editor.document);

  const importTarget = ['createContext', 'useContext'];
  if (isTs) {
    importTarget.push('PropsWithChildren');
  }

  const upper = firstLetterToUpperCase(sliceContent);
  const lower = firstLetterToLowerCase(sliceContent);

  const replaceText = `${isTs ? `\ntype ${upper}ContextValue = null\n` : ''}
const ${upper}Context = createContext${
    isTs ? `<${upper}ContextValue>` : ''
  }(null);
${
  isTs
    ? `\ntype ${upper}ProviderProps = PropsWithChildren<{
  value: ${upper}ContextValue;
}>;\n`
    : ''
}
export const ${upper}Provider = (props${
    isTs ? `: ${upper}ProviderProps` : ''
  }) => {
  const { children, value } = props;

  return <${upper}Context.Provider value={value}>{children}</${upper}Context.Provider>;
};

export const use${upper} = () => {
  const ${lower} = useContext(${upper}Context);

  return ${lower};
};
`;

  edit.replace(new vscode.Range(sliceStart, sliceEnd), replaceText);

  autoImport(editor, edit, {
    importTarget,
    importFrom: 'react',
  });
};

export default useContextHandler;
