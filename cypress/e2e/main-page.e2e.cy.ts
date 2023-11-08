describe('Test world application', () => {

  beforeEach(() => {
    cy.visit('/')
  });

  it('table data should contain country values', () => {

  });

  it('choose "None" option and both Find and Clear button should be still disabled', () => {

  });

  it('choose "Full Name" option then input field and Clear button is enabled', () => {

  });

  it('choose "Partial Name" option then input field and Clear button is enabled', () => {

  });

  it('choose "Full Name" option then find "Finland", "Vietnam" (existing names). Also test the remove searching value from input field', () => {

  });

  it('choose "Full Name" option then find "unreal name" (non-existing names). Should received text called "No country found"', () => {

  });

  it('choose "Partial Name" option then find "Fin", "Viet" (existing names). Also test the remove searching value from input field', () => {

  });

  it('choose "Partial Name" option then find "Finnnnn" (non-existing names). Should received text called "No country found"', () => {

  });
})
