import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {BookGenre} from './bookgenres';
import {Book} from './book';

@Component({
  selector: 'app-book-details',
  templateUrl: './bookdetails.component.html',
  styleUrls: ['./bookdetails.component.css']
})
export class BookDetailsComponent implements OnInit {

  bookForm: FormGroup;
  public genres = BookGenre;
  public genreKeys = Object.keys(BookGenre);

  @Input()
  book: Book;

  @Output()
  bookUpdated: EventEmitter<Book> = new EventEmitter<Book>();

  @Output()
  bookDeleted: EventEmitter<Book> = new EventEmitter<Book>();

  constructor(private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.bookForm = this.createBookForm();
    this.setInitialData();
  }

  updateBook() {
    this.bookUpdated.emit(this.bookForm.value);
  }

  deleteBook() {
    this.bookDeleted.emit(this.bookForm.value);
  }

  createBookForm() {
    return this.formBuilder.group({
      isbn: [''],
      name: ['', [Validators.required]],
      genre: ['', [Validators.required]],
      author: ['', [Validators.required]],
      description: [''],
      language: ['', [Validators.required]],
      numPages: [0, [Validators.required, Validators.pattern('^\\d*$')]]
    });
  }

  private setInitialData() {
    this.bookForm.get('isbn').setValue(this.book.isbn);
    this.bookForm.get('name').setValue(this.book.name);
    this.bookForm.get('genre').setValue(this.book.genre);
    this.bookForm.get('author').setValue(this.book.author);
    this.bookForm.get('description').setValue(this.book.description);
    this.bookForm.get('language').setValue(this.book.language);
    this.bookForm.get('numPages').setValue(this.book.numPages);
  }
}
