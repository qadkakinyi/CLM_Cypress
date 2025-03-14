import { faker } from "@faker-js/faker";


describe('Add Client Individual', () => {
  
  it('Add Client Individual', () => {
    // cy.intercept('GET','http://localhost:5140/api/settings/regulationGroup/1/subGroups', []).as('getRegulation')
    // cy.intercept('GET','http://localhost:5140/api/settings/customFields/form/1/0', []).as('getCustomFields')
    // Click on Know your Clients navigation item
    cy.get('a[href*="main/clients"]').click();
    cy.get('#addIndividual').click().wait(2000);

    let firstName = faker.person.firstName('male');
    cy.get('#addClientIndividualForm input[name="firstName"]').type(firstName);
    cy.get('#addClientIndividualForm input[name="lastName"]').type(faker.person.lastName('male'));
    cy.get('#addClientIndividualForm input[name="middleName"]').type(faker.person.middleName('male'));

    cy.get('#clientStatusesDropdown').click();
    cy.get('#dynamicSelectBoxDropdownGrid').eq(0).find('.dx-datagrid-rowsview table tbody tr td').eq(0).click({ force: true })
    
    cy.get('#regulationGroupsDropdown').should('be.visible').click()
    
    cy.wait(1000)
    
    cy.get('.dx-overlay-wrapper.dx-popup-wrapper.dx-dropdowneditor-overlay .dx-datagrid-rowsview table tbody tr td').eq(0).click({ force: true });

    // cy.wait('@getRegulation')
    // cy.wait('@getCustomFields')

    cy.get('#addClientIndividualForm input[name="externalReference"]').type(faker.string.alphanumeric(12));
    cy.get('#addClientIndividualForm input[name="phone"]').type(faker.string.numeric(8));
    cy.get('#addClientIndividualForm input[name="email"]').type(`${firstName}@gmail.com`);
    cy.get('#addClientIndividualForm input[name="ssn"]').type(faker.string.alphanumeric(10));
    cy.get('#addClientIndividualForm input[name="taxIdentificationNumber"]').type(faker.string.alphanumeric(10));
    cy.get('#addClientIndividualForm input[name="dateOfBirth"]').type(faker.date.birthdate({ min: 18, max: 65, mode: 'age' }).toISOString().slice(0, 10));

    cy.get('#countriesDropdown').click();
    cy.get('#dynamicSelectBoxDropdownGrid table tr').contains('td', 'Albania').click();

    cy.get('#addClientIndividualForm input[name="ipAddress"]').type(faker.internet.ipv4());
    cy.get('#addClientIndividualForm textarea[name="notes"]').type(faker.lorem.paragraph());

    cy.get('#saveClientIndividual').click().wait(6000);
    cy.contains('Client individual has been added').wait(2000)
  })
  
  // it.skip('Delete a client', ()=>{
  //   cy.visit('/main/clients')
  //
  //   cy.get('.dx-datagrid-content-fixed > .dx-datagrid-table > tbody > [aria-rowindex="1"] > .dx-command-edit > span > .dx-template-wrapper > .dx-link > .fa').click();
  //   cy.get('a.ng-tns-c463-199 > .ng-trigger').click();
  //   cy.get('[icon="archive"] > .sa-button > .text').click();
  //   cy.get('#bot2-Msg1').click();
  // })
})
