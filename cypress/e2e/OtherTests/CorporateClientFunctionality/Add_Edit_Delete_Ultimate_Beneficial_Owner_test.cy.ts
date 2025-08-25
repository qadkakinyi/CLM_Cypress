import { faker } from "@faker-js/faker";
import { navigateToClientMenu, navigateToNewestClientMenu } from "../../../support/e2e";

let location = '';

/**
 * @testSuite Ultimate Beneficial Owner - Corporate
 * @description Test suite for managing corporate UBOs and related Shareholders/Partners
 * @priority High
 * @owner QA Team
 * @tags corporate, UBO, stakeholder-management
 * @dependencies faker-js, client_corporate.json
 */

describe('Ultimate Beneficial Owner - Corporate', () => {

    /**
     * @scenario Add Shareholder
     * @description Adds a new shareholder/partner with control attributes
     * @expectedResult Shareholder is saved successfully
     */
    it('Adds Shareholder', () => {
        let clientName;
        cy.readFile('cypress/fixtures/client_corporate.json').then((data) => {
            clientName = data.companyName;
            navigateToNewestClientMenu(clientName);
        });

        cy.get('.left-secondary-menu .left-menu-items.main-menu li>sa-menu-item>a')
            .contains('span', 'Shareholders/Partners').click();
        cy.getByDataCy('add-stakeholder').click().wait(1000);

        cy.getBySel('capacitiesList').click();
        cy.getBySel('dynamicSelectBoxDropdownGrid').find('[aria-rowindex="2"]').click();

        cy.getByDataCy('weight-percentage').clear().type(faker.number.int({ min: 0, max: 19 }).toString());
        cy.getByFormControlName('numberOfShares').clear().type(faker.number.int({ min: 0, max: 19 }).toString());
        cy.getByFormControlName('isNominee').click();
        cy.getByFormControlName('isControllingPerson').click();

        cy.getBySel('controllingPersonTypesList').click();
        cy.getBySel('dynamicSelectBoxDropdownGrid').find('[aria-rowindex="2"]').eq(1).should('be.visible').click();
        cy.getByFormControlName('controllingPersonTypeOther').type(faker.word.words(5));

        cy.getByFormControlName('appointmentDate').type(faker.date.past().toISOString().slice(0, 10));
        cy.getByFormControlName('resignationDate').type(faker.date.recent().toISOString().slice(0, 10));

        cy.get('#clientsFilteringDataGrid').click();
        cy.get('#clientsFilteringDataGrid [aria-rowindex="1"]').click().wait(2000);
        cy.get('#addShareholderForm').contains('Save').click();
        cy.wait(2000);

        cy.location('pathname').then((loc) => {
            location = loc;
        });
    });

    /**
     * @scenario Add UBO
     * @description Links a UBO profile to a shareholder and sets control and share details
     * @expectedResult UBO is added and confirmation message is shown
     */
    it('Adds UBO', () => {
        cy.visit(location).wait(2000);

        cy.get('.left-secondary-menu .left-menu-items.main-menu li>sa-menu-item>a')
            .contains('span', 'Ultimate Beneficial Owner').click();
        cy.getByDataCy('addBeneficiary').click().wait(1000);

        cy.getByDataCy('clientShareholdersList').click();
        cy.getBySel('dynamicSelectBoxDropdownGrid').find('[aria-rowindex="1"]').click().wait(500);

        cy.getByFormControlName('numberOfShares').type('0');
        cy.getByDataCy('weight-percentage').clear().type(faker.number.int({ min: 50, max: 99 }).toString());
        cy.getByFormControlName('isControllingPerson').click();

        cy.getByFormControlName('appointmentDate').type(faker.date.past().toISOString().slice(0, 10));
        cy.getByFormControlName('resignationDate').type(faker.date.recent().toISOString().slice(0, 10));

        cy.getBySel('controllingPersonList').click().wait(1000);
        cy.getBySel('dynamicSelectBoxDropdownGrid').eq(1).find('td').eq(0).click();
        cy.getByFormControlName('controllingPersonTypeOther').type(faker.word.words(5));

        cy.get('#selectClient').click();
        cy.get('#clientsFilteringDataGrid [aria-rowindex="1"]').click().wait(2000);
        cy.get('#addBeneficiaryForm').contains('Save').click().wait(2000);
        cy.contains('The beneficiary has been added.');

        cy.location('pathname').then((loc) => {
            location = loc;
        });
    });

    /**
     * @scenario Edit UBO
     * @description Modifies the weight percentage of an existing UBO
     * @expectedResult UBO record is updated successfully
     */
    it('Edits UBO', () => {
        cy.visit(location).wait(2000);
        cy.get('#gridClientBeneficiary .dx-icon-chevrondoubleright').should('be.visible').eq(0).click({ force: true }).wait(2000);
        cy.get('#editClientBeneficiaryForm');
        cy.getByDataCy('weight-percentage').clear().type(faker.number.int({ min: 10, max: 49 }).toString());
        cy.contains('div', 'Save & Close').click().wait(2000);
        cy.contains('The Beneficiary has been updated.');
    });

    /**
     * @scenario Delete UBO
     * @description Removes a UBO record from the client profile
     * @expectedResult UBO is deleted successfully
     */
    it('Deletes UBO', () => {
        cy.visit(location).wait(2000);
        cy.get('#gridClientBeneficiary .dx-icon-trash').should('be.visible').eq(0).click({ force: true }).wait(1000);
        cy.contains('Yes').click().wait(2000);
        cy.contains('The beneficiary has been deleted.');
    });

    /**
     * @scenario Delete Shareholder
     * @description Removes the original shareholder record to clean up test data
     * @expectedResult Shareholder is deleted
     */
    it('Deletes Authorized Person', () => {
        let clientName;
        cy.readFile('cypress/fixtures/client_corporate.json').then((data) => {
            clientName = data.companyName;
            navigateToNewestClientMenu(clientName);
        });
        cy.get('.left-secondary-menu .left-menu-items.main-menu li>sa-menu-item>a')
            .contains('span', 'Shareholders/Partners').click();
        cy.get('#gridClientShareholders .dx-icon-trash').should('be.visible').eq(0).click({ force: true }).wait(1000);
        cy.contains('Yes').click().wait(1000);
        cy.contains('Shareholder has been deleted.');
    });

});

