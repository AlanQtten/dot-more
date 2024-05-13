import vscode from 'vscode';

export interface Handler{
  (
    editor: vscode.TextEditor,
    edit: vscode.TextEditorEdit,
    position: vscode.Position,
    options?: any
  ): void
}