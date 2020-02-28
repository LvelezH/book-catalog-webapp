describe('Delete book test', () => {
  it('Deletes a book correctly', () => {
    // Given the user is logged in
    // When the user clicks in a book
    cy.get('#mat-expansion-panel-header-0').click();

    // When clicking delete
    cy.get('#deleteButton').click();

    // Then the message for ok appears
    cy.get('simple-snack-bar>span').invoke('text').should('eq', 'Book deleted!');
    cy.get('.mat-simple-snackbar-action').click();
  });
});

