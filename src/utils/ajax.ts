import { ajax } from 'rxjs/ajax';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

const header = {
  x: 'mario a',
};

const responseHandle = <T>(observable: Observable<T>): Observable<T> => {
  observable.pipe(
    map((response) => {
      console.log(response);
    })
  );
  return observable;
};

export const getJSON = <T>(url: string): Observable<T> => {
  return responseHandle(ajax.getJSON(url, header));
};
