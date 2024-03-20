/* v8 ignore next 999 */
import * as vscode from 'vscode';

import logHandler from './funcs/logHandler';
import ifHandler from './funcs/ifHandler';
import typeofHandler from './funcs/typeofHandler';
import useStateHandler from './funcs/useStateHandler';
import useMemoHandler from './funcs/useMemoHandler';
import { Trigger, getConfigList } from './config';
import type { Config } from './config';
import useContextHandler from './funcs/useContextHandler';
import { Language } from './config/language';
import functionComponentHandler from './funcs/functionComponentHandler';
import useEffectHandler from './funcs/useEffectHandler';

const command = 'replace';

class CompletionItemProvider implements vscode.CompletionItemProvider {
  position?: vscode.Position;

  config: Config[];

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
    const { label } = item;
    if (this.position && this.config && typeof label === 'string') {
      const config = this.config.find((c) => c.label === label);
      item.command = {
        command,
        title: 'refactor',
        arguments: [this.position, config],
      };
    }

    return item;
  }

  public updateConfig() {
    this.config = getConfigList();
  }
}

export function activate(context: vscode.ExtensionContext) {
  let completionItemProvider: CompletionItemProvider;
  const options = vscode.languages.registerCompletionItemProvider(
    [
      Language.html,
      Language.javascript,
      Language.javascriptreact,
      Language.typescript,
      Language.typescriptreact,
      Language.vue,
    ],
    (completionItemProvider = new CompletionItemProvider()),
    '.'
  );
  const commandHandler = (
    editor: vscode.TextEditor,
    edit: vscode.TextEditorEdit,
    position: vscode.Position,
    config: Config
  ) => {
    switch (config.label) {
      case Trigger.log:
        logHandler(editor, edit, position);
        break;
      case Trigger.logM:
        logHandler(editor, edit, position, { withMessage: true });
        break;
      case Trigger.if:
        ifHandler(editor, edit, position);
        break;
      case Trigger.typeof:
        typeofHandler(editor, edit, position);
        break;
      case Trigger.useState:
        useStateHandler(editor, edit, position);
        break;
      case Trigger.useMemo:
        useMemoHandler(editor, edit, position);
        break;
      case Trigger.useContext:
        useContextHandler(editor, edit, position);
        break;
      case Trigger.useEffect:
        useEffectHandler(editor, edit, position);
        break;
      case Trigger.fc:
        functionComponentHandler(editor, edit, position);
        break;
      default:
        const e: never = config.label;
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
