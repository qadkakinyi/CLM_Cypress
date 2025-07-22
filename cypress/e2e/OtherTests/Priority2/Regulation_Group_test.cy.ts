import {faker} from "@faker-js/faker";

function getProviderKey(){
    let today = new Date();
    let formattedDate = today.getFullYear().toString() + ('0' + (today.getMonth() +1)).slice(-2) + ('0' + today.getDate()).slice(-2)
    console.log(formattedDate)
    return formattedDate
}

let hashValue = '';
describe('Regulation Groups', ()=>{

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

    it('Duplicates a Regulation Group', ()=>{
        cy.visit('/settings/regulation-groups').wait(1500)
        cy.get('header > div .fa-clone').last().click().wait(1000)
        cy.getByFormControlName('newName').type('DKA Duplicate Group '+faker.string.alphanumeric(3))
        cy.getByFormControlName('hash').eq(1).type(hashValue)
        cy.get('#duplicateRegulationGroupForm [icon="save"]').click()
        cy.poll('Duplicated regulation group has been added.').wait(1000)
    })

    it('Edits a Regulation Group', ()=>{
        cy.visit('/settings/regulation-groups').wait(3000)

        cy.get('.sa-panel header .fa-share-square-o').last().click({force:true}).wait(2000)
        cy.getByFormControlName('name').clear().type('DKA Duplicate Group Edited')
        cy.contains('sa-button','Save & Close').click().wait(1500)
        cy.poll('Regulation group has been updated.')
    })

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

    it('Deletes a Regulation Group', ()=>{
        cy.visit('/settings/regulation-groups').wait(3000)

        cy.get('.sa-panel header .fa-share-square-o').last().click({force:true}).wait(2000)

        cy.get('[primary-buttons=""] > [icon="trash"] > .sa-button').click({force:true}).wait(1000)
        cy.get('.col > [icon="trash"]').click()
        cy.get('.MessageBoxButtonSection').contains('button', 'Yes').click()
        cy.poll('The Regulation Group has been deleted.')
    })


})