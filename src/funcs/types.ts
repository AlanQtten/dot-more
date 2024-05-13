import vscode from 'vscode';

export interface Handler<T = object> {
  (
    editor: vscode.TextEditor,
    edit: vscode.TextEditorEdit,
    position: vscode.Position,
    options?: T
  ): void;
}
