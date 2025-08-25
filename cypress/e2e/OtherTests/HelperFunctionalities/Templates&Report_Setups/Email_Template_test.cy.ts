/**
 * @testSuite Email Template
 * @description Covers creation, modification, and deletion of email templates and associated intro/endings
 * @priority Medium
 * @owner QA Team
 * @tags email, template, intro-ending
 * @dependencies intro-endings test, faker-js
 */

describe('Email Template', () => {

    //to run this run the previous test 'email intro and endings' which is needed

    /**
     * @scenario Add Email Template
     * @description Creates a new email template linked to an intro/ending
     * @steps
     *  1. Navigate to Email Templates settings.
     *  2. Click "Add" and fill in subject.
     *  3. Select the intro/ending from dropdown.
     *  4. Enter email body text.
     *  5. Save the template.
     * @expectedResult Email template is saved and success message is displayed.
     */
    it('Adds an Email Template', () => {
        cy.visit('/settings/email-templates').wait(2000)
        cy.contains('sa-button', 'Add').click().wait(1000)
        cy.getByFormControlName('subject').type('Test Template DKA')

        cy.get('dx-drop-down-box').eq(0).click().wait(500)
        cy.get('#dynamicSelectBoxDropdownGrid .dx-datagrid-rowsview .dx-datagrid-content tr td')
            .contains('Test DKA').click({ force: true }).wait(500)

        cy.get('ngx-editor div div').type('Good afternoon, ...')

        cy.get('#addEmailTemplateForm > .custom-backround-transparent > .row > .col > [icon="save"] > .sa-button')
            .click().wait(1000)

        cy.contains('Email Template has been added').wait(1000)
    })

    /**
     * @scenario Edit Email Template
     * @description Updates the content of an existing email template
     * @steps
     *  1. Filter for the specific email template.
     *  2. Open its detail view.
     *  3. Update the email body content.
     *  4. Save the changes.
     * @expectedResult Template is updated and confirmation message appears.
     */
    it('Edits an Email Template', () => {
        cy.visit('/settings/email-templates').wait(2000)
        cy.get('#gridCustomFields tr .dx-first-cell .dx-texteditor-input')
            .type('Test Template DKA', { force: true }).wait(2000)
        cy.get('#gridCustomFields tr td').find('.fa-angle-double-right').eq(0)
            .click({ force: true }).wait(2000)

        cy.get('ngx-editor div div').clear().wait(1000).type('Good afternoon, ...')

        cy.getBySel('saveAndCloseButton').click().wait(1000)

        cy.contains(`Email template has been updated.`).wait(1000)
    })

    /**
     * @scenario Delete Email Template
     * @description Deletes the selected email template
     * @steps
     *  1. Filter for the email template.
     *  2. Open its detail view.
     *  3. Click delete and confirm.
     * @expectedResult Email template is deleted and confirmation message is shown.
     */
    it('Deletes an Email Template', () => {
        cy.visit('/settings/email-templates').wait(2000)
        cy.get('#gridCustomFields tr .dx-first-cell .dx-texteditor-input')
            .type('Test Template DKA', { force: true }).wait(2000)
        cy.get('#gridCustomFields tr td').find('.fa-angle-double-right').eq(0)
            .click({ force: true }).wait(1000)

        cy.contains('sa-button', 'Delete').click().wait(500)

        cy.get('#bot2-Msg1').click({ force: true }).wait(1000);

        cy.contains(`Email template has been deleted.`).wait(1000)
    })

    /**
     * @scenario Delete Intro And Ending
     * @description Deletes the intro and ending linked to an email template
     * @steps
     *  1. Navigate to Intro & Endings settings.
     *  2. Filter for the specific intro/ending.
     *  3. Open detail view and delete.
     *  4. Confirm deletion.
     * @expectedResult Intro and ending record is deleted and confirmation message appears.
     */
    it('Deletes an Intro And Ending', () => {
        cy.visit('/settings/intro-endings').wait(2000)
        cy.get('#gridIntroEndings tr .dx-first-cell .dx-texteditor-input')
            .type('Test DKA', { force: true }).wait(2000)
        cy.get('#gridIntroEndings tr td').find('.fa-angle-double-right').eq(0)
            .click({ force: true }).wait(1000)

        cy.contains('sa-button', 'Delete').click().wait(500)

        cy.get('#bot2-Msg1').click({ force: true }).wait(1000);

        cy.contains(`The intro ending has been deleted.`).wait(1000)
    })

})

