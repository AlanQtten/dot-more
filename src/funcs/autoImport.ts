import * as vscode from 'vscode';
import { sliceByEndOf } from './utils';
import { get } from '../config/vscodeConfig';

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
  if (get('disableAutoImport')) {
    return;
  }
  let importTargets = Array.isArray(importTarget)
    ? importTarget
    : [importTarget];

  const content = editor.document.getText();
  const importContent =
    sliceByEndOf(content, `from '${importFrom}'`, 'import') ||
    sliceByEndOf(content, `from "${importFrom}"`, 'import');

  if (importContent) {
    const alreadyImport = sliceByEndOf(importContent, '}', '{')
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
