describe('Book list test', () => {
  it('Book list is correctly loaded', () => {
    // Given the user is logged in and a list of books
    cy.visit('http://localhost:4200');
    cy.clearLocalStorage();

    cy.server();
    cy.route({
      method: 'POST',
      url: '/users/',
      response: [true]
    });

    cy.route({
      method: 'GET',
      url: 'http://localhost:8080/catalog/books/',
      response: 'fixture:books.json'
    });

    cy.route({
      method: 'PUT',
      url: 'http://localhost:8080/catalog/books/',
      response: 'fixture:book.json'
    });

    cy.route({
      method: 'POST',
      url: 'http://localhost:8080/catalog/books/',
      response: 'fixture:book.json'
    });

    cy.get('#usernameInput')
      .type('admin')
      .should('have.value', 'admin');

    cy.get('#passwordInput')
      .type('admin')
      .should('have.value', 'admin');

    cy.get('.btn-block').click();

    // Then the book list is loaded
    cy.url().should('eq', 'http://localhost:4200/catalog');

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
