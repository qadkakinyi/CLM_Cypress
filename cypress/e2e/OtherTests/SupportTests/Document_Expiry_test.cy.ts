/**
 * @testSuite Expired Documents Counter Validation
 * @description Verifies that the dashboard's "Expired Documents" counter matches the actual expiry status of each listed document.
 * @priority Medium
 * @owner QA Team
 * @tags regression, dashboard, documents, data-validation
 * @dependencies cypress, navigateToNewestClientMenu
 * @fileDescription Reads the expired documents count, opens the grid, and for each row compares its expiry date against today's date to validate correctness.
 */

import {navigateToNewestClientMenu} from "../../../support/e2e";

let today = new Date()
describe('Check If Expired Documents Counter Is Valid', () => {

    /**
     * @scenario Validate Each Expired Document Row
     * @description When the expired documents counter is greater than zero, iterates through each row in the grid and verifies the expiry date is before today; throws an error if any item is not yet expired.
     * @priority Medium
     * @steps
     * 1) Wait for dashboard to stabilize.
     * 2) Read the counter from #expiredDocuments.
     * 3) If counter > 0, open the expired documents view.
     * 4) For each row: capture document name and expiry date.
     * 5) Compute date difference (expiry - today) in days.
     * 6) Log "has expired" when difference < 0; throw if difference > 0.
     * @expectedResult All listed items are truly expired (expiry date earlier than today). Any non-expired item fails the test.
     */
    it('Checks each document to confirm if the current date exceeds expiry date', () => {
        cy.wait(2000)

        cy.get('#expiredDocuments > .card-body > p > span').then(el => {
            let no_of_expiredDocuments = el.text()

            cy.log(`no_of expired documents: `+ no_of_expiredDocuments)

            if (no_of_expiredDocuments > 0) {
                cy.get('#expiredDocuments').click().wait(2000)

                for(let docIndex = 0; docIndex <= no_of_expiredDocuments -1 ; docIndex++ ){
                    let document_name = '';
                    let expiry_date = '';


                    cy.get("#gridExpiredDocuments .fa-angle-double-right").should('be.visible').eq(docIndex).then((el) => {
                        //getting the document name
                        cy.get(`#gridExpiredDocuments .dx-datagrid-rowsview table [aria-rowindex="${docIndex+2}"] td`).eq(4).invoke('text').then(text => {
                            document_name = text
                        })

                        //getting the expiry date
                        cy.get(`#gridExpiredDocuments .dx-datagrid-rowsview table [aria-rowindex="${docIndex+2}"] td`).eq(6).invoke('text').then(text => {
                            expiry_date = text

                            // ===== IN CASE YOU WANT TO DRILL IN TO EVERY DOCUMENT =====
                            // cy.wrap(el).click({force: true})
                            // cy.wait(5000)
                            // cy.get('.dx-texteditor-input').eq(1).type(document_name)
                            // cy.get('.dx-texteditor-input').eq(4).type(expiry_date)
                            // cy.wait(2000)
                            // cy.get('.fa-angle-double-right').eq(0).click().wait(2000)

                            let dateDifference = ((new Date(expiry_date)) - today)/(1000*60*60*24)
                            cy.wait(2000)
                            cy.log(`Date difference: ${dateDifference}`)
                            if(dateDifference < 0){
                                cy.log(`${document_name} has expired`)
                            }else if(dateDifference > 0){
                                cy.log(`${document_name} has expired`)
                                throw new Error(` ${document_name} has not yet expired`)
                            }

                            // cy.visit('/main/dashboard').wait(5000)
                            // cy.get('#expiredDocuments').click().wait(2000)
                        })

                    })
                }

            }

        })
    })

})

