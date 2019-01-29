import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { map, catchError, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class RestService {
	
	constructor(private http: HttpClient) { }
	
	const endpoint = 'http://localhost:60523/api/';
	const httpOptions = {
	  headers: new HttpHeaders({
		'Content-Type':  'application/json'
	  })
	};

  
  
	private extractData(res: Response) {
	  let body = res;
	  return body || { };
	}
	
	getProducts(): Observable<any> {
	  return this.http.get(endpoint + 'Products').pipe(
		map(this.extractData));
	}
	
	addProduct (product): Observable<any> {
	  console.log(product);
	  return this.http.post<any>(endpoint + 'products', JSON.stringify(product), httpOptions).pipe(
		tap((product) => console.log(`added product w/ id=${product.id}`)),
		catchError(this.handleError<any>('addProduct'))
	  );
	}
	
	
	private handleError<T> (operation = 'operation', result?: T) {
	  return (error: any): Observable<T> => {

		// TODO: send the error to remote logging infrastructure
		console.error(error); // log to console instead

		// TODO: better job of transforming error for user consumption
		console.log(`${operation} failed: ${error.message}`);

		// Let the app keep running by returning an empty result.
		return of(result as T);
	  };
	}
}
