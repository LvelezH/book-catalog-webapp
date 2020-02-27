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

    cy.get('#usernameInput')
      .type('admin')
      .should('have.value', 'admin');

    cy.get('#passwordInput')
      .type('admin')
      .should('have.value', 'admin');

    cy.get('.btn-block').click();

    // Then the book list is loaded
    cy.url().should('eq', 'http://localhost:4200/catalog');

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

    // When opening book details again
    cy.get('#mat-expansion-panel-header-2').click();

    // When clicking delete
    cy.route({
      method: 'DELETE',
      url: 'http://localhost:8080/catalog/books/1234',
      response: ['1234']
    });

    cy.get('#deleteButton').click();

    // Then the message for ok appears
    cy.get('simple-snack-bar>span').invoke('text').should('eq', 'Book deleted!');
    cy.get('.mat-simple-snackbar-action').click();
  });
});
