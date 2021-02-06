import { History } from 'history';
import { Dispatch } from 'redux';
import * as _lodash from 'lodash';

declare global {
  declare interface ifsPage {
    history: History<unknown>;
    dispatch: Dispatch;
    store: Array<{
      [name]: unknown;
    }>;
  }

  declare const _: _lodash;
}
