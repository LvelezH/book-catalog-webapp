import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {BookGenre} from './bookgenres';

@Component({
  selector: 'app-app-book-details-dialog-list',
  templateUrl: './newbook.component.html',
  styleUrls: ['./newbook.component.css']
})
export class NewBookComponent implements OnInit {

  bookForm: FormGroup;
  public genres = BookGenre;
  public genreKeys = Object.keys(BookGenre);

  constructor(private formBuilder: FormBuilder,
              public dialogRef: MatDialogRef<NewBookComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any) {
    this.bookForm = this.createBookForm();
  }

  ngOnInit() {
  }

  createBookForm() {
    return this.formBuilder.group({
      isbn: ['', [Validators.required]],
      name: ['', [Validators.required]],
      genre: ['', [Validators.required]],
      author: ['', [Validators.required]],
      description: [''],
      language: ['', [Validators.required]],
      numPages: [0, [Validators.required, Validators.pattern('^\\d*$')]]
    });
  }

  close() {
    this.dialogRef.close();
  }

  save() {
    this.dialogRef.close(this.bookForm.value);
  }
}
