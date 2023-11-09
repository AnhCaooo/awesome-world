describe('Test world application', () => {

  beforeEach(() => {
    cy.visit('/')
    cy.countriesTableBodyShouldExist();
    cy.loadingSpinnerIconShouldNotExist();
    cy.noDataAvailableTextNotExist();
  });

  it('choose "None" option and Find button should be disabled and Clear button should be enabled', () => {
    cy.getAndChooseFilterOption('none');
    cy.buttonShouldBeDisabled('find-button');
    cy.buttonShouldBeEnabled('clear-button');
  });

  it('select first country from the list by clicking the first row. Also try to view the country by access the URL to web browser', () => {
    cy.get('[data-cy="countries-table"] tbody tr').first().invoke('text')
      .then((text) => {
        let textsReceivedAsArray = text.split("  ");
        let targetCountry = textsReceivedAsArray[0].trim()
        cy.get(`[data-cy="${targetCountry}"]`).click();
        cy.url().should('eq', `http://localhost:4200/main?country=${encodeURIComponent(targetCountry)}`);
        cy.visit(`http://localhost:4200/main?country=${encodeURIComponent(targetCountry)}`);
        cy.countriesTableBodyShouldExist();
        cy.loadingSpinnerIconShouldNotExist();
        cy.noDataAvailableTextNotExist();
        cy.tableDataShouldHasOnlyOneRow();
      })
  });


  it('choose "Full Name" option then find "Finland", "Vietnam" (existing names). Also test the remove searching value from input field', () => {
    cy.getAndChooseFilterOption('full_name');
    cy.buttonShouldBeDisabled('find-button');
    cy.typeSearchValue('Finland');
    cy.buttonShouldBeEnabled('find-button');
    cy.clickButton("find-button");
    cy.tableDataShouldHasOnlyOneRow();
    cy.clickClearSearchValueButton();
    cy.buttonShouldBeDisabled('find-button');
    cy.typeSearchValue('Vietnam');
    cy.buttonShouldBeEnabled('find-button');
    cy.clickButton("find-button");
    cy.tableDataShouldHasOnlyOneRow();
  });

  it('choose "Full Name" option then find "unreal name" (non-existing names). Should received text called "No country found"', () => {
    cy.getAndChooseFilterOption('full_name');
    cy.buttonShouldBeDisabled('find-button');
    cy.typeSearchValue('unreal name');
    cy.buttonShouldBeEnabled('find-button');
    cy.clickButton("find-button");
    cy.getNoDataAvailableText();
  });

  it('choose "Partial Name" option then find "Fi", "Bi" (existing names). Also test the remove searching value from input field', () => {
    cy.getAndChooseFilterOption('partial_name');
    cy.buttonShouldBeDisabled('find-button');
    cy.typeSearchValue('Fi');
    cy.buttonShouldBeEnabled('find-button');
    cy.clickButton("find-button");
    cy.tableDataShouldHasMoreOneRow();
    cy.clickClearSearchValueButton();
    cy.buttonShouldBeDisabled('find-button');
    cy.typeSearchValue('Bi');
    cy.buttonShouldBeEnabled('find-button');
    cy.clickButton("find-button");
    cy.tableDataShouldHasMoreOneRow();
  });

  it('choose "Partial Name" option then find "Finnnnn" (non-existing names). Should received text called "No country found"', () => {
    cy.getAndChooseFilterOption('partial_name');
    cy.buttonShouldBeDisabled('find-button');
    cy.typeSearchValue('Finnnnn');
    cy.buttonShouldBeEnabled('find-button');
    cy.clickButton("find-button");
    cy.getNoDataAvailableText();
  });
})
