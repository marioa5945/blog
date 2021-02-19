import { ajax } from '@src/utils';
import { Observable } from 'rxjs';

/**
 * Get api of blog directory
 */
export const apiBlogDirectoryGet = ajax.getJSON('/api/blog/directory.json');

/**
 * Get api of blog information
 * @param {string}blogId
 */
export const apiBlogInfoGet = (blogId: string): Observable<unknown> => {
  return ajax.getJSON(`/api/blog/${blogId}.json`);
};
