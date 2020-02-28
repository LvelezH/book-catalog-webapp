describe('Add book test', () => {
  it('Book is correctly added', () => {
    // Given the user is logged in
    // When the user clicks in new book button
    cy.get('#addBookButton').click();

    // Then new book form opens
    cy.get('mat-dialog-container').should('exist');

    // When the user fills the form
    cy.get('#newisbnInput').type('ISBN');
    cy.get('#newname').type('Mucho amor y tal');
    cy.get('#genreSelect').click();
    cy.get('#mat-option-53').click();
    cy.get('#newauthor').type('Corin Tellado');
    cy.get('#newdescription').type('Classic!!');
    cy.get('#newlanguage').type('Spanish');
    cy.get('#newnumPages').clear().type( '8544');

    // And clicks in save button
    cy.get('#newBookButton').click();

    // Then the message for ok appears
    cy.get('simple-snack-bar>span').invoke('text').should('eq', 'Book added!');
    cy.get('.mat-simple-snackbar-action').click();
  });
});
