import { History } from 'history';
import { Dispatch } from 'redux';
import * as _lodash from 'lodash';
import * as _React from 'react'

declare global {
  declare interface ifsPage {
    history: History<unknown>;
    dispatch: Dispatch;
    [name: string]: unknown;
  }

  declare const React: _React;

  declare const _: _lodash;

  declare const apiPath: string;
}
