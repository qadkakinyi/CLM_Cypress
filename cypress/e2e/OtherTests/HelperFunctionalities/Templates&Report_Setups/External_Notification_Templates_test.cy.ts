import {faker} from "@faker-js/faker";

describe('External Notification Templates', ()=>{
    
    beforeEach(()=>{
        cy.visit('/settings/external-notification-templates').wait(2000)
    })
    
    it('Adds an external notification template', ()=>{
        
        cy.get('sa-button[icon="plus"]').click().wait(2000)
        
        cy.getByFormControlName('reference').type(faker.string.alphanumeric(13))
        cy.getByFormControlName('title').type('Test DKA');
        cy.getByFormControlName('description').type('Test description DKA');
        
        //External Credentials Setup
        cy.get('dx-drop-down-box').eq(1).click().wait(500)
        cy.get('.dx-popup-content dx-data-grid').eq(0).find('.dx-datagrid-rowsview tr').eq(0).click().wait(500)

        //External Endpoint Body Template
        cy.get('dx-drop-down-box').eq(2).click().wait(500)
        cy.get('.dx-popup-content dx-data-grid').eq(1).find('.dx-datagrid-rowsview tr').eq(0).click().wait(500)

        //API Method
        cy.get('dx-drop-down-box').eq(3).click().wait(500)
        cy.get('.dx-popup-content dx-data-grid').eq(2).find('.dx-datagrid-rowsview tr').eq(0).click().wait(500)

        cy.get('#addSystemNotificationTemplateForm > .custom-backround-transparent > .row > .col > [icon="save"] > .sa-button').click().wait(1000)
        cy.contains('The system notification template has been added').wait(1500)
    })
    
    it('checks if notification type is `External` and edits the template title', ()=>{
        cy.get('.dx-first-cell .dx-texteditor-input-container > .dx-texteditor-input').type('Test DKA').wait(2000)
        cy.get('.fa-angle-double-right').eq(1).click({force:true}).wait(2000)
        
        cy.get('dx-drop-down-box .dx-texteditor-input').eq(1).should('have.value','External')
        
        cy.getByFormControlName('title').type(' Edited')
        cy.get('[primary-buttons=""] > [icon="save"] > .sa-button').click().wait(1000);
        cy.contains('The system notification template has been updated').wait(2000)
    })
    
    it('Delete a notification template', ()=>{
        cy.get('.dx-first-cell .dx-texteditor-input-container > .dx-texteditor-input').type('Test DKA Edited').wait(2000)
        cy.get('.fa-angle-double-right').eq(1).click({force:true}).wait(2000)

        cy.get('[icon="trash"]').click().wait(500);
        cy.get('#bot2-Msg1').click({force: true}).wait(1000);
        cy.contains('External notification template has been deleted')
    })
})