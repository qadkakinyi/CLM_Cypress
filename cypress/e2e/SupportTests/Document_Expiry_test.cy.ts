import {navigateToNewestClientMenu} from "../../support/e2e";

let today = new Date()
describe('Check If Expired Documents Counter Is Valid', () => {
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