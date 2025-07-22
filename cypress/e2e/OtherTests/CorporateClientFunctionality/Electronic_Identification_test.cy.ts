import { navigateToNewestClientMenu} from "../../support/e2e";
describe('Electronic Identification', ()=>{
    it('Checks if the Identity verifications page loads', ()=>{

        let clientName;
        cy.readFile('cypress/fixtures/client_corporate.json').then((data) =>{
            clientName = data.companyName
            navigateToNewestClientMenu(clientName)
        })

        cy.get('.left-secondary-menu .left-menu-items.main-menu li>sa-menu-item>a').contains('span', 'Electronic Identification').click().wait(1000);
        
        cy.contains('h1','Electronic Identifications').scrollIntoView()
        
    })
})