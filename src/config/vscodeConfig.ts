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
  maxLengthOfLogmPrefixMessage: 18,
  alwaysCloneLogResult: false,
};

export const get = <T extends keyof VscodeConfig>(key: T): VscodeConfig[T] => {
  return vscode.workspace
    .getConfiguration('dotMore')
    .get(key, defaultValuesOfVscodeConfig[key]);
};
