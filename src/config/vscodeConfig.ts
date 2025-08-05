import * as vscode from 'vscode';

export interface VscodeConfig {
  disableReactExtends?: boolean;
  disableAutoImport?: boolean;
  maxLengthOfLogmPrefixMessage?: number;
  alwaysCloneLogResult?: boolean;
}

export const defaultValuesOfVscodeConfig: VscodeConfig = {
  disableReactExtends: false,
  disableAutoImport: true,
  maxLengthOfLogmPrefixMessage: Number.MAX_SAFE_INTEGER,
  alwaysCloneLogResult: false,
};

export const get = <T extends keyof VscodeConfig>(key: T): VscodeConfig[T] => {
  const defaultValue = defaultValuesOfVscodeConfig[key];
  const settledValue = vscode.workspace
    .getConfiguration('dotMore')
    .get(key) as VscodeConfig[T];

  if (typeof settledValue === 'boolean') {
    return settledValue;
  }

  return settledValue || /* for number */ defaultValue;
};
