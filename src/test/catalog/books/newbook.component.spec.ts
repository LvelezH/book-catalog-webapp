import {async, inject, TestBed} from '@angular/core/testing';
import {BrowserDynamicTestingModule} from '@angular/platform-browser-dynamic/testing';
import {MatDialog, MatDialogModule} from '@angular/material/dialog';
import {OverlayContainer} from '@angular/cdk/overlay';
import {NewBookComponent} from '../../../app/catalog/books/newbook.component';
import {NoopAnimationsModule} from '@angular/platform-browser/animations';
import {FormGroup, FormsModule, ReactiveFormsModule} from '@angular/forms';
import {NO_ERRORS_SCHEMA} from '@angular/core';

describe('New book component', () => {
  let dialog: MatDialog;
  let overlayContainer: OverlayContainer;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [NewBookComponent],
      imports: [
        MatDialogModule,
        NoopAnimationsModule,
        ReactiveFormsModule,
        FormsModule,
      ],
      schemas: [NO_ERRORS_SCHEMA]
    });

    TestBed.overrideModule(BrowserDynamicTestingModule, {
      set: {
        entryComponents: [NewBookComponent]
      }
    });

    TestBed.compileComponents();
  }));

  beforeEach(inject([MatDialog, OverlayContainer],
    (d: MatDialog, oc: OverlayContainer) => {
      dialog = d;
      overlayContainer = oc;
    })
  );

  afterEach(() => {
    overlayContainer.ngOnDestroy();
  });

  it('should open a dialog with a component', () => {
    const dialogRef = dialog.open(NewBookComponent, {});

    expect(dialogRef.componentInstance instanceof NewBookComponent).toBe(true);
  });

  it('form should be valid for valid values', () => {
    const dialogRef = dialog.open(NewBookComponent, {});
    setCorrectFormValues(dialogRef.componentInstance.bookForm);
    expect(dialogRef.componentInstance.bookForm.valid).toBe(true);
  });

  it('should validate fields format', () => {
    const dialogRef = dialog.open(NewBookComponent, {});
    setCorrectFormValues(dialogRef.componentInstance.bookForm);
    dialogRef.componentInstance.bookForm.get('isbn').setValue('');
    expect(dialogRef.componentInstance.bookForm.valid).toBe(false);
    dialogRef.componentInstance.bookForm.get('isbn').setValue('isbn');

    dialogRef.componentInstance.bookForm.get('name').setValue('');
    expect(dialogRef.componentInstance.bookForm.valid).toBe(false);
    dialogRef.componentInstance.bookForm.get('name').setValue('name');

    dialogRef.componentInstance.bookForm.get('genre').setValue('');
    expect(dialogRef.componentInstance.bookForm.valid).toBe(false);
    dialogRef.componentInstance.bookForm.get('genre').setValue('genre');

    dialogRef.componentInstance.bookForm.get('author').setValue('');
    expect(dialogRef.componentInstance.bookForm.valid).toBe(false);
    dialogRef.componentInstance.bookForm.get('author').setValue('author');

    dialogRef.componentInstance.bookForm.get('language').setValue('');
    expect(dialogRef.componentInstance.bookForm.valid).toBe(false);
    dialogRef.componentInstance.bookForm.get('language').setValue('language');

    dialogRef.componentInstance.bookForm.get('numPages').setValue('any');
    expect(dialogRef.componentInstance.bookForm.valid).toBe(false);
    dialogRef.componentInstance.bookForm.get('numPages').setValue('1200');
  });

  function setCorrectFormValues(bookForm: FormGroup) {
    bookForm.get('isbn').setValue('isbn');
    bookForm.get('name').setValue('name');
    bookForm.get('genre').setValue('ROMANCE');
    bookForm.get('author').setValue('author');
    bookForm.get('language').setValue('language');
    bookForm.get('description').setValue('');
    bookForm.get('numPages').setValue('1200');
  }

});
