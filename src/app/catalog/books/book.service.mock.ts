import {Injectable} from '@angular/core';
import {of} from 'rxjs';
import {Book} from './book';

@Injectable({
  providedIn: 'root',
})

export class BookServiceMock {
   book: Book = new Book({
    isbn: '1234',
    name: 'Los pilares de la tierra',
    genre: 'ADVENTURE',
    author: 'Ken Follet',
    description: 'Great book',
    language: 'English',
    numPages: 1120
  });

  allBooks: Book[] = [
    new Book({
      isbn: '1234',
      name: 'Los pilares de la tierra',
      genre: 'ADVENTURE',
      author: 'Ken Follet',
      description: 'Great book',
      language: 'English',
      numPages: 1120
    }),
    new Book({
      isbn: '2121',
      name: '20 sombras de Grey',
      genre: 'HUMOR',
      author: 'Dont remember',
      description: 'Este libro es malisimo pero te ries',
      language: 'Spanish',
      numPages: 500
    })
  ];

  public getBooks() {
    return of(this.allBooks);
  }

  public getBookById(id: string) {
    return of(this.book);
  }

  public createBook(book: Book) {
    return of(this.book);
  }

  public updateBook(book: Book) {
    return of(this.book);
  }

  public deleteBook(id: string) {
    return of(true);
  }
}
