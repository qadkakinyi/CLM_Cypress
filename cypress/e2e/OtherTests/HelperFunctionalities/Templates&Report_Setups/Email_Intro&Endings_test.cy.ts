/**
 * @testSuite Intro & Endings
 * @description Covers adding and editing intro and ending templates used in the system
 * @priority Medium
 * @owner QA Team
 * @tags intro-endings, templates
 */

describe('Intro & Endings', ()=>{

    beforeEach(()=>{
        cy.visit('/settings/intro-endings').wait(2000)
    })

    /**
     * @scenario Add Intro And Ending
     * @description Adds a new intro and ending template
     * @steps
     *  1. Navigate to Intro & Endings settings page.
     *  2. Click "Add".
     *  3. Enter Name.
     *  4. Enter Intro text.
     *  5. Enter Ending text.
     *  6. Save the record.
     * @expectedResult Intro & Ending record is added and a confirmation message is shown.
     */
    it('Adds an Intro And Ending', ()=>{

        cy.contains('sa-button','Add').click().wait(1000)
        cy.getByFormControlName('name').type('Test DKA')
        cy.getByFormControlName('intro').type('Test Introduction')

        cy.get('ngx-editor div div').type('Test Ending')

        cy.get('#addIntroEndingForm > .custom-backround-transparent > .row > .col > [icon="save"] > .sa-button').click().wait(1000)

        cy.contains('Intro Ending has been added').wait(1000)
    })

    /**
     * @scenario Edit Intro And Ending
     * @description Edits the intro text of an existing intro & ending template
     * @steps
     *  1. Search for the template by Name.
     *  2. Click to open details.
     *  3. Update the Intro text.
     *  4. Save and close.
     * @expectedResult The intro text is updated and a confirmation message is shown.
     */
    it('Edits an Intro And Ending', () => {

        cy.get('#gridIntroEndings tr .dx-first-cell .dx-texteditor-input').type('Test DKA', {force:true}).wait(2000)
        cy.get('#gridIntroEndings tr td').find('.fa-angle-double-right').eq(0).click({force:true}).wait(1000)

        cy.getByFormControlName('intro').clear().type('Dear Sir/Madam')

        cy.getBySel('saveAndCloseButton').click().wait(1000)

        cy.contains(`The intro ending has been updated.`).wait(1000)
    })

    /**
     * @scenario Delete Intro And Ending
     * @description Deletes an existing intro & ending template
     * @steps
     *  1. Navigate to Intro & Endings settings page.
     *  2. Search for the template by Name.
     *  3. Open details.
     *  4. Click Delete and confirm.
     * @expectedResult The template is deleted and a confirmation message is shown.
     */
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

