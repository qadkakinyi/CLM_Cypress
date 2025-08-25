/**
 * @testSuite Admin User Permissions
 * @description Validates that an Admin user can see all expected navigation menu items and access a client's dashboard.
 * @priority High
 * @owner QA Team
 * @tags regression, permissions, navigation, client-dashboard
 * @dependencies cypress, navigateToNewestClientMenu, client_corporate.json
 * @fileDescription Confirms that all main menu items are visible for Admin and tests drilling into the most recently created client.
 */

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

    /**
     * @scenario Verify Menu Items Visibility
     * @description Checks that all expected Admin navigation menu items are present and visible.
     * @priority High
     * @steps Wait for page load → iterate menu_items → assert each sa-menu-item with matching text is visible.
     * @expectedResult All menu items are visible to Admin.
     */
    it('Ensures that all expected menu items are visible', ()=>{
        cy.wait(5000)
        menu_items.forEach(item=>{
            cy.contains('sa-menu-item', item).wait(500).should('be.visible')
        })
    })

    /**
     * @scenario Drill Into Client Dashboard
     * @description Reads latest client name from fixture, navigates to it, and validates dashboard tabs.
     * @priority High
     * @steps Read client_corporate.json → get companyName → call navigateToNewestClientMenu(companyName) → assert visibility of "Client Options", "Dashboard", and "Profile".
     * @expectedResult Client dashboard loads with "Client Options", "Dashboard", and "Profile" visible.
     */
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

