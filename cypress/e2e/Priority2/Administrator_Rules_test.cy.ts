import {faker} from "@faker-js/faker";

let hashValue = '';
function getProviderKey(){
    let today = new Date();
    let formattedDate = today.getFullYear().toString() + ('0' + (today.getMonth() +1)).slice(-2) + ('0' + today.getDate()).slice(-2)
    console.log(formattedDate)
    return formattedDate
}

describe('Add Rule', ()=>{
    it('Generate Regulation Group Hash Key', function() {
        cy.wait(3000)
        cy.getByDataCy('system-settings-menu').scrollIntoView().click();
        cy.get('[title="Account"]').click().wait(1000);
        cy.get('[icon="key"] > .sa-button > .text').click().wait(1000);
        cy.get('.col-md-12 > .form-group > app-dynamic-selectbox > .sa-input-dropdown > .custom-selectbox > .dx-dropdowneditor-input-wrapper > .dx-texteditor-container > .dx-texteditor-buttons-container > .dx-widget > .dx-button-content > .dx-dropdowneditor-icon').click();
        cy.get('[aria-rowindex="5"] > td').click();
        cy.get('#createHashKeyForm > fieldset > :nth-child(2) > .col-md-12 > .sa-input > .ng-untouched').clear();
        cy.get('#createHashKeyForm > fieldset > :nth-child(2) > .col-md-12 > .sa-input > .ng-untouched').type(getProviderKey());
        
        cy.get('.dx-dropdown-custom-style > .dx-dropdowneditor-input-wrapper > .dx-texteditor-container > .dx-texteditor-buttons-container > .dx-widget > .dx-button-content > .dx-dropdowneditor-icon').click().wait(500);
        cy.get('.dx-checkbox-container > .dx-checkbox-icon').eq(1).click()
        cy.getByFormControlName('dateOfRulesExpiration').type(faker.date.future().toLocaleDateString('en-CA'));
        cy.get('app-create-hash-key > .sa-form > .custom-backround-transparent > .row > .col > [icon="save"] > .sa-button > .text').click().wait(2000);
        cy.getByFormControlName('hashKey').invoke('val').then((value)=>{
            hashValue=value;
        })
        cy.get('#createHashKeyForm > .custom-backround-transparent > .row > .col > [icon="times"] > .sa-button > .text').click().wait(1000);
        
    });
    
    it('Adds A Rule', ()=>{
        cy.visit('/administration/rules').wait(2000)
        
        cy.contains('sa-button', 'Add').click().wait(1000)
        cy.get('dx-drop-down-box').eq(0).click().wait(500)
        cy.get('[aria-rowindex="1"] > .dx-command-select > .dx-widget > .dx-checkbox-container > .dx-checkbox-icon').click().wait(500)
        cy.get('dx-drop-down-box').eq(0).click().wait(500) //closing the dropdown menu
        
        cy.getByFormControlName('securityHash').type(hashValue)
        cy.get('#addRuleFormFromHash [icon="save"]').click().wait(2000)
        cy.contains('Rule has been added.').wait(1000)
    })
})