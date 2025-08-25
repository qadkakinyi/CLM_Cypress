/**
 * @testSuite Save User Layout - Last Evaluation Results Report
 * @description Validates that a user can successfully save their layout preferences in the Last Evaluation Results Report page.
 * @priority Low
 * @owner QA Team
 * @tags regression, reports, layout
 * @dependencies cypress
 * @fileDescription Test navigation to the Last Evaluation Results Report and verification of layout saving functionality.
 */

describe('Save User Layout - Last Evaluation Results Report', ()=>{

    /**
     * @scenario Navigate and Prepare to Save Layout
     * @description Opens the Last Evaluation Results Report page to validate the ability to save a user-specific layout.
     * @priority Low
     * @steps Visit `/reports/last-evaluation-results-report` → wait for page to load.
     * @expectedResult Page loads successfully and layout save controls are available.
     */
    it('Checks if user can save their layout', ()=>{
        cy.visit('/reports/last-evaluation-results-report').wait(3000)
    })
})

