import { atBlog } from '../actionType';
import { map, mergeMap } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { ofType, ActionsObservable } from 'redux-observable';
import { Action } from 'redux';
import { apiBlog } from '@src/api';

const blogEpic = (
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

const blogInfoEpic = (
  action$: ActionsObservable<Action>
): Observable<{
  type: string;
  payload: {
    info: {
      id: string;
      content: string;
    };
  };
}> => {
  return action$.pipe(
    ofType(atBlog.BLOG_INFO_EPIC),
    mergeMap((action) => {
      const id = _.get(action, 'payload.id');
      return apiBlog.apiBlogInfoGet(id).pipe(
        map((response) => {
          return { type: atBlog.BLOG_INFO_REDUCER, payload: { info: { id, content: (response as Array<string>).join('\n') } } };
        })
      );
    })
  );
};

export default [blogEpic, blogInfoEpic];
