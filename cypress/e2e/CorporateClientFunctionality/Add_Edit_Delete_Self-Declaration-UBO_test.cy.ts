import {navigateToClientMenu} from "../../support/e2e";
import {faker} from "@faker-js/faker";

let location = '';
describe('Self-Declaration UBO', ()=>{
    
    it('Adds Self Declaration UBO', ()=>{
        navigateToClientMenu('Corporate')

        cy.get('.left-secondary-menu .left-menu-items.main-menu li>sa-menu-item>a').contains('span', 'Self-Declaration UBO').click();    
        cy.getByDataCy('Add-UBO').click().wait(1000)
        cy.location('pathname').then((loc)=>{
            location = loc
        })
        
        cy.getByFormControlName('percentageOfShares').type(faker.number.int({min:0, max:20}).toString())
        cy.getByDataCy('rate-weight').clear().type(faker.number.int({min:50, max:99}).toString())
        cy.getByFormControlName('includeInEvaluation').click()
        cy.getByFormControlName('isControllingPerson').click()
        cy.getByFormControlName('appointmentDate').type(faker.date.past().toISOString().slice(0, 10))
        cy.getByDataCy('controlling-person-type').click()
        cy.getBySel('dynamicSelectBoxDropdownGrid').find('[aria-rowindex="2"]').click()
        cy.getByFormControlName('resignationDate').type(faker.date.recent().toISOString().slice(0, 10))
        cy.getByFormControlName('controllingPersonTypeOther').type(faker.word.words(5))
        cy.getByDataCy('existing-profile').click()
        cy.get('#clientsFilteringDataGrid').find('[aria-rowindex="1"]').click().wait(2000)
        cy.get('#addUltimateBeneficialOwnerForm').contains('Save').click()
        cy.contains('The ultimate beneficial owner has been added.')
    })

    it('Edits Self Declaration UBO', ()=>{
        cy.visit(location).wait(2000)
        cy.get('#gridClientUltimateBeneficialOwners .dx-icon-chevrondoubleright').should('be.visible').eq(0).click({force:true}).wait(2000)
        cy.get('#editClientUltimateBeneficialOwnerForm')
        cy.getByFormControlName('percentageOfShares').clear().type(faker.number.int({min:0, max:20}).toString())
        cy.contains('div','Save & Close').click().wait(500)
        cy.contains('The Ultimate Beneficial Owner has been updated.')
    })

    it('Deletes Self Declaration UBO', ()=>{
        cy.visit(location).wait(2000)
        cy.get('#gridClientUltimateBeneficialOwners .dx-icon-trash').should('be.visible').eq(0).click({force:true}).wait(1000)
        cy.contains('Yes').click().wait(500)
        // cy.contains('The beneficiary has been deleted.')
    })
    
})