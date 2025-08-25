/**
 * @testSuite Handle Screening Process
 * @description Validates that the screening process correctly redirects to the right client dashboard, checks screening status logic, and confirms that the "Cancel" button navigation works.
 * @priority High
 * @owner QA Team
 * @tags regression, processes, screening, navigation
 * @dependencies cypress
 * @fileDescription Covers handling of screening matches, validation of client match, correct screening status display, and navigation behavior from the negative lists screen.
 */

let location = ''

describe('Handle Screening Process', ()=>{

    /**
     * @scenario Redirect from Screening Match to Client Dashboard
     * @description Ensures that when a screening match is selected, the system redirects to the correct client dashboard and the client name matches the one from the screening list.
     * @priority High
     * @steps
     * 1) Visit `/processes/handle-screening`.
     * 2) Get the first match's client name from the grid.
     * 3) Click the link to open the client dashboard.
     * 4) Verify the client name in the dashboard matches the match list.
     * 5) Store the client location path for later tests.
     * @expectedResult The dashboard displays the correct client name matching the screening match record.
     */
    it('Ensures matches redirect to the correct client', ()=>{
        cy.visit('/processes/handle-screening').wait(3000)
        cy.get('tbody tr[aria-rowindex="1"] td[aria-colindex="2"]').eq(0).invoke('text').then((text)=>{
            cy.log(text)
            cy.get('.dx-datagrid-content-fixed > .dx-datagrid-table > tbody > .dx-data-row  .dx-link').eq(0).scrollIntoView().click().wait(7000)
            cy.get('.client-name h2').eq(0).invoke('text').then(text2=>{
                expect(text2.trim()).to.include(text.trim())
            })
            cy.location('pathname').then((loc)=>{
                location = loc
            })
        })
    })

    /**
     * @scenario Verify Screening Status Logic
     * @description Navigates to the negative lists page for the selected client, validates that the screening status displayed matches the expected logic based on the record count.
     * @priority High
     * @steps
     * 1) Replace client dashboard path with `/negative-lists` in the stored location.
     * 2) Retrieve the number of records from the informer count.
     * 3) Compare the screening status and alert text against the business logic.
     * @expectedResult Screening status should reflect record count:
     *                 - If 0 records → Not "Pending Action" or "Match".
     *                 - If > 1 record → Not "No Match".
     */
    it('Checks for correct screening status', ()=>{
        location = location.replace(/\/businessSearchProfile.*/, '/negative-lists')
        cy.visit(location).wait(2000)

        cy.get('.informer > .count').wait(2000).invoke('text').then(recordsCount=>{
            cy.get('sa-info-bar .stat > span').eq(1).invoke('text').then(screeningStatus=>{
                cy.get('app-negative-lists sa-alert span').eq(1).invoke('text').then(resultsFoundAlert=>{
                    cy.log('Screening status: '+resultsFoundAlert)
                    expect(resultsFoundAlert).to.not.equal('Not Applicable')
                })
                if(recordsCount == 0){
                    expect(screeningStatus).to.not.equal('Pending Action')
                    expect(screeningStatus).to.not.equal('Match')
                }else if(recordsCount > 1){
                    expect(screeningStatus).to.not.equal('No Match')
                }
            })
        })
        cy.wait(1500)
    })

    /**
     * @scenario Cancel Button Navigation
     * @description Ensures that pressing the "Cancel" button in a negative list record returns the user back to the same page.
     * @priority Medium
     * @steps
     * 1) Visit the negative lists page for the stored client location.
     * 2) Expand the first negative list record.
     * 3) Click the "Cancel" button.
     * 4) Verify that the current location includes the original path.
     * @expectedResult Cancel action returns to the same negative lists page without unexpected redirects.
     */
    it('Tests `Cancel` button navigation', ()=>{
        cy.visit(location).wait(3000)
        cy.get('#gridNegativeLists .dx-icon-chevrondoubleright').eq(0).click({force:true}).wait(5000)
        cy.contains('sa-action-buttons sa-button', 'Cancel').click().wait(2000)
        cy.location('pathname').then(pathname=>{
            expect(location).to.include(pathname)
        })
    })

})

