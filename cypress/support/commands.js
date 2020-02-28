// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add("login", (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add("drag", { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add("dismiss", { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite("visit", (originalFn, url, options) => { ... })

beforeEach(function () {
  //User logs in, and mock response for endpoints
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

  cy.route({
    method: 'DELETE',
    url: 'http://localhost:8080/catalog/books/1234',
    response: ['1234']
  });

  cy.get('#usernameInput')
    .type('admin')
    .should('have.value', 'admin');

  cy.get('#passwordInput')
    .type('admin')
    .should('have.value', 'admin');

  cy.get('.btn-block').click();
});
