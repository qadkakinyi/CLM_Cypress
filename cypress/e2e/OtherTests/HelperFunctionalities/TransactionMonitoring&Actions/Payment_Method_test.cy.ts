import {faker} from "@faker-js/faker";

/**
 * @testSuite Payment Methods
 * @description Covers creation, modification, and deletion of payment methods
 * @priority Medium
 * @owner QA Team
 * @tags payments, configuration, admin
 */

describe('Payment Methods', ()=>{

    beforeEach(()=>{
        cy.visit('/settings/payment-methods').wait(2000)
    })

    /**
     * @scenario Add Payment Method
     * @description Adds a new payment method using a generated mapping reference
     * @steps
     *  1. Navigate to Payment Methods page
     *  2. Click "Add"
     *  3. Fill in name and mapping reference
     *  4. Select history record type and time frame
     *  5. Save the new method
     * @expectedResult The payment method is added successfully
     */
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

    /**
     * @scenario Edit Payment Method
     * @description Updates an existing payment method's name
     * @steps
     *  1. Search for the payment method
     *  2. Expand its details
     *  3. Update the name field
     *  4. Save changes
     * @expectedResult The payment method is updated successfully
     */
    it('Edits a Payment Method', ()=>{

        cy.get('#gridPaymentMethods tr .dx-first-cell .dx-texteditor-input').type('DKA Bank', {force:true}).wait(2000)
        cy.get('#gridPaymentMethods .dx-icon-chevrondoubleright').first().click({force:true}).wait(1000)

        cy.get('#editPaymentMethodForm')
        cy.getByFormControlName('name').eq(0).clear().type('Bank DKA')

        cy.getBySel('saveAndCloseButton').click().wait(2000)
        cy.contains('The payment method has been updated')
    })

    /**
     * @scenario Delete Payment Method
     * @description Deletes an existing payment method after confirming prompt
     * @steps
     *  1. Search for the payment method
     *  2. Expand its details
     *  3. Click Delete and confirm
     * @expectedResult The payment method is deleted successfully
     */
    it('Deletes a Payment Method', ()=>{

        cy.get('#gridPaymentMethods tr .dx-first-cell .dx-texteditor-input').type('Bank DKA', {force:true}).wait(2000)
        cy.get('#gridPaymentMethods .dx-icon-chevrondoubleright').first().click({force:true}).wait(1000)

        cy.contains('sa-button', 'Delete').click().wait(1000)
        cy.get('.MessageBoxButtonSection').contains('button', 'Yes').click()

        cy.contains(`The payment method has been deleted.`)
    })
})

