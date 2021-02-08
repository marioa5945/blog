import { atBlog } from '../actionType';
import { map, mergeMap } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { ofType, ActionsObservable } from 'redux-observable';
import { Action } from 'redux';
import { apiBlog } from '@src/api';

export const blogEpic = (
  action$: ActionsObservable<Action>
): Observable<{
  type: string;
  payload: {
    directoryList: unknown;
  };
}> => {
  return action$.pipe(
    ofType(atBlog.BLOG_DIRECTORY_EPIC),
    mergeMap(() =>
      apiBlog.apiBlogDirectoryGet.pipe(
        map((response) => {
          return { type: atBlog.BLOG_DIRECTORY_REDUCER, payload: { directoryList: response } };
        })
      )
    )
  );
};
