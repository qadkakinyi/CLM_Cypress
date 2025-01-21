import {navigateToClientMenu} from "../../support/e2e";
import {faker} from "@faker-js/faker";

let location = '';
describe('Shareholders/Partners', ()=>{

    it('Adds Shareholder', ()=>{
        navigateToClientMenu('Corporate')

        cy.get('.left-secondary-menu .left-menu-items.main-menu li>sa-menu-item>a').contains('span', 'Shareholders/Partners').click();
        cy.getByDataCy('add-stakeholder').click().wait(1000)

        cy.getBySel('capacitiesList').click()
        cy.getBySel('dynamicSelectBoxDropdownGrid').find('[aria-rowindex="2"]').click()
        
        cy.getByDataCy('weight-percentage').clear().type(faker.number.int({min:0, max:19}).toString())
        
        cy.getByFormControlName('numberOfShares').clear().type(faker.number.int({min:0, max:19}).toString())
        cy.getByFormControlName('isNominee').click()
        cy.getByFormControlName('isControllingPerson').click()
        
        cy.getBySel('controllingPersonTypesList').click()
        cy.getBySel('dynamicSelectBoxDropdownGrid').find('[aria-rowindex="2"]').eq(1).should('be.visible').click()
        cy.getByFormControlName('controllingPersonTypeOther').type(faker.word.words(5))
        
        cy.getByFormControlName('appointmentDate').type(faker.date.past().toISOString().slice(0, 10))
        cy.getByFormControlName('resignationDate').type(faker.date.recent().toISOString().slice(0, 10))
        
        cy.get('#clientsFilteringDataGrid').click()
        cy.get('#clientsFilteringDataGrid [aria-rowindex="1"]').click().wait(2000)
        cy.get('#addShareholderForm').contains('Save').click()
        cy.contains('The shareholder has been added.')

        cy.location('pathname').then((loc)=>{
            location = loc
        })
    })
    
    it('Edits Authorized Person', ()=>{
        cy.visit(location).wait(2000)
        cy.get('#gridClientShareholders .dx-icon-chevrondoubleright').should('be.visible').eq(0).click({force:true}).wait(2000)
        cy.get('#editClientShareholderForm')
        cy.getByDataCy('weight-percentage').clear().type(faker.number.int({min:10, max:49}).toString())
        cy.contains('div','Save & Close').click().wait(500)
        cy.contains('Shareholder has been updated.')
    })
    
    it('Deletes Authorized Person', ()=>{
        cy.visit(location).wait(2000)
        cy.get('#gridClientShareholders .dx-icon-trash').should('be.visible').eq(0).click({force:true})
        cy.contains('Yes').click().wait(500)
        cy.contains('Shareholder has been deleted.')
    })

})