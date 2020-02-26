import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {NO_ERRORS_SCHEMA} from '@angular/core';
import {BooksListComponent} from '../../../app/catalog/books/booklist.component';
import {MatDialog, MatDialogModule} from '@angular/material/dialog';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MatSnackBar} from '@angular/material/snack-bar';
import {BookService} from '../../../app/catalog/books/book.service';
import {BookServiceMock} from '../../../app/catalog/books/book.service.mock';
import {Book} from '../../../app/catalog/books/book';
import {of} from 'rxjs';

export class MatDialogMock {
  open() {
    return {
      afterClosed: () => of(new Book({
        isbn: '1234',
        name: 'Los pilares de la tierra',
        genre: 'ADVENTURE',
        author: 'Ken Follet',
        description: 'Great book',
        language: 'English',
        numPages: 1120
      }))
    };
  }
}

describe('Book list component', () => {
  let component: BooksListComponent;
  let fixture: ComponentFixture<BooksListComponent>;
  let dialog: MatDialogMock = new MatDialogMock();

  const mockSnackbar = jasmine.createSpyObj(['open']);
  const bookServiceMock: BookServiceMock = new BookServiceMock();

  const book: Book = new Book({
    isbn: '1234',
    name: 'Los pilares de la tierra',
    genre: 'ADVENTURE',
    author: 'Ken Follet',
    description: 'Great book',
    language: 'English',
    numPages: 1120
  });

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        MatDialogModule,
        BrowserAnimationsModule
      ],
      providers: [
        { provide: MatDialog, useClass: MatDialogMock },
        { provide: MatSnackBar, useValue: mockSnackbar },
        { provide: BookService, useValue: bookServiceMock },
      ],
      schemas: [NO_ERRORS_SCHEMA]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BooksListComponent);
    component = fixture.componentInstance;
    dialog = TestBed.get(MatDialog);
    fixture.detectChanges();
  });

  it('should create the component with book list', () => {
    expect(component).toBeTruthy();
    component.ngOnInit();
    expect(component.bookList.length).toBe(2);
  });

  it('should show snack bar when updating book', () => {
    component.bookUpdated(book);
    expect(mockSnackbar.open).toHaveBeenCalledWith('Book saved!', 'Ok');
  });

  it('should show snack bar when deleting book', () => {
    component.bookDeleted('1234');
    expect(mockSnackbar.open).toHaveBeenCalledWith('Book deleted!', 'Ok');
  });

  it('should open add book dialog', () => {
    spyOn(dialog, 'open').and.callThrough();
    spyOn(bookServiceMock, 'createBook').and.callThrough();

    component.addBook();
    expect(dialog.open).toHaveBeenCalled();
    expect(bookServiceMock.createBook).toHaveBeenCalledWith(book);
    expect(mockSnackbar.open).toHaveBeenCalledWith('Book added!', 'Ok');
  });
});
