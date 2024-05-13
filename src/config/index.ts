import * as vscode from 'vscode';

export enum Trigger {
  log = 'log',
  logM = 'logM',
  if = 'if',
  useState = 'useState',
  useMemo = 'useMemo'
}

const jsConfig = [
  {
    label: Trigger.log,
    description: "quick console.log result",
  },
  {
    label: Trigger.logM,
    description: "quick console.log result with pre message",
  },
  {
    label: Trigger.if,
    description: "quick if statement",
  },
];

const reactConfig = [
  {
    label: Trigger.useState,
    description: 'quick for React.useState'
  },
  {
    label: Trigger.useMemo,
    description: 'quick for React.useMemo'
  }
];

export function getConfigList() {
  return [
    ...jsConfig,
    ...vscode.workspace.getConfiguration('dotMore').get('disableReactExtends')
      ? []
      : reactConfig
  ];
}