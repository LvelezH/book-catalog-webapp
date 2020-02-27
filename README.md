# BookCatalogWebapp

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 9.0.2.

Front end that consumes API https://github.com/LvelezH/book-catalog-api to create a web application to manage
a catalog of books.

##Requirements
In this section we will describe the scenarios defining the application functionality

```
Scenario: Log in in the application

Given a user with a valid username and passowrd
When the user logs in
Then the log in is successful
And the book list is displayed
```

```
Scenario: Check details of a book

Given a logged user
When the user clicks in a book in the list
Then the book details are correctly displayed
```
```
Scenario: Edit book details

Given a logged in user
When the user clicks a book in the list
Then the book details are displayed
When the user changes book details
And the user clicks save button
Then the book is updated
And confirmation for book updated is displayed
```
```
Scenario: delete book

Given a logged in user
When the user clicks a book in the list
Then the book details are displayed
And the user clicks delete button
Then the book is deleted
And confirmation for book deleted is displayed
```
```
Scenario: add new book

Given a logged in user
When the user clicks new book button
Then the form for adding a book is displayed
When the user fills book details
And the user clicks save button
Then the book is saved
And confirmation for book added is displayed
```


To install dependencies for the webapp, npm has to be installed in your system. Install NodeJs and npm will be installed with it. For more information:
```
https://nodejs.org/es/download/
```

Once installed, install project dependencies running

```
npm install
```
## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `--prod` flag for a production build.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests
The e2e tests have been written using Cypress tool. To run the tests first start the webapp and then 
run the command
 ```
 npm run cy:run 
```
from the root folder. Tests have been written mocking the backend responses to not depend on an external API being up and running for our tests.
To make sure the backend will return a response according to the mocked ones, contract testing would have to be in place between the API producer and consumer.
