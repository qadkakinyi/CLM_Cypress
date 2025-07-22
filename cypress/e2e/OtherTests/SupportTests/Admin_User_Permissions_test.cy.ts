import {navigateToNewestClientMenu} from "../../../support/e2e";

let menu_items = [
    "Dashboard",
    "Client Management",
    "Transaction Insights",
    "Know Your Firm",
    "Power-BI Reports",
    "Batch Processes",
    "Management",
    "Reports",
    "Settings",
    "Administration",
]

describe('Admin User Permissions', ()=>{
    before(()=>{
        cy.login('Admin', 'Admin1!');
    })
    
    it('Ensures that all expected menu items are visible', ()=>{
        cy.wait(5000)
        menu_items.forEach(item=>{
            cy.contains('sa-menu-item', item).wait(500).should('be.visible')
        })
    })
    
    it('Drills into a client dashboard',()=>{
        let clientName;
        cy.readFile('cypress/fixtures/client_corporate.json').then((data) =>{
            clientName = data.companyName
            navigateToNewestClientMenu(clientName)

            cy.contains('Client Options')
            cy.contains('Dashboard')
            cy.contains('Profile')
        })
        
    })
})