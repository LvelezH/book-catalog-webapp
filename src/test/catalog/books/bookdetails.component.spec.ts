import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {BookDetailsComponent} from '../../../app/catalog/books/bookdetails.component';
import {Book} from '../../../app/catalog/books/book';
import {By} from '@angular/platform-browser';
import {NO_ERRORS_SCHEMA} from '@angular/core';

describe('Book details component', () => {
  let component: BookDetailsComponent;
  let fixture: ComponentFixture<BookDetailsComponent>;

  const book: Book = {
    isbn: 'isbn',
    name: 'name',
    genre: 'ROMANCE',
    author: 'author',
    description: 'description',
    language: 'language',
    numPages: 1200
  };

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        ReactiveFormsModule,
        FormsModule,
      ],
      providers: [],
      schemas: [NO_ERRORS_SCHEMA]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BookDetailsComponent);
    component = fixture.componentInstance;
    component.book = book;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('Form fields should have proper values and save button is enabled', () => {
    expect(component.bookForm.get('isbn').value).toBe('isbn');
    expect(component.bookForm.get('name').value).toBe('name');
    expect(component.bookForm.get('genre').value).toBe('ROMANCE');
    expect(component.bookForm.get('author').value).toBe('author');
    expect(component.bookForm.get('description').value).toBe('description');
    expect(component.bookForm.get('numPages').value).toBe(1200);
    const saveButton = fixture.debugElement.query(By.css('#saveButton'));
    expect(saveButton.nativeElement.disabled).toBe(false);
  });

  it('Save button is disabled for invalid form data', () => {
    component.bookForm.get('numPages').setValue('any');
    fixture.detectChanges();
    const saveButton = fixture.debugElement.query(By.css('#saveButton'));
    expect(saveButton.nativeElement.disabled).toBe(true);
    component.bookForm.get('numPages').setValue(1200);
  });

  it('should validate fields format', () => {
    component.bookForm.get('name').setValue('');
    expect(component.bookForm.valid).toBe(false);
    component.bookForm.get('name').setValue('name');

    component.bookForm.get('genre').setValue('');
    expect(component.bookForm.valid).toBe(false);
    component.bookForm.get('genre').setValue('genre');

    component.bookForm.get('author').setValue('');
    expect(component.bookForm.valid).toBe(false);
    component.bookForm.get('author').setValue('author');

    component.bookForm.get('language').setValue('');
    expect(component.bookForm.valid).toBe(false);
    component.bookForm.get('language').setValue('language');

    component.bookForm.get('numPages').setValue('any');
    expect(component.bookForm.valid).toBe(false);
    component.bookForm.get('numPages').setValue(1200);
  });
});
