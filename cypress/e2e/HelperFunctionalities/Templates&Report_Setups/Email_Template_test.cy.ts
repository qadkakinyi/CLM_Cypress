
describe('Email Template', ()=>{
    
    //to run this run the previous test 'email intro and endings' which is needed 

    it('Adds an Email Template', ()=>{
        cy.visit('/settings/email-templates').wait(2000)
        cy.contains('sa-button','Add').click().wait(1000)
        cy.getByFormControlName('subject').type('Test Template DKA')
        
        cy.get('dx-drop-down-box').eq(0).click().wait(500)
        cy.get('#dynamicSelectBoxDropdownGrid .dx-datagrid-rowsview .dx-datagrid-content tr td').contains('Test DKA').click({force:true}).wait(500)

        cy.get('ngx-editor div div').type('Good afternoon, ...')
        
        cy.get('#addEmailTemplateForm > .custom-backround-transparent > .row > .col > [icon="save"] > .sa-button').click().wait(1000)

        cy.contains('Email Template has been added').wait(1000)
    })

    it('Edits an Email Template', () => {
        cy.visit('/settings/email-templates').wait(2000)
        cy.get('#gridCustomFields tr .dx-first-cell .dx-texteditor-input').type('Test Template DKA', {force:true}).wait(2000)
        cy.get('#gridCustomFields tr td').find('.fa-angle-double-right').eq(0).click({force:true}).wait(2000)

        cy.get('ngx-editor div div').clear().wait(1000).type('Good afternoon, ...')

        cy.getBySel('saveAndCloseButton').click().wait(1000)

        cy.contains(`Email template has been updated.`).wait(1000)
    })

    it('Deletes an Email Template', () => {
        cy.visit('/settings/email-templates').wait(2000)
        cy.get('#gridCustomFields tr .dx-first-cell .dx-texteditor-input').type('Test Template DKA', {force:true}).wait(2000)
        cy.get('#gridCustomFields tr td').find('.fa-angle-double-right').eq(0).click({force:true}).wait(1000)

        cy.contains('sa-button', 'Delete').click().wait(500)

        cy.get('#bot2-Msg1').click({force: true}).wait(1000);

        cy.contains(`Email template has been deleted.`).wait(1000)
    })
    
    it('Deletes an Intro And Ending', () => {
        cy.visit('/settings/intro-endings').wait(2000)
        cy.get('#gridIntroEndings tr .dx-first-cell .dx-texteditor-input').type('Test DKA', {force:true}).wait(2000)
        cy.get('#gridIntroEndings tr td').find('.fa-angle-double-right').eq(0).click({force:true}).wait(1000)

        cy.contains('sa-button', 'Delete').click().wait(500)

        cy.get('#bot2-Msg1').click({force: true}).wait(1000);

        cy.contains(`The intro ending has been deleted.`).wait(1000)
    })

})