import {navigateToClientMenu} from "../../support/e2e";
import {faker} from "@faker-js/faker";

let location = '';
describe('Ultimate Beneficial Owner', ()=>{

    it('Adds UBO', ()=>{
        navigateToClientMenu('Corporate')

        cy.get('.left-secondary-menu .left-menu-items.main-menu li>sa-menu-item>a').contains('span', 'Ultimate Beneficial Owner').click();
        cy.getByDataCy('addBeneficiary').click().wait(1000)

        cy.getByDataCy('clientShareholdersList').click()
        cy.getBySel('dynamicSelectBoxDropdownGrid').find('[aria-rowindex="1"]').click().wait(500)
        
        cy.getByFormControlName('numberOfShares').type('0')
    
        cy.getByDataCy('weight-percentage').clear().type(faker.number.int({min:50, max:99}).toString())

        cy.getByFormControlName('isControllingPerson').click()
        
        cy.getByFormControlName('appointmentDate').type(faker.date.past().toISOString().slice(0, 10))
        cy.getByFormControlName('resignationDate').type(faker.date.recent().toISOString().slice(0, 10))
        
        cy.getBySel('controllingPersonList').click().wait(1000)
        cy.getBySel('dynamicSelectBoxDropdownGrid').find('[aria-rowindex="2"]').should('be.visible').click()
        cy.getByFormControlName('controllingPersonTypeOther').type(faker.word.words(5))
        
        
        cy.get('#selectClient').click()
        cy.get('#clientsFilteringDataGrid [aria-rowindex="1"]').click().wait(2000)
        cy.get('#addBeneficiaryForm').contains('Save').click().wait(2000)
        cy.contains('The beneficiary has been added.')

        cy.location('pathname').then((loc)=>{
            location = loc
        })
    })
    
    it('Edits UBO', ()=>{
        cy.visit(location).wait(2000)
        cy.get('#gridClientBeneficiary .dx-icon-chevrondoubleright').should('be.visible').eq(0).click({force:true}).wait(2000)
        cy.get('#editClientBeneficiaryForm')
        cy.getByDataCy('weight-percentage').clear().type(faker.number.int({min:10, max:49}).toString())
        cy.contains('div','Save & Close').click().wait(2000)
        cy.contains('The Beneficiary has been updated.')
    })
    
    it('Deletes UBO', ()=>{
        cy.visit(location).wait(2000)
        cy.get('#gridClientBeneficiary .dx-icon-trash').should('be.visible').eq(0).click({force:true})
        cy.contains('Yes').click().wait(2000)
        cy.contains('The beneficiary has been deleted.')
    })

    it('Deletes Authorized Person', ()=>{
        navigateToClientMenu('Corporate')
        cy.get('.left-secondary-menu .left-menu-items.main-menu li>sa-menu-item>a').contains('span', 'Shareholders/Partners').click();
        cy.get('#gridClientShareholders .dx-icon-trash').should('be.visible').eq(0).click({force:true}).wait(1000)
        cy.contains('Yes').click().wait(1000)
        cy.contains('Shareholder has been deleted.')
    })

})