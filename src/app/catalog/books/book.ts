export class Book {
  isbn: string;
  name: string;
  genre: string;
  author: string;
  description: string;
  language: string;
  numPages: number;

  constructor( object: any) {
    this.isbn = (object.isbn) ? object.isbn : null;
    this.name = (object.name) ? object.name : null;
    this.genre = (object.genre) ? object.genre : null;
    this.author = (object.author) ? object.author : null;
    this.description = (object.description) ? object.description : null;
    this.language = (object.language) ? object.language : null;
    this.numPages = (object.numPages) ? object.numPages : null;
  }
}
