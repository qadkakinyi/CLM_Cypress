import {navigateToClientMenu} from "../../support/e2e";
import {faker} from "@faker-js/faker";

let location = '';
describe('Capacity - Corporate', ()=>{

    it('Adds Authorized Person', ()=>{
        navigateToClientMenu('Corporate')

        cy.get('.left-secondary-menu .left-menu-items.main-menu li>sa-menu-item>a').contains('span', 'Capacity').click();
        cy.getBySel('addAuthorizedPerson').click().wait(1000)

        cy.getBySel('capacitiesList').click()
        cy.getBySel('dynamicSelectBoxDropdownGrid').find('[aria-rowindex="2"]').click()
        
        cy.getByDataCy('weight-percentage').clear().type(faker.number.int({min:50, max:99}).toString())
        
        cy.getByFormControlName('includeInEvaluation').click()
        cy.getByFormControlName('isNominee').click()
        cy.getByFormControlName('isControllingPerson').click()
        
        cy.getBySel('controllingPersonTypesList').click()
        cy.getBySel('dynamicSelectBoxDropdownGrid').find('[aria-rowindex="2"]').eq(1).should('be.visible').click()
        cy.getByFormControlName('controllingPersonTypeOther').type(faker.word.words(5))
        
        cy.getByFormControlName('appointmentDate').type(faker.date.past().toISOString().slice(0, 10))
        cy.getByFormControlName('resignationDate').type(faker.date.recent().toISOString().slice(0, 10))
        
        cy.getBySel('existingClientsList').click()
        cy.get('#clientsFilteringDataGrid').find('[aria-rowindex="1"]').click().wait(2000)
        cy.get('#addAuthorizedPersonForm').contains('Save').click().wait(1000)
        cy.contains('The authorized person has been added.').wait(1500)

        cy.location('pathname').then((loc)=>{
            location = loc
        })
    })
    
    it('Edits Authorized Person', ()=>{
        cy.visit(location).wait(2000)
        cy.get('#gridClientAuthorizedPersons .dx-icon-chevrondoubleright').should('be.visible').eq(0).click({force:true}).wait(2000)
        cy.get('#editClientAuthorizedPersonForm')
        cy.getByDataCy('weight-percentage').clear().type(faker.number.int({min:10, max:49}).toString())
        cy.contains('div','Save & Close').click().wait(1000)
        cy.contains('The capacity has been updated.').wait(2500)
    })
    
    it('Deletes Authorized Person', ()=>{
        cy.visit(location).wait(2000)
        cy.get('#gridClientAuthorizedPersons .dx-icon-trash').should('be.visible').eq(0).click({force:true})
        cy.contains('Yes').click().wait(500)
        cy.contains('The authorized person has been deleted.').wait(1500)
    })

})