import * as vscode from 'vscode';
import { sliceBy } from './utils';

interface AutoImport {
  (
    editor: vscode.TextEditor,
    edit: vscode.TextEditorEdit,
    options: {
      importTarget: string | string[];
      importFrom: string;
    }
  ): void;
}

const autoImport: AutoImport = (editor, edit, { importTarget, importFrom }) => {
  if (vscode.workspace.getConfiguration('dotMore').get('disableAutoImport')) {
    return;
  }

  let importTargets = Array.isArray(importTarget)
    ? importTarget
    : [importTarget];

  const content = editor.document.getText();
  const importContent =
    sliceBy(content, 'import', `from '${importFrom}'`) ||
    sliceBy(content, 'import', `from "${importFrom}"`);
  if (importContent) {
    const alreadyImport = sliceBy(importContent, '{', '}')
      .slice(1, -1)
      .replaceAll('\n', '')
      .split(',')
      .map((target) => target.trim());

    importTargets = importTargets.filter(
      (target) => !alreadyImport.includes(target)
    );
  }

  if (importTargets.length) {
    const importLine = `import { ${importTargets.join(
      ', '
    )} } from '${importFrom}';`;

    edit.insert(new vscode.Position(0, 0), `${importLine}\n`);
  }
};

export default autoImport;
