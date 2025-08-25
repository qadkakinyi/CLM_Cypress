/**
 * @testSuite Sub-group Values Match
 * @description Validates that the sub-group value under Screening Possible Matches in the Main Dashboard's "Actions for Review" matches the corresponding value in the client profile.
 * @priority High
 * @owner QA Team
 * @tags screening, profile, regression
 * @dependencies cypress
 * @fileDescription Compares sub-group values between Screening Pending Actions and the client profile to ensure consistency.
 */

let sub_group_name = '';

describe('Sub-group values Match', ()=>{

    /**
     * @scenario Verify Sub-group Value Consistency
     * @description Checks if the sub-group value from Screening Possible Matches (Actions for Review) matches the sub-group value in the client profile.
     * @priority High
     * @steps
     *  1. Wait for the dashboard to load.
     *  2. Click on the "Screening Actions for Review" card.
     *  3. Retrieve the sub-group name from the pending actions table.
     *  4. Open the first client record from the list.
     *  5. Navigate to the "Profile" section.
     *  6. Assert that the sub-group value matches the retrieved one.
     * @expectedResult The sub-group value in the client profile matches the one displayed in the Screening Pending Actions list.
     */
    it('checks if subgroup values under screening possible matches (Main Dashboard - Actions for review) match the values in the profile', ()=>{
        cy.wait(2000)

        cy.get('#screeningActionsForReview').click().wait(2500)

        cy.get(`#gridScreeningPendingActions .dx-datagrid-rowsview table [aria-rowindex="2"] td`).eq(9).invoke('text').then(text => {
            sub_group_name = text.trim()

            cy.log('SubGroup '+sub_group_name)
            cy.get("#gridScreeningPendingActions .fa-angle-double-right").eq(0).click({force:true}).wait(4000)

            cy.get('.left-secondary-menu .left-menu-items.main-menu li>sa-menu-item>a').contains('span', 'Profile').click().wait(4000);

            cy.get('app-profile #editProfileForm .row').eq(5).find( 'dx-drop-down-box input').eq(1).should('have.value', sub_group_name)
        })
    })
})

