import {faker} from "@faker-js/faker";

describe('Client Categories', () => {

    /**
     * @scenario Add Client Category
     * @description Creates a new client category with a faker-generated mapping reference
     * @priority High
     * @testData Faker-generated mapping reference
     * @steps Navigate to client categories settings
     * @steps Click 'Add', enter name and mapping reference
     * @steps Save the client category
     * @expectedResult Client category is saved and confirmation message appears
     */
    it('Adds A Client Category', () => {
        cy.visit('/settings/client-categories').wait(1000)
        cy.contains('sa-button', 'Add').click().wait(1000)
        cy.get('#addClientCategoryForm')
        cy.getByFormControlName('name').type('Client Category Test')
        cy.getByFormControlName('mappingReference').type(faker.string.alphanumeric(11))
        cy.get('#addClientCategoryForm [icon="save"] > .sa-button').contains('Save').click().wait(2000);
        cy.contains('Client category has been added.')
    })

    /**
     * @scenario Edit Client Category
     * @description Updates the name of an existing client category
     * @priority Medium
     * @steps Search for the client category by name
     * @steps Click edit icon, update name, save
     * @expectedResult Client category is updated and confirmation message appears
     */
    it('Edits A Client Category', () => {
        cy.visit('/settings/client-categories').wait(2000)

        cy.get('#gridClientCategories tr .dx-first-cell .dx-texteditor-input')
            .type('Client Category Test', {force: true}).wait(2500)
        cy.get('tr td').find('.dx-icon-edit').eq(1).click({force: true}).wait(1000)

        cy.get('#gridClientCategories .dx-datagrid-table .dx-texteditor-container > .dx-texteditor-input-container > .dx-texteditor-input')
            .as('clientCategories')
        cy.get('@clientCategories').eq(3).clear().wait(1000)
            .type('Test Category ' + faker.string.alphanumeric(3), {force: true}).wait(1000)
        cy.get('tr td').find('.dx-icon-save').eq(1).click().wait(1000)
        cy.contains('Client category has been updated.')
    })

    /**
     * @scenario Delete Client Category
     * @description Deletes an existing client category
     * @priority Medium
     * @steps Search for the client category by name
     * @steps Click delete icon, confirm deletion
     * @expectedResult Client category is deleted and confirmation message appears
     */
    it('Deletes A Client Category', () => {
        cy.visit('/settings/client-categories').wait(2000)

        cy.get('#gridClientCategories tr .dx-first-cell .dx-texteditor-input')
            .type('Test Category', {force: true}).wait(2500)
        cy.get('tr td').find('.dx-icon-trash').eq(1).click({force: true}).wait(1000)
        cy.get('.dx-popup-normal').contains('Yes').click({force: true}).wait(1000);
        cy.contains('Client category has been deleted.')
    })
})
