import { atBlog } from '../actionType';
import { map, mergeMap } from 'rxjs/operators';
import { ajax } from 'rxjs/ajax';
import { Observable } from 'rxjs';
import { ofType, ActionsObservable } from 'redux-observable';
import { Action } from 'redux';

export const blogEpic = (
  action$: ActionsObservable<Action>
): Observable<{
  type: string;
  payload: {
    directoryList: unknown;
  };
}> => {
  console.log(action$);
  return action$.pipe(
    ofType(atBlog.BLOG_DIRECTORY_EPIC),
    mergeMap(() =>
      ajax.getJSON('/api/blog/directory.json').pipe(
        map((response) => {
          return { type: atBlog.BLOG_DIRECTORY_REDUCER, payload: { directoryList: response } };
        })
      )
    )
  );
};
