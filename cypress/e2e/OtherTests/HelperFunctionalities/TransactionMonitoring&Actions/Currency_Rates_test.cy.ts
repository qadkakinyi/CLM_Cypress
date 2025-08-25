import { faker } from "@faker-js/faker";

let rate = '123210';
let currency_name = `${faker.finance.currency().name} DKA`;

/**
 * @testSuite Currency Rate
 * @description Covers adding, editing, and deleting currency rate records
 * @priority Medium
 * @owner QA Team
 * @tags currency, rates, finance
 */
describe('Currency Rate', () => {
    let new_rate = rate + faker.number.int(1);

    /**
     * @scenario Add Currency Rate
     * @description Adds a new currency rate to the system
     * @steps
     *  1. Navigate to the Currency Rates settings page
     *  2. Click the "Add" button
     *  3. Select the "From Currency"
     *  4. Select the "To Currency"
     *  5. Enter the date
     *  6. Enter the rate value
     *  7. Click Save
     * @expectedResult Currency rate is successfully added and confirmation message is shown
     */
    it('Adds a Currency Rate', () => {
        cy.visit('/settings/currency-rates').wait(2000);
        cy.contains('sa-button', 'Add').click().wait(1000);

        // From Currency
        cy.get('dx-drop-down-box').eq(0).click().wait(500);
        cy.get('#dynamicSelectBoxDropdownGrid .dx-datagrid-rowsview .dx-datagrid-content tr td')
            .eq(2).click({ force: true }).wait(500);

        // To Currency
        cy.get('dx-drop-down-box').eq(1).click().wait(500);
        cy.get('#dynamicSelectBoxDropdownGrid .dx-datagrid-rowsview .dx-datagrid-content tr td')
            .eq(19).click({ force: true }).wait(500);

        cy.getByFormControlName('date').type('2024-09-24');
        cy.getByFormControlName('rate').eq(0).type(rate);

        cy.get('#addCurrencyRateForm > .custom-backround-transparent > .row > .col > [icon="save"] > .sa-button')
            .click().wait(1500);

        cy.contains('The currency rate has been added.');
    });

    /**
     * @scenario Edit Currency Rate
     * @description Updates an existing currency rate value
     * @steps
     *  1. Navigate to the Currency Rates settings page
     *  2. Search for the existing rate
     *  3. Click Edit
     *  4. Update the rate field
     *  5. Click Save
     * @expectedResult Currency rate is successfully updated and confirmation message is shown
     */
    it('Edits a Currency Rate', () => {
        cy.visit('/settings/currency-rates').wait(25000);
        cy.get('#gridCurrencyRates tr [aria-colindex="4"] .dx-texteditor-input')
            .type(rate, { force: true }).wait(25000);

        cy.get('#gridCurrencyRates tr td').find('.dx-icon-edit').eq(0)
            .click({ force: true }).wait(1000);

        cy.get('#gridCurrencyRates .dx-datagrid-table .dx-texteditor-container > .dx-texteditor-input-container > .dx-texteditor-input')
            .as('rates');

        cy.get('@rates').eq(3).clear().wait(1000)
            .type(new_rate, { force: true }).wait(1000);

        cy.get('tr td').find('.dx-icon-save').eq(1).click().wait(1500);

        cy.contains(`Currency rate has been updated.`);
    });

    /**
     * @scenario Delete Currency Rate
     * @description Deletes a currency rate from the system
     * @steps
     *  1. Navigate to the Currency Rates settings page
     *  2. Search for the updated rate
     *  3. Click Delete
     *  4. Confirm deletion
     * @expectedResult Currency rate is successfully deleted and confirmation message is shown
     */
    it('Deletes a Currency Rate', () => {
        cy.visit('/settings/currency-rates').wait(25000);
        cy.get('#gridCurrencyRates tr [aria-colindex="4"] .dx-texteditor-input')
            .type(new_rate, { force: true }).wait(20000);

        cy.get('#gridCurrencyRates tr td').find('.dx-icon-trash').eq(1)
            .click({ force: true }).wait(1000);

        cy.get('.dx-popup-normal').contains('Yes').click({ force: true }).wait(1000);

        cy.contains(`Currency rate has been deleted.`);
    });

});

