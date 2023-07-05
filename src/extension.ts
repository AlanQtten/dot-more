import * as vscode from 'vscode';

import { getHandler } from './utils/index';

const command = 'replace';

class CompletionItemProvider implements vscode.CompletionItemProvider {
  position?: vscode.Position;
  config: any[];

  constructor(config) {
    this.config = config;
  }

  public provideCompletionItems(
    _: vscode.TextDocument,
    position: vscode.Position
  ) {
    this.position = position;
    const completions = this.config.map((item) => {
      const snippetCompletion = new vscode.CompletionItem(
        item.trigger,
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
      const config = this.config.find((config) => config.trigger === label);
      item.command = {
        command,
        title: 'refactor',
        arguments: [this.position.translate(0, label.length + 1), config],
      };
    }

    return item;
  }
}

export function activate(context: vscode.ExtensionContext) {
  const configList = [
    {
      trigger: 'log',
      description: "quick console.log result",
    },
    {
      trigger: 'logM',
      description: "quick console.log result with pre message",
    },
    {
      trigger: 'if',
      description: "quick if statement",
    },
    {
      trigger: 'for',
      description: 'quick for statement'
    }
  ];
  const options = vscode.languages.registerCompletionItemProvider(
    [
      'html',
      'javascript',
      'javascriptreact',
      'typescript',
      'typescriptreact',
      'vue',
    ],
    new CompletionItemProvider(configList),
    '.'
  );
  const commandHandler = (
    editor: vscode.TextEditor,
    edit: vscode.TextEditorEdit,
    position: vscode.Position,
    config
  ) => {
    try {
      const triggerHandler = getHandler(config.trigger);
      const lineText = editor.document.lineAt(position.line).text;
      const dotMoreText = lineText.split(' ');

      let current = 0;
      dotMoreText.forEach((text, index, list) => {
        if(index === list.length - 1) {
          const [replaceText, callback = () => {}] = triggerHandler(text, current);

          if(replaceText) {
            edit.replace(
              new vscode.Range(
                position.with(position.line, current),
                position.with(position.line, current + text.length)
              ),
              replaceText
            );

            callback(editor, position);
          }
          
        }else {
          current += text.length + 1;
        }
      });
    } catch (error) {
      console.log(error);
      
    }

    return Promise.resolve([]);
  };

  context.subscriptions.push(
    vscode.commands.registerTextEditorCommand(command, commandHandler)
  );
  context.subscriptions.push(options);
}

export function deactivate() {}
