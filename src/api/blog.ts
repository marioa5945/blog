import { ajax } from '@src/utils';

/**
 * Get api of blog directory
 */
export const apiBlogDirectoryGet = ajax.getJSON('/api/blog/directory.json');
