describe('Login scenarios', () => {
  it('Navigates to catalog when log in is valid', () => {
    // Given the user enter valid credentials
    // Then the app navigates to the catalog page
    cy.url().should('eq', 'http://localhost:4200/catalog');
  });
});
