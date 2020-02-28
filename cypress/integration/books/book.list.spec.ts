describe('Book list test', () => {
  it('Displays the book list', () => {
    // Given the user is logged in
    // Then the book list is loaded
    cy.url().should('eq', 'http://localhost:4200/catalog');
    cy.get('#mat-expansion-panel-header-0').should('exist');
  });
});
