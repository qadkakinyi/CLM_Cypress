import {navigateToNewestClientMenu} from "../../../support/e2e";

describe('Check AI Screening Match Status', ()=> {
    it('Check if Butterfly screening processor ran for the client', () => {
        let clientName;
        cy.readFile('cypress/fixtures/client_individual.json').then((data) => {
            clientName = data.individualClientName
            navigateToNewestClientMenu(clientName)
            // navigateToNewestClientMenu("Garcia")
        })
        cy.get('.left-secondary-menu .left-menu-items.main-menu li>sa-menu-item>a').contains('Screening').scrollIntoView().click();
        cy.wait(1000)

        // left sidebar check - screening
        cy.get('.sa-info-box.screening span').invoke('text').then(text => {
            if (text.includes('Pending Action')){
                cy.log('still waiting for processing...')
            }else{
                cy.wait(1000)
                cy.get('[title="AI Decision Available"]').then($imgs=>{
                    cy.get('#gridNegativeLists .informer .count').invoke('text').then(val =>{
                        //checking if there were possible matches
                        if (Number(val)>0){
                            expect($imgs.length).to.be.greaterThan(1)
                            
                            cy.get('.dx-icon-chevrondoubleright').eq(0).click({force:true}).wait(3000)
                            //also in the specific possible match there is the `AI decision` image
                            cy.get('[title="AI Decision Available"]')
                            cy.contains('.tabs-left','Internal Notes').scrollIntoView().click()
                            cy.contains('AI Decision Reasoning')
                            cy.contains('External User')
                        }
                    })
                })
            }
        })
        
        
    })
})