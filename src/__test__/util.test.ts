import { vi, test, expect, describe } from 'vitest';
import { vscode } from './utils';
import {
  isStringStatement,
  updateStartIndexWhileContainBlank,
  sliceByEndOf,
  isTsDocument,
} from '../funcs/utils';
import autoImport from '../funcs/autoImport';

vi.mock('vscode', () => {
  return vscode({ disableAutoImport: false });
});

describe('util test', () => {
  test('isStringStatement', () => {
    expect(isStringStatement('`123`')).toBeTruthy();
    expect(isStringStatement(`'123'`)).toBeTruthy();
    expect(isStringStatement(`"123"`)).toBeTruthy();
    expect(isStringStatement(`apple`)).toBeFalsy();
  });

  test('updateStartIndexWhileContainBlank', () => {
    expect(updateStartIndexWhileContainBlank('123')).toEqual(0);
    expect(updateStartIndexWhileContainBlank('  123')).toEqual(2);
  });

  test('sliceBy', () => {
    expect(sliceByEndOf(`apple1 apple2 apple3`, 'apple2', 'apple1')).toEqual(
      'apple1 apple2'
    );
    expect(sliceByEndOf(`apple1 apple2 apple3`, 'banana', 'banana')).toEqual(
      ''
    );
  });

  test('isTsDocument', () => {
    expect(isTsDocument()).toBeFalsy();
  });
});

const wrapAutoImport = (text, importTarget, importFrom) => {
  let importLine = '';
  autoImport(
    {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      document: {
        getText: () => text,
      },
    },
    {
      insert(unusedPosition, insertText) {
        importLine = insertText;
      },
    },
    {
      importTarget,
      importFrom,
    }
  );

  return importLine;
};

describe('autoImport test', () => {
  test('no `useState`', () => {
    expect(wrapAutoImport('', 'useState', 'react')).toEqual(
      `import { useState } from 'react';\n`
    );
    expect(
      wrapAutoImport(`import {useState} from 'react'`, 'useState', 'react')
    ).toEqual('');
    expect(wrapAutoImport('', ['useState', 'useMemo'], 'react')).toEqual(
      `import { useState, useMemo } from 'react';\n`
    );

    expect(
      wrapAutoImport(
        `
import {
  CompA,
  CompB,
} from 'some-dep';
import { useState, useMemo, useContext } from 'react'
    `,
        'useState',
        'react'
      )
    ).toEqual('');
    expect(
      wrapAutoImport(
        `
import {
  CompA,
  CompB,
} from 'some-dep';
import { useMemo, useContext } from 'react'
    `,
        'useState',
        'react'
      )
    ).toEqual(`import { useState } from 'react';\n`);
  });
});
