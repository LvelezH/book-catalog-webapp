import {Component, OnInit} from '@angular/core';
import {BookService} from './book.service';
import {MatDialog, MatDialogConfig} from '@angular/material/dialog';
import {MatSnackBar} from '@angular/material/snack-bar';
import {NewBookComponent} from './newbook.component';
import {Book} from './book';

@Component({
  selector: 'app-book-list',
  templateUrl: './booklist.component.html',
  styleUrls: ['./booklist.component.css']
})
export class BooksListComponent implements OnInit {

  bookList: any = [];
  constructor(private bookService: BookService,
              private matDialog: MatDialog,
              private matSnackBar: MatSnackBar ) { }

  ngOnInit() {
    this.refreshBookList();
  }

  bookUpdated(book: any) {
    this.bookService.updateBook(book).subscribe((data => {
      console.log(data);
      if (data) {
        this.matSnackBar.open('Book saved!', 'Ok');
        this.refreshBookList();
      } else {
        this.matSnackBar.open('Error!', 'Ok');
      }
    }));
  }

  bookDeleted(book: any) {
    this.bookService.deleteBook(book.isbn).subscribe((data => {
      console.log(data);
      if (data) {
        this.matSnackBar.open('Book deleted!', 'Ok');
        this.refreshBookList();
      } else {
        this.matSnackBar.open('Error!', 'Ok');
      }
    }));
  }

  addBook() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.height = '500px';
    dialogConfig.width = '500px';
    const dialogRef = this.matDialog.open(NewBookComponent, dialogConfig);

    dialogRef.afterClosed().subscribe(value => {
      if (value !== false) {
        this.bookService.createBook(value).subscribe((data => {
          if (data) {
            this.matSnackBar.open('Book added!', 'Ok');
            this.refreshBookList();
          } else {
            this.matSnackBar.open('Error!', 'Ok');
          }
        }));
      }
    });
  }

  private refreshBookList() {
    this.bookService.getBooks().subscribe((data: {}) => {
      this.bookList = data;
    });
  }
}
