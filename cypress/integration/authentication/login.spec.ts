describe('Login scenarios', () => {
  it('Navigates to catalog when log in is valid', () => {
    // Given the user enter valid credentials
    cy.visit('http://localhost:4200');
    cy.clearLocalStorage();

    cy.get('#usernameInput')
      .type('admin')
      .should('have.value', 'admin');

    cy.get('#passwordInput')
      .type('admin')
      .should('have.value', 'admin');

    cy.server();
    cy.route({
      method: 'POST',
      url: '/users/',
      response: [true]
    });

    // When user clicks log in
    cy.get('.btn-block').click();

    // Then the app navigates to the catalog page
    cy.url().should('eq', 'http://localhost:4200/catalog');
  });
});
