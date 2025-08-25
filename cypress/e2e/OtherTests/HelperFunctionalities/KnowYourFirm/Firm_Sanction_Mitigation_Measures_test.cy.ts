//THIS TEST IS NO LONGER VALID AS THIS FUNCTIONALITY HAS BEEN REMOVED

/**
 * @testSuite Firm Sanction Mitigation Measures
 * @description This suite is skipped because the related functionality has been removed from the system.
 * @priority Low
 * @owner QA Team
 * @tags firm, sanctions, mitigation, deprecated
 */

describe.skip('Firm Sanction Mitigation Measures', ()=>{

    beforeEach(()=>{
        cy.visit('/settings/firm-sanction-mitigation-measures').wait(2000)
    })

    /**
     * @scenario Add Firm Sanction Mitigation Measure
     * @description Adds a new sanction mitigation measure with regulation group and related selections
     * @steps
     *  1. Navigate to Firm Sanction Mitigation Measures.
     *  2. Click "Add".
     *  3. Enter Name.
     *  4. Select Regulation Group.
     *  5. Select related checkboxes.
     *  6. Save the record.
     * @expectedResult A new firm sanction mitigation measure is added with a confirmation message.
     */
    it('Adds a Firm Sanction Mitigation Measure', ()=>{

        cy.contains('sa-button','Add').click().wait(1000)
        cy.getByFormControlName('name').eq(0).type('Sanction Mitigation Measure DKA')

        //regulation group
        cy.get('dx-drop-down-box').eq(0).click().wait(500)
        cy.get('#dynamicSelectBoxDropdownGrid').find('.dx-datagrid-rowsview').find('tr > td').first().click().wait(500)

        cy.get('dx-drop-down-box').eq(1).click().wait(500)
        cy.get('[aria-rowindex="1"] > .dx-command-select > .dx-widget > .dx-checkbox-container > .dx-checkbox-icon').click({force:true}).wait(500)

        cy.get('#addFirmMitigationActionForm [icon="save"]').eq(0).click().wait(1000)

        cy.contains('The Firm Mitigation Measure has been added').wait(1000)
    })

    /**
     * @scenario Edit Firm Sanction Mitigation Measure
     * @description Modifies the name of an existing sanction mitigation measure
     * @steps
     *  1. Filter the grid by Name.
     *  2. Click the Edit icon.
     *  3. Update the Name.
     *  4. Save changes.
     * @expectedResult The record is updated and a confirmation message appears.
     */
    it('Edits a firm sanction mitigation measure', ()=>{
        cy.get('#gridFirmSanctionMitigationActions tr .dx-first-cell .dx-texteditor-input').type('Sanction Mitigation Measure DKA', {force:true}).wait(2000)
        cy.get('.dx-icon-edit').first().click({force:true}).wait(1000)

        cy.getByFormControlName('name').eq(1).type(' Edited')
        cy.get('#editFirmMitigationActionForm [icon="save"]').eq(0).click().wait(1000)

        cy.contains('The Firm Mitigation Measure has been modified').wait(1000)
    })

    /**
     * @scenario Delete Firm Sanction Mitigation Measure
     * @description Removes an existing firm sanction mitigation measure
     * @steps
     *  1. Filter the grid by Name.
     *  2. Click the Trash icon.
     *  3. Confirm deletion.
     * @expectedResult The record is deleted and a confirmation message appears.
     */
    it('should delete a firm mitigation', () => {
        cy.get('#gridFirmSanctionMitigationActions tr .dx-first-cell .dx-texteditor-input').type('Sanction Mitigation Measure DKA', {force:true}).wait(2000)
        cy.get('.dx-icon-trash').first().click({force:true}).wait(1000)
        cy.get('.dx-overlay-content').contains('Yes').click({force:true}).wait(500)
        cy.contains('The firm mitigation measure has been deleted').wait(1000)
    });

})

