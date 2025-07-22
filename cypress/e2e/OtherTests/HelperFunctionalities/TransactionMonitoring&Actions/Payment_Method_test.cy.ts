import {faker} from "@faker-js/faker";

describe('Payment Methods', ()=>{
    
    beforeEach(()=>{
        cy.visit('/settings/payment-methods').wait(2000)
    })
    
    it('Adds a Payment Method', ()=>{
       
        cy.contains('sa-button','Add').click().wait(1000)
        cy.getByFormControlName('name').type('DKA Bank')
        cy.getByFormControlName('mappingReference').type(faker.string.alphanumeric(11))
        cy.getByDataCy('history-record-type').click().wait(500)
        cy.contains('Backwards').click().wait(1000)
        cy.getByDataCy('time-frame').click().wait(500)
        cy.contains('SixMonths').click()
        cy.getByDataCy('save-method').click().wait(1000)
        cy.contains('The payment method has been added')
    })

    it('Edits a Payment Method', ()=>{

        cy.get('#gridPaymentMethods tr .dx-first-cell .dx-texteditor-input').type('DKA Bank', {force:true}).wait(2000)
        cy.get('#gridPaymentMethods .dx-icon-chevrondoubleright').first().click({force:true}).wait(1000)

        cy.get('#editPaymentMethodForm')
        cy.getByFormControlName('name').eq(0).clear().type('Bank DKA')

        cy.getBySel('saveAndCloseButton').click().wait(2000)
        cy.contains('The payment method has been updated')
    })

    it('Deletes a Payment Method', ()=>{

        cy.get('#gridPaymentMethods tr .dx-first-cell .dx-texteditor-input').type('Bank DKA', {force:true}).wait(2000)
        cy.get('#gridPaymentMethods .dx-icon-chevrondoubleright').first().click({force:true}).wait(1000)

        cy.contains('sa-button', 'Delete').click().wait(1000)
        cy.get('.MessageBoxButtonSection').contains('button', 'Yes').click()

        cy.contains(`The payment method has been deleted.`)
    })
})