/**
 * @testSuite Missing Document Verification
 * @description Confirms that a document is marked as missing when its collection status is "Missing" or its expiration date has passed.
 * @priority Medium
 * @owner QA Team
 * @tags regression, documents, validation, client-profile
 * @dependencies cypress, navigateToNewestClientMenu, client_individual.json
 * @fileDescription Navigates to the newest client’s Documents, opens a document, and validates missing-state rules against status and expiry date.
 */

import {navigateToNewestClientMenu} from "../../../support/e2e";

describe('Missing Document', ()=>{
    /**
     * @scenario Validate Missing Document Conditions
     * @description Loads the newest client, opens the Documents section, inspects the first document, and verifies that it is considered missing if collection status is "Missing" or the expiration date is in the past.
     * @priority Medium
     * @steps
     * 1) Read client name from fixture and navigate to the client dashboard.
     * 2) If the "Documents" status box exists, open it and expand the first document.
     * 3) Read collection status and expiration date.
     * 4) Compute (expiry - today) in days.
     * 5) Assert missing when status === "Missing" OR dateDifference < 0; otherwise fail.
     * @expectedResult The document is flagged as missing only under the defined conditions.
     */
    it('Check missing document to be correctly missing', ()=>{
        // A missing document is considered missing if
        // collection status is `missing` or expiration date is due
        let clientName;
        cy.readFile('cypress/fixtures/client_individual.json').then((data) =>{
            clientName = data.individualClientName
            navigateToNewestClientMenu(clientName)
        })

        cy.get('.row').then(row=>{
            if(row.find('sa-status-box[title="Documents"]').length > 0){
                cy.get('sa-status-box[title="Documents"]').click().wait(2000)

                cy.get('#gridClientDocuments .fa-angle-double-right').eq(0).click({ force: true }).wait(2000);

                // collection status check
                let collectionStatus ;
                cy.get('#collectionStatusesList dx-drop-down-box input').eq(1).invoke('val').then(status=>{
                    cy.log('status '+status)
                    collectionStatus = status


                    cy.getByFormControlName('expirationDate').invoke('val').then(expiryDate=>{
                        let today = new Date()
                        let dateDifference = ((new Date(expiryDate)) - today)/(1000*60*60*24)
                        if(status == 'Missing' || dateDifference < 0){
                            cy.log('Works Well')
                        }else{
                            throw new Error(`Conditions not met`)
                        }
                    })
                })


            }else{
                cy.log(`InVisible`)
            }
        })


    })
})

