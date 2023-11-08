# AwesomeWorld

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 16.2.9.

## Description

The app can do:

- allow user to find country by full name or partial name 
- if there is no request or initially, the UI will fetch and show all countries
- give user the country details which including the country flag, common and official name, etc. 
- functionalities are covering by Cypress 

### Coming features
- Responsive table data for mobile screen
- User should be able to enter a direct URL to web browser address bar to get country details, same result displayed as from point 2 (requirement!)
- Implement e2e test with Cypress 

## Preparations

Install npm package before use this application.

`npm install`

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The application will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Running unit tests and end-to-end tests with Cypress

Run `ng e2e` to execute the unit tests and end-to-end tests via [Cypress](https://www.cypress.io/). To use this command, you need to first add a package that implements end-to-end testing capabilities.

If you run `npx cypress open`, you need to execute command `ng serve` at the same time in order to execute the test.

### End-to-end tests

Open Cypress GUI by `ng e2e` or combine `npx cypress open` and `ng serve`, then select **E2E Testing**

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI Overview and Command Reference](https://angular.io/cli) page.
