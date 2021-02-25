import { History } from 'history';
import { Dispatch } from 'redux';
import * as _lodash from 'lodash';

declare global {
  declare interface ifsPage {
    history: History<unknown>;
    dispatch: Dispatch;
    [name: string]: unknown;
  }

  declare const _: _lodash;
}
