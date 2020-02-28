describe('Update book test', () => {
  it('Updates a book correctly', () => {
  // Given the user is logged in
  // When the user clicks in a book
  cy.get('#mat-expansion-panel-header-0').click();

  // Then the book details are displayed
  cy.get('#isbnInput').should('have.value', '1234');
  cy.get('#name').should('have.value', 'Los pilares de la tierra');
  cy.get('#genre').contains('Adventure');
  cy.get('#author').should('have.value', 'Ken Follet');
  cy.get('#description').should('have.value', 'Great book');
  cy.get('#language').should('have.value', 'English');
  cy.get('#numPages').should('have.value', '1120');

  // When updating a field
  cy.get('#numPages').clear().type('1150');

  // When clicking save changes
  cy.get('#saveButton').click();

  // Then the details hide and message appears
  cy.get('#mat-expansion-panel-header-0').should('not.exist');
  cy.get('simple-snack-bar>span').invoke('text').should('eq', 'Book saved!');
  cy.get('.mat-simple-snackbar-action').click();
  });
});
