
describe('Intro & Endings', ()=>{

    beforeEach(()=>{
        cy.visit('/settings/intro-endings').wait(2000)
    })

    it('Adds an Intro And Ending', ()=>{

        cy.contains('sa-button','Add').click().wait(1000)
        cy.getByFormControlName('name').type('Test DKA')
        cy.getByFormControlName('intro').type('Test Introduction')

        cy.get('ngx-editor div div').type('Test Ending')

        cy.get('#addIntroEndingForm > .custom-backround-transparent > .row > .col > [icon="save"] > .sa-button').click().wait(1000)

        cy.contains('Intro Ending has been added').wait(1000)
    })

    it('Edits an Intro And Ending', () => {

        cy.get('#gridIntroEndings tr .dx-first-cell .dx-texteditor-input').type('Test DKA', {force:true}).wait(2000)
        cy.get('#gridIntroEndings tr td').find('.fa-angle-double-right').eq(0).click({force:true}).wait(1000)

        cy.getByFormControlName('intro').clear().type('Dear Sir/Madam')
        
        cy.getBySel('saveAndCloseButton').click().wait(1000)

        cy.contains(`The intro ending has been updated.`).wait(1000)
    })

    // it('Deletes an Intro And Ending', () => {
    //     cy.visit('/settings/intro-endings').wait(2000)
    //     cy.get('#gridIntroEndings tr .dx-first-cell .dx-texteditor-input').type('Test DKA', {force:true}).wait(2000)
    //     cy.get('#gridIntroEndings tr td').find('.fa-angle-double-right').eq(0).click({force:true}).wait(1000)
    //    
    //     cy.contains('sa-button', 'Delete').click().wait(500)
    //
    //     cy.get('#bot2-Msg1').click({force: true}).wait(1000);
    //
    //     cy.contains(`The intro ending has been deleted.`).wait(1000)
    // })

})