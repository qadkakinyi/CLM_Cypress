/**
 * @testSuite Client Profiling - Address Types Settings
 * @description Manages the creation, editing, and deletion of Address Types in system settings
 * @priority Medium
 * @owner QA Team
 * @tags regression, settings, address-types
 * @dependencies faker-js
 * @fileDescription Covers CRUD operations for Address Types configuration
 */

import { faker } from "@faker-js/faker";

describe("Addresses Types", () => {

    /**
     * @scenario Add Address Type
     * @description Adds a new address type using faker-generated mapping reference
     * @priority Medium
     * @testData Static name/code, faker-generated mappingReference
     * @steps Step 1: Visit Address Types settings page
     * @steps Step 2: Click 'Add' button
     * @steps Step 3: Fill in name, code, mapping reference and select regulation group
     * @steps Step 4: Click 'Save'
     * @expectedResult Confirmation message "Address Type has been added." is shown
     */
    it("Adds Address Types", () => {
        cy.visit('/settings/addressesTypes').wait(1000)

        cy.get('#addAddressTypeForm')

        cy.contains('sa-button','Add').click().wait(1000)

        cy.getByFormControlName('name').eq(0).type('permanent test address')
        cy.getByFormControlName('code').eq(0).type('P-T-A')
        cy.getByFormControlName('mappingReference').eq(0).type(faker.string.alphanumeric(13))
        cy.get('dx-drop-down-box').eq(0).click().wait(500)
        cy.get('#dynamicSelectBoxDropdownGrid [aria-rowindex="1"]').click().wait(500)

        cy.get('#addAddressTypeForm sa-button').contains('Save').click().wait(1000)
        cy.contains('Address Type has been added.')
    })

    /**
     * @scenario Edit Address Type
     * @description Updates the code of an existing address type entry
     * @priority Medium
     * @testData Static search term 'permanent test address'
     * @steps Step 1: Visit Address Types settings page
     * @steps Step 2: Search for existing address by name
     * @steps Step 3: Click Edit (pencil icon)
     * @steps Step 4: Clear and update the 'code' field, click Save
     * @expectedResult Confirmation message "Address Type has been edited." is shown
     */
    it("Edits Address type", () => {
        cy.visit('/settings/addressesTypes').wait(2000)

        cy.get('#gridAddressesTypes tr .dx-first-cell .dx-texteditor-input')
            .type('permanent test address', { force: true }).wait(2500)
        cy.get('tr td').find('.fa-pencil').eq(0).click({ force: true }).wait(1000)
        cy.get('#editAddressTypeForm')

        cy.getByFormControlName('code').eq(1).clear().type('p_t_address')
        cy.get('#editAddressTypeForm sa-button').contains('Save').click().wait(1000)
        cy.contains('Address Type has been edited.')
    })

    /**
     * @scenario Delete Address Type
     * @description Deletes the previously added address type entry
     * @priority Medium
     * @testData Static search term 'permanent test address'
     * @steps Step 1: Visit Address Types settings page
     * @steps Step 2: Search for existing address by name
     * @steps Step 3: Click Delete (trash icon), confirm prompt
     * @expectedResult Confirmation message "Address type has been deleted." is shown
     */
    it("Deletes Address type", () => {
        cy.visit('/settings/addressesTypes').wait(2000)

        cy.get('#gridAddressesTypes tr .dx-first-cell .dx-texteditor-input')
            .type('permanent test address', { force: true }).wait(2500)
        cy.get('tr td').find('.fa-trash').eq(0).click({ force: true }).wait(1000)
        cy.get('.MessageBoxButtonSection').contains('button', 'Yes').click({ force: true }).wait(1000);
        cy.contains('Address type has been deleted.')
    })
})

