// ***********************************************
// This example namespace declaration will help
// with Intellisense and code completion in your
// IDE or Text Editor.
// ***********************************************
// declare namespace Cypress {
//   interface Chainable<Subject = any> {
//     customCommand(param: any): typeof customCommand;
//   }
// }
//
// function customCommand(param: any): void {
//   console.warn(param);
// }
//
// NOTE: You can use it like so:
// Cypress.Commands.add('customCommand', customCommand);
//
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

declare namespace Cypress {
    interface Chainable<Subject> {
        loadingSpinnerIconShouldNotExist(): void;
        loadingSpinnerIconShouldExist(): void;
        countriesTableBodyShouldExist(): void;
        noDataAvailableTextNotExist(): void;
        noDataAvailableTextExist(): void;
        getAndChooseFilterOption(filter: string): void;
        buttonShouldBeDisabled(button: string): void;
        buttonShouldBeEnabled(button: string): void;
        clickButton(button: string): void;
        typeSearchValue(value: string): void;
        clickClearSearchValueButton(): void;
        tableDataShouldHasOnlyOneRow(): void;
        tableDataShouldHasMoreOneRow(): void;
        getNoDataAvailableText(): void;
    }
}


Cypress.Commands.add("countriesTableBodyShouldExist", () => {
    cy.get('[data-cy="countries-table"] tbody');
});

Cypress.Commands.add("loadingSpinnerIconShouldNotExist", () => {
    cy.get('[data-cy="loading-spinner"]').should('not.exist');
});

Cypress.Commands.add("loadingSpinnerIconShouldExist", () => {
    cy.get('[data-cy="loading-spinner"]').should('exist');
});

Cypress.Commands.add("noDataAvailableTextNotExist", () => {
    cy.get('[data-cy="no-data-container"]').should('not.exist');
});

Cypress.Commands.add("noDataAvailableTextExist", () => {
    cy.get('[data-cy="no-data-container"]').should('exist');
});

Cypress.Commands.add("getAndChooseFilterOption", (filter: string) => {
    cy.get('[data-cy="filter-select"]').click();
    cy.get(`[data-cy="${filter}"]`).click();
    cy.get('[data-cy="option-form-field"]')
        .invoke('text').then(text => text.includes(filter));
});

Cypress.Commands.add("buttonShouldBeDisabled", (button: string) => {
    cy.get(`[data-cy=${button}]`).should('be.disabled');
});

Cypress.Commands.add("buttonShouldBeEnabled", (button: string) => {
    cy.get(`[data-cy=${button}]`).should('be.enabled');
});

Cypress.Commands.add("clickButton", (button: string) => {
    cy.get(`[data-cy=${button}]`).should('be.enabled').click();
});

Cypress.Commands.add("typeSearchValue", (value: string) => {
    cy.get('[data-cy="country-search-input"]').type(value);

});

Cypress.Commands.add("clickClearSearchValueButton", () => {
    cy.get('[data-cy="clear-search-text"]').should('be.enabled').click();
});

Cypress.Commands.add("tableDataShouldHasOnlyOneRow", () => {
    cy.get('[data-cy="countries-table"] tbody tr').should('have.length', 1);
});

Cypress.Commands.add("getNoDataAvailableText", () => {
    cy.get('[data-cy="no-data-container"]');
});

Cypress.Commands.add("tableDataShouldHasMoreOneRow", () => {
    cy.get('[data-cy="countries-table"] tbody tr').should('have.length.greaterThan', 1);
});
