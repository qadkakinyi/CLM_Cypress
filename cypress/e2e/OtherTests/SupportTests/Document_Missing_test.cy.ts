import {navigateToNewestClientMenu} from "../../../support/e2e";

describe('Missing Document', ()=>{
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