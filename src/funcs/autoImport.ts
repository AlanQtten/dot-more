import * as vscode from 'vscode';

interface AutoImport {
  (
    edit: vscode.TextEditorEdit,
    options: {
      importTarget: string | string[];
      importFrom: string;
    }
  ): void;
}

const autoImport: AutoImport = (
  edit: vscode.TextEditorEdit,
  { importTarget, importFrom }
) => {
  if (vscode.workspace.getConfiguration('dotMore').get('disableAutoImport')) {
    return;
  }

  const importLine = Array.isArray(importTarget)
    ? `import { ${importTarget.join(', ')} } from '${importFrom}';`
    : `import { ${importTarget} } from '${importFrom}';`;

  edit.insert(new vscode.Position(0, 0), `${importLine}\n`);
};

export default autoImport;
