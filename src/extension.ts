import * as vscode from 'vscode';

import logHandler from './funcs/logHandler';
import ifHandler from './funcs/ifHandler';
import useStateHandler from './funcs/useStateHandler';
import useMemoHandler from './funcs/useMemoHandler';
import { Trigger, getConfigList } from './config';

const command = 'replace';

class CompletionItemProvider implements vscode.CompletionItemProvider {
  position?: vscode.Position;
  config: any[];

  constructor() {
    this.config = getConfigList();
  }

  public provideCompletionItems(
    _: vscode.TextDocument,
    position: vscode.Position
  ) {
    this.position = position;
    const completions = this.config.map((item) => {
      const snippetCompletion = new vscode.CompletionItem(
        item.label,
        vscode.CompletionItemKind.Operator
      );
      snippetCompletion.documentation = new vscode.MarkdownString(
        item.description
      );
      return snippetCompletion;
    });

    return completions;
  }

  public resolveCompletionItem(item: vscode.CompletionItem) {
    const label = item.label;
    if (this.position && this.config && typeof label === 'string') {
      const config = this.config.find((config) => config.label === label);
      item.command = {
        command,
        title: 'refactor',
        arguments: [this.position.translate(0, label.length + 1), config],
      };
    }

    return item;
  }

  private updateConfig() {
    this.config = getConfigList();
  }
}


export function activate(context: vscode.ExtensionContext) {
  let completionItemProvider;
  const options = vscode.languages.registerCompletionItemProvider(
    [
      'html',
      'javascript',
      'javascriptreact',
      'typescript',
      'typescriptreact',
      'vue',
    ],
    completionItemProvider = new CompletionItemProvider(),
    '.'
  );
  const commandHandler = (
    editor: vscode.TextEditor,
    edit: vscode.TextEditorEdit,
    position: vscode.Position,
    config
  ) => {
    switch(config.label as Trigger) {
      case Trigger.log: 
        logHandler(editor, edit, position);
        break;
      case Trigger.logM:
        logHandler(editor, edit, position, { withMessage: true });
        break;
      case Trigger.if:
        ifHandler(editor, edit, position);
        break;
      case Trigger.useState:
        useStateHandler(editor, edit, position);
        break;
      case Trigger.useMemo:
        useMemoHandler(editor, edit, position);
        break;
    }

    return Promise.resolve([]);
  };

  context.subscriptions.push(
    vscode.commands.registerTextEditorCommand(command, commandHandler)
  );
  context.subscriptions.push(options);

  vscode.workspace.onDidChangeConfiguration(
    () => {
      completionItemProvider.updateConfig();      
    },
    null,
    context.subscriptions
  );
}

export function deactivate() {}
