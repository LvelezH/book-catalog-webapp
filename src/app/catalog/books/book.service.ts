import {Injectable} from '@angular/core';
import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import {Book} from './book';
import {throwError} from 'rxjs';
import {catchError, retry} from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class BookService {
  baseUrl = 'http://localhost:8080/catalog/books/';

  constructor(protected http: HttpClient) { }
  public getBooks() {
    return this.http.get<Book[]>(this.baseUrl)
      .pipe(
        retry(2),
        catchError(this.handleError)
      );
  }

  public getBookById(id: string) {
    return this.http.get(this.baseUrl + id)
      .pipe(
        retry(2),
        catchError(this.handleError)
      );
  }

  public createBook(book: Book) {
    return this.http.post(this.baseUrl, book)
      .pipe(
        retry(2),
        catchError(this.handleError)
      );
  }

  public updateBook(book: Book) {
    return this.http.put<Book>(this.baseUrl, book)
      .pipe(
        retry(2),
        catchError(this.handleError)
      );
  }

  public deleteBook(id: string) {
    return this.http.delete(this.baseUrl + id)
      .pipe(
        retry(2),
        catchError(this.handleError)
      );
  }

  private handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      console.error('An error occurred:', error.error.message);
    } else {
      console.error(
        `Backend returned code ${error.status}, ` +
        `body was: ${error.error}`);
    }
    return throwError(
      'Something bad happened; please try again later.');
  }
}
