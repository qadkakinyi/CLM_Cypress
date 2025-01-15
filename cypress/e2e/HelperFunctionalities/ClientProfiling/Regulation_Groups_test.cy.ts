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
        
        cy.get('span.ng-tns-c329-33').click();
        cy.get('a.ng-tns-c329-34 > .ng-tns-c329-34').click();
        cy.get('[icon="key"] > .sa-button > .text').click();
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
    
    it('Add a Regulation Group', ()=>{
        cy.visit('/settings/regulation-groups').wait(1500)
        cy.contains('Add').click().wait(1000)
        cy.getByFormControlName('name').type('DKA Test Group')
        cy.getByFormControlName('mappingReference').type(faker.string.alphanumeric(13))
        // cy.getByDataCy('countries').click().wait(500)
        cy.get('dx-drop-down-box').eq(0).click().wait(500)
        cy.get('#dynamicSelectBoxDropdownGrid .dx-datagrid-rowsview .dx-datagrid-content table tr').eq(0).click().wait(1000) 
        // cy.getByDataCy('currency').click().wait(500)
        cy.get('dx-drop-down-box').eq(1).click().wait(500)
        cy.contains('0x').click({force:true}).wait(1000)
        cy.getByFormControlName('hash').eq(0).type(hashValue)
        cy.contains('sa-button','Save').click().wait(1500)
        cy.contains('Regulation group has been added.').wait(1000)
    })

    it('Edits a Regulation Group', ()=>{
        cy.visit('/settings/regulation-groups').wait(3000)
        
        cy.get('.sa-panel header .fa-share-square-o').last().click({force:true}).wait(2000)
        cy.getByFormControlName('name').clear().type('Test Group DKA')
        cy.contains('sa-button','Save & Close').click().wait(1500)
        cy.contains('Regulation group has been updated.')
    })

    // it('Deletes a Regulation Group', ()=>{
    //     cy.visit('/settings/regulation-groups').wait(3000)
    //
    //     cy.get('.sa-panel header .fa-share-square-o').last().click({force:true}).wait(2000)
    //     cy.getByFormControlName('name').type('Test Group DKA')
    //     cy.contains('sa-button','Delete').click().wait(1000)
    //     cy.get('.col > [icon="trash"]').click()
    //     cy.get('.MessageBoxButtonSection').contains('button', 'Yes').click()
    //     cy.wait(38000)
    //     // cy.contains('The Regulation Group has been deleted.')
    // })

    
})