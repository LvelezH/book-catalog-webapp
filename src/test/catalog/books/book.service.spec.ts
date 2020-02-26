import {fakeAsync, inject, TestBed} from '@angular/core/testing';
import {HttpClientTestingModule, HttpTestingController} from '@angular/common/http/testing';
import {BookService} from '../../../app/catalog/books/book.service';
import {of} from 'rxjs';
import {HttpErrorResponse} from '@angular/common/http';

describe('Book service', () => {
  let bookService: BookService;
  let httpMock: HttpTestingController;

  const mockResponse = {
    isbn: '1234',
    name: 'Los pilares de la tierra',
    genre: 'ADVENTURE',
    author: 'Ken Follet',
    description: 'Great book',
    language: 'English',
    numPages: 1120
  };

  const mockResponseArray = [
    {
      isbn: '1234',
      name: 'Los pilares de la tierra',
      genre: 'ADVENTURE',
      author: 'Ken Follet',
      description: 'Great book',
      language: 'English',
      numPages: 1120
    },
    {
      isbn: '2121',
      name: '20 sombras de Grey',
      genre: 'HUMOR',
      author: 'Dont remember',
      description: 'Este libro es malisimo pero te ries',
      language: 'Spanish',
      numPages: 500
    }
  ];

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
      ],
        providers: [
        BookService,
      ],
    });

    bookService = TestBed.get(BookService);
    httpMock = TestBed.get(HttpTestingController);
  });

  it(`should return list of books`, fakeAsync(inject([HttpTestingController, BookService],
    (httpClient: HttpTestingController, service: BookService) => {
      spyOn(service, 'handleError').and.callThrough();

      service.getBooks().subscribe((books) => {
        expect(books.length).toBe(2);
        expect(books).toEqual(mockResponseArray);
      });

      const  request = httpMock.expectOne('http://localhost:8080/catalog/books/');
      expect(request.request.method).toBe('GET');
      expect(service.handleError).not.toHaveBeenCalled();
      request.flush(mockResponseArray);
      httpMock.verify();
  })));

  it(`should handle error for get books`, fakeAsync(inject([HttpTestingController, BookService],
    (httpClient: HttpTestingController, service: BookService) => {
      spyOn(service, 'handleError').and.callThrough();
      const errorMessage = 'Error message';

      service.getBooks().subscribe(
        data => fail('here is a 400 error'),
        (error: HttpErrorResponse) => {
        }
      );
      const  request = httpMock.expectOne('http://localhost:8080/catalog/books/');

      request.flush(errorMessage, { status: 404, statusText: 'Not Found' });
      expect(service.handleError).toHaveBeenCalled();
    })));


  it(`should return a book by its Id`, fakeAsync(inject([HttpTestingController, BookService],
    (httpClient: HttpTestingController, service: BookService) => {
      spyOn(service, 'handleError').and.callThrough();

      service.getBookById('1234').subscribe((book) => {
        expect(book).toEqual(mockResponse);
      });

      const  request = httpMock.expectOne('http://localhost:8080/catalog/books/1234');
      expect(request.request.method).toBe('GET');
      expect(service.handleError).not.toHaveBeenCalled();
      request.flush(mockResponse);
      httpMock.verify();
    })));

  it(`should handle error for get book by id`, fakeAsync(inject([HttpTestingController, BookService],
    (httpClient: HttpTestingController, service: BookService) => {
      spyOn(service, 'handleError').and.callThrough();
      const errorMessage = 'Error message';

      service.getBookById('1234').subscribe(
        data => fail('here is a 400 error'),
        (error: HttpErrorResponse) => {
        }
      );
      const  request = httpMock.expectOne('http://localhost:8080/catalog/books/1234');

      request.flush(errorMessage, { status: 404, statusText: 'Not Found' });
      expect(service.handleError).toHaveBeenCalled();
    })));

  it(`should return a new book created`, fakeAsync(inject([HttpTestingController, BookService],
    (httpClient: HttpTestingController, service: BookService) => {
      spyOn(service, 'handleError').and.callThrough();

      service.createBook(mockResponse).subscribe((book) => {
        expect(book).toEqual(mockResponse);
      });

      const  request = httpMock.expectOne('http://localhost:8080/catalog/books/');
      expect(request.request.method).toBe('POST');
      expect(service.handleError).not.toHaveBeenCalled();
      request.flush(mockResponse);
      httpMock.verify();
    })));

  it(`should handle error for create book`, fakeAsync(inject([HttpTestingController, BookService],
    (httpClient: HttpTestingController, service: BookService) => {
      spyOn(service, 'handleError').and.callThrough();
      const errorMessage = 'Error message';

      service.createBook(mockResponse).subscribe(
        data => fail('here is a 400 error'),
        (error: HttpErrorResponse) => {
        }
      );
      const  request = httpMock.expectOne('http://localhost:8080/catalog/books/');

      request.flush(errorMessage, { status: 404, statusText: 'Not Found' });
      expect(service.handleError).toHaveBeenCalled();
    })));

  it(`should return an updated book`, fakeAsync(inject([HttpTestingController, BookService],
    (httpClient: HttpTestingController, service: BookService) => {
      spyOn(service, 'handleError').and.callThrough();

      service.updateBook(mockResponse).subscribe((book) => {
        expect(book).toEqual(mockResponse);
      });

      const  request = httpMock.expectOne('http://localhost:8080/catalog/books/');
      expect(request.request.method).toBe('PUT');
      expect(service.handleError).not.toHaveBeenCalled();
      request.flush(mockResponse);
      httpMock.verify();
    })));

  it(`should handle error for update book`, fakeAsync(inject([HttpTestingController, BookService],
    (httpClient: HttpTestingController, service: BookService) => {
      spyOn(service, 'handleError').and.callThrough();
      const errorMessage = 'Error message';

      service.updateBook(mockResponse).subscribe(
        data => fail('here is a 400 error'),
        (error: HttpErrorResponse) => {
        }
      );
      const  request = httpMock.expectOne('http://localhost:8080/catalog/books/');

      request.flush(errorMessage, { status: 404, statusText: 'Not Found' });
      expect(service.handleError).toHaveBeenCalled();
    })));

  it(`should delete a book`, fakeAsync(inject([HttpTestingController, BookService],
    (httpClient: HttpTestingController, service: BookService) => {
      spyOn(service, 'handleError').and.callThrough();
      const resp = of(true);

      service.deleteBook('isbn').subscribe((deleted) => {
        expect(deleted).toEqual(resp);
      });

      const  request = httpMock.expectOne('http://localhost:8080/catalog/books/isbn');
      expect(request.request.method).toBe('DELETE');
      expect(service.handleError).not.toHaveBeenCalled();
      request.flush(resp);
      httpMock.verify();
    })));

  it(`should handle error for delete book`, fakeAsync(inject([HttpTestingController, BookService],
    (httpClient: HttpTestingController, service: BookService) => {
      spyOn(service, 'handleError').and.callThrough();
      const errorMessage = 'Error message';

      service.deleteBook('isbn').subscribe(
        data => fail('here is a 400 error'),
        (error: HttpErrorResponse) => {
        }
      );
      const  request = httpMock.expectOne('http://localhost:8080/catalog/books/isbn');

      request.flush(errorMessage, { status: 404, statusText: 'Not Found' });
      expect(service.handleError).toHaveBeenCalled();
    })));
});
