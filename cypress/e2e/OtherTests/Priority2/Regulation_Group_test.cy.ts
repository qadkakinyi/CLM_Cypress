import {faker} from "@faker-js/faker";

/**
 * @testSuite Regulation Groups - Management
 * @description Performs end-to-end operations on regulation groups: generate provider hash key, duplicate a group, edit, synchronize, and delete.
 * @priority Medium
 * @owner QA Team
 * @tags regression, smoke, settings, regulation-groups, synchronization
 * @dependencies user-authentication, cypress, faker-js
 * @fileDescription Validates key flows of the Regulation Groups feature from setup to teardown.
 */

function getProviderKey(){
    let today = new Date();
    let formattedDate = today.getFullYear().toString() + ('0' + (today.getMonth() +1)).slice(-2) + ('0' + today.getDate()).slice(-2)
    console.log(formattedDate)
    return formattedDate
}

let hashValue = '';

/**
 * @suite Regulation Groups Operations
 * @description Collection of scenarios for managing regulation groups through the UI.
 * @prerequisites User is logged in with permissions to access System Settings → Account and Settings → Regulation Groups.
 * @prerequisites Provider list is configured; a selectable provider exists in the dropdown (row index 4).
 * @testData Provider key = today's date (yyyyMMdd); TTL = "10"; duplicate name "DKA Duplicate Group <random>"; hash captured into variable "hashValue".
 */
describe('Regulation Groups', ()=>{

    /**
     * @scenario Generate Provider Hash Key
     * @description Generates a provider hash key required for subsequent regulation-group operations.
     * @priority Medium
     * @testData providerKey = yyyyMMdd from getProviderKey(); ttl = "10".
     * @steps Open System Settings menu and select "Account".
     * @steps Open the key generator, choose a provider (row 4).
     * @steps Enter provider key (yyyyMMdd) and TTL.
     * @steps Save and capture the generated hash into "hashValue".
     * @expectedResult Hash key is generated and stored in "hashValue"; dialog is closed.
     */
    it('Generate Regulation Group Hash Key', function() {
        cy.wait(3000)
        cy.getByDataCy('system-settings-menu').scrollIntoView().click();
        cy.contains('[data-cy="system-settings-menu"] sa-menu-item','Account').click().wait(1000);
        cy.get('[icon="key"] > .sa-button > .text').click().wait(1000);
        cy.get('.col-md-12 > .form-group > app-dynamic-selectbox > .sa-input-dropdown > .custom-selectbox > .dx-dropdowneditor-input-wrapper > .dx-texteditor-container > .dx-texteditor-buttons-container > .dx-widget > .dx-button-content > .dx-dropdowneditor-icon').click();
        cy.get('[aria-rowindex="4"] > td').click();
        cy.get('#createHashKeyForm > fieldset > :nth-child(2) > .col-md-12 > .sa-input > .ng-untouched').clear();
        cy.get('#createHashKeyForm > fieldset > :nth-child(2) > .col-md-12 > .sa-input > .ng-untouched').type(getProviderKey());
        cy.get('.row.ng-star-inserted > .col-md-12 > .sa-input > .ng-untouched').clear();
        cy.get('.row.ng-star-inserted > .col-md-12 > .sa-input > .ng-untouched').type('10');
        cy.get('#createHashKeyForm > .custom-backround-transparent > .row > .col > [icon="save"] > .sa-button').click().wait(2000);
        cy.getByFormControlName('hashKey').invoke('val').then((value)=>{
            hashValue=value;
        })

        cy.get('#createHashKeyForm > .custom-backround-transparent > .row > .col > [icon="times"] > .sa-button > .text').click();

    });

    /**
     * @scenario Duplicate Regulation Group
     * @description Duplicates an existing regulation group using the generated hash key.
     * @priority Medium
     * @testData newName = "DKA Duplicate Group <alphanumeric(3)>"; hash = hashValue.
     * @steps Navigate to Settings → Regulation Groups.
     * @steps Click the Duplicate icon on the last listed regulation group.
     * @steps Enter a new name and paste the hash value.
     * @steps Save and wait for the success notification.
     * @expectedResult Toast "Duplicated regulation group has been added." is displayed.
     */
    it('Duplicates a Regulation Group', ()=>{
        cy.visit('/settings/regulation-groups').wait(1500)
        cy.get('header > div .fa-clone').last().click().wait(1000)
        cy.getByFormControlName('newName').type('DKA Duplicate Group '+faker.string.alphanumeric(3))
        cy.getByFormControlName('hash').eq(1).type(hashValue)
        cy.get('#duplicateRegulationGroupForm [icon="save"]').click()
        cy.poll('Duplicated regulation group has been added.').wait(1000)
    })

    /**
     * @scenario Edit Regulation Group
     * @description Edits the duplicated regulation group name and saves changes.
     * @priority Medium
     * @steps Open Settings → Regulation Groups.
     * @steps Open the last group's details via the share-square icon.
     * @steps Change the name to "DKA Duplicate Group Edited".
     * @steps Click "Save & Close" and verify the update toast.
     * @expectedResult Toast "Regulation group has been updated." is displayed.
     */
    it('Edits a Regulation Group', ()=>{
        cy.visit('/settings/regulation-groups').wait(3000)

        cy.get('.sa-panel header .fa-share-square-o').last().click({force:true}).wait(2000)
        cy.getByFormControlName('name').clear().type('DKA Duplicate Group Edited')
        cy.contains('sa-button','Save & Close').click().wait(1500)
        cy.poll('Regulation group has been updated.')
    })

    /**
     * @scenario Synchronize Regulation Group
     * @description Synchronizes selected setup types (e.g., Criteria) for a regulation group.
     * @priority Medium
     * @steps Open Settings → Regulation Groups and click the Refresh icon.
     * @steps Choose regulation groups to be synced.
     * @steps Select setup type "Criteria".
     * @steps Choose criteria rows to sync and start synchronization.
     * @expectedResult Toast "Synchronization Completed" is displayed.
     */
    it('Synchronizes a Regulation Group', ()=>{
        cy.visit('/settings/regulation-groups').wait(3000)
        cy.get('header > div .fa-refresh').last().click().wait(3000)
        cy.getByFormControlName('regulationGroupsToBeSynced').click()
        cy.get('.multiselect-dropdown').eq(3).find('.dropdown-list .item2 li').eq(0).click().wait(500)
        cy.getByFormControlName('setupTypes').click()
        cy.get('.multiselect-item-checkbox').contains('Criteria').click().wait(500)
        cy.getByFormControlName('regulationGroupCriteria').click()
        cy.get('.dx-datagrid tbody .dx-checkbox-icon').eq(1).click({force:true}).wait(1000)
        cy.getByFormControlName('regulationGroupCriteria').click().wait(500)
        cy.get('[icon="recycle"] > .sa-button').click({force:true})
        cy.poll('Synchronization Completed')

    })

    /**
     * @scenario Delete Regulation Group (Teardown)
     * @description Deletes the previously edited regulation group to clean up test data.
     * @priority Medium
     * @steps Open Settings → Regulation Groups and open the last group's details.
     * @steps Click Delete and confirm the Yes prompt.
     * @expectedResult Toast "The Regulation Group has been deleted." is displayed and group is removed.
     */
    it('Deletes a Regulation Group', ()=>{
        cy.visit('/settings/regulation-groups').wait(3000)

        cy.get('.sa-panel header .fa-share-square-o').last().click({force:true}).wait(2000)

        cy.get('[primary-buttons=""] > [icon="trash"] > .sa-button').click({force:true}).wait(1000)
        cy.get('.col > [icon="trash"]').click()
        cy.get('.MessageBoxButtonSection').contains('button', 'Yes').click()
        cy.poll('The Regulation Group has been deleted.')
    })


})

