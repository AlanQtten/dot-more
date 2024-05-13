import * as vscode from 'vscode';

interface Handler{
  (content: string, preLength?: number): [string, (() => void)] | [string] | []
}

export function isStringCode(str) {
  return /^(".*"|'.*'|`.*`)$/.test(str);
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
    () => {
      setTimeout(() => {
        vscode.commands.executeCommand('cursorUp');
        vscode.commands.executeCommand('cursorLineEnd');
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

type A = ReturnType<typeof logWithMessageHandler>;

export function getHandler(trigger): Handler {
  switch(trigger) {
    case 'log_wm': return logWithMessageHandler;
    case 'log': return replaceDotLog;
    case 'if': return replaceIf;
  }
}