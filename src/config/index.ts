/* v8 ignore next 999 */
import * as vscode from 'vscode';

export enum Trigger {
  log = 'log',
  logM = 'logM',
  if = 'if',
  typeof = 'typeof',
  useState = 'useState',
  useMemo = 'useMemo',
  useContext = 'useContext',
  useEffect = 'useEffect',
  fc = 'fc',
}

export type Config = {
  label: Trigger;
  description: string;
};

const jsConfig: Config[] = [
  {
    label: Trigger.log,
    description: 'quick console.log result',
  },
  {
    label: Trigger.logM,
    description: 'quick console.log result with pre message',
  },
  {
    label: Trigger.if,
    description: 'quick if statement',
  },
  {
    label: Trigger.typeof,
    description: 'quick typeof statement',
  },
];

const reactConfig: Config[] = [
  {
    label: Trigger.useState,
    description: 'quick for React.useState',
  },
  {
    label: Trigger.useMemo,
    description: 'quick for React.useMemo',
  },
  {
    label: Trigger.useContext,
    description: 'quick for React.useContext',
  },
  {
    label: Trigger.useEffect,
    description: 'quick for React.useEffect',
  },
  {
    label: Trigger.fc,
    description: 'quick for React function component',
  },
];

export function getConfigList() {
  return [
    ...jsConfig,
    ...(vscode.workspace.getConfiguration('dotMore').get('disableReactExtends')
      ? []
      : reactConfig),
  ];
}
