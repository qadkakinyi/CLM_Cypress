import {faker} from "@faker-js/faker";
import {navigateToClientMenu, navigateToNewestClientMenu} from "../../support/e2e";

let client_id = '';
describe('Add and Delete Payment Method',()=>{
    before(()=>{
        cy.visit('/settings/payment-methods').wait(2000)
        cy.contains('sa-button','Add').click().wait(1000)
        cy.getByFormControlName('name').type('PayPal Test')
        cy.getByFormControlName('mappingReference').type(faker.string.alphanumeric(11))
        cy.getByDataCy('history-record-type').click()
        cy.contains('Backwards').click().wait(1000)
        cy.getByDataCy('time-frame').click()
        cy.contains('SixMonths').click()
        cy.getByDataCy('save-method').click().wait(1000)
    })
    
    it('Adds a new Payment Method', ()=>{
        let clientName;
        cy.readFile('cypress/fixtures/client_individual.json').then((data) =>{
            clientName = data.individualClientName
            navigateToNewestClientMenu(clientName)
        })

        cy.get('.left-secondary-menu .left-menu-items.main-menu li>sa-menu-item>a').contains('span', 'Payment Methods').click();
        cy.wait(1000)
        
        cy.location('pathname').then((pathname)=>{
            const pathSections = pathname.split('/');
            client_id = pathSections[3]
        })
        
        cy.getByDataCy('add-method').click()
        cy.wait(1000)
        
        cy.getByFormControlName('paymentMethods').click()
        cy.get('#addClientPaymentMethodForm').contains('PayPal Test').click()
        cy.getByDataCy('save-payment-method').click()
        
    })
    
    it('Deletes Payment Method',()=>{
        cy.visit(`/main/client-individual/${client_id}/1/payment-methods`).wait(2000)
        cy.get('.dx-command-edit > span > .dx-template-wrapper > .dx-link > .fa').first().click({force:true})
        cy.wait(500)
        cy.contains('Delete').click()
        cy.contains('Yes').click()
    })
})