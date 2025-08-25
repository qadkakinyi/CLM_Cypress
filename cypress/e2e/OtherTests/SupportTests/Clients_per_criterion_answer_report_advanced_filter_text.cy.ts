/**
 * @testSuite Clients Per Criterion Answer Report
 * @description Validates that advanced filters work for the Clients Per Criterion Answer Report, ensuring regulation groups and statuses are populated correctly.
 * @priority High
 * @owner QA Team
 * @tags regression, reports, filters
 * @dependencies cypress
 * @fileDescription Performs filtering steps in the Clients Per Criterion Answer Report and verifies dropdown selections and search functionality.
 */

describe('Clients per criterion answer report', ()=>{
    /**
     * @scenario Apply Filters and Search
     * @description Navigates to the Clients Per Criterion Answer Report, applies Regulation Group, Client Status, and Criterion filters, then performs a search.
     * @priority High
     * @steps
     * 1. Visit `/reports`.
     * 2. Select "Client Evaluations & Documents" from the first dropdown.
     * 3. Select "Clients Per Criterion Answer Report" from the second dropdown.
     * 4. Open and select a Regulation Group from the dropdown.
     * 5. Open and select a Client Status from the dropdown.
     * 6. Select a Criterion from the criterionId grid.
     * 7. Click the "Search" button.
     * @expectedResult The system applies the selected filters and loads the filtered report results.
     */
    it('Performs advanced filter, ensures regulation group and statuses are populated', ()=>{
        cy.visit('/reports').wait(2000)

        cy.get('dx-select-box').eq(0).click()
        cy.contains('Client Evaluations & Documents').click().wait(500)

        cy.get('dx-select-box').eq(1).click()
        cy.contains('Clients Per Criterion Answer Report').click().wait(500)

        // cy.contains('.dx-button', 'Advanced Filter').click().wait(500)
        cy.getByFormControlName('regulationGroup').click()
        cy.get('.dropdown-list').eq(0).find('.item2 li').eq(0).click().wait(500)
        cy.getByFormControlName('regulationGroup').click() // to close the popup

        cy.getByFormControlName('clientStatuses').click()
        cy.get('.dropdown-list').eq(1).find('.item2 li').eq(0).click().wait(500)
        cy.getByFormControlName('clientStatuses').click()

        cy.getByFormControlName('criterionId').click()
        cy.get('dx-data-grid .dx-datagrid-rowsview tr .dx-command-select').eq(0).click().wait(3000)
        cy.getByFormControlName('criterionId').click()

        cy.contains('sa-button', 'Search').click()
    })
})

