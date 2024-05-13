import * as vscode from 'vscode';

interface HandlerCallback {
  (editor: vscode.TextEditor, position: vscode.Position): void
}

interface Handler{
  (content: string, preLength?: number): 
    | [string, HandlerCallback] 
    | [string] 
    | []
}

export function isStringCode(str) {
  return /^(".*"|'.*'|`.*`)$/.test(str);
}

export function plural2Singular(text) {
  return 'item';
  // if(!text.endsWith('s')) {
  //   return 'item';
  // }

  // if(text.endsWith('ies')) {
  //   return `${text.slice(0, -3)}y`;
  // }

  // if(text.endsWith('es')) {
  //   return text.slice(0, -2);
  // }

  // return text.slice(0, -1);
}

function replaceDotLog(content): [string] | [] {
  const index = content.indexOf('.log');

  if(index === -1) {
    return [];
  }

  return [`console.log(${content.slice(0, index)})`];
}

const replaceIf: Handler = (content, preLength = 0) => {
  const index = content.indexOf('.if');

  if(index === -1) {
    return [];
  }

  const preBlank = Array(preLength).fill(' ').join('');

  return [
    `if(${content.slice(0, index)}) {\n${preBlank}\t\n${preBlank}}`, 
    (editor, position) => {      
      const focus = new vscode.Position(position.line + 1, 0);

      setTimeout(() => {
        editor.selection = new vscode.Selection(focus, focus);

        vscode.commands.executeCommand('cursorLineEnd');
      });
    }
  ];
};

const replaceFor: Handler = (content, preLength = 0) => {
  const index = content.indexOf('.for');

  if(index === -1) {
    return [];
  }

  const param = content.slice(0, index);
  const preBlank = Array(preLength).fill(' ').join('');

  const itemName = plural2Singular(param);

  const codeContent = [
    `const l = ${param}.length`,
    `for (let i = 0; i < l; i++) {`,
    `  const ${itemName} = ${param}[i]`,
    `  `,
    `}`
  ]
  .map((row, index) => `${index === 0 ? '' : preBlank}${row}`)
  .join('\n');

  return [
    codeContent, 
    (editor, position) => {    
      setTimeout(() => {
        editor.selections = [
          [position.line + 1, preLength + 10],
          [position.line + 1, preLength + 17],
          [position.line + 1, preLength + 24],
          [position.line + 2, preLength + 13 + param.length + itemName.length]
        ].map(([line, character]) => {
          const p = new vscode.Position(line, character);

          return new vscode.Selection(p, p);
        });
      });
    }
  ];
};

function logWithMessageHandler(content): [string] | [] {
  const index = content.indexOf('.log');

  if(index === -1) {
    return [];
  }

  const message = content.slice(0, index);

  const preMessage = isStringCode(message) ? '' : `\`${message}\`, `;

  return [`console.log(${preMessage}${message})`];
}

export function getHandler(trigger): Handler {
  switch(trigger) {
    case 'logM': return logWithMessageHandler;
    case 'log': return replaceDotLog;
    case 'if': return replaceIf;
    case 'for': return replaceFor;
  }
}