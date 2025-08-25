/**
 * @testSuite Administration Module - Navigation
 * @description Validates the Administration menu navigation: ensuring menu visibility, opening menu items, and verifying pages load without visible loaders.
 * @priority Medium
 * @owner QA Team
 * @tags regression, navigation, administration, ui
 * @dependencies cypress, getByDataCy
 * @fileDescription Tests core navigation flows in the Administration section from the main dashboard.
 */

describe("Administration", ()=>{

    /**
     * @suite Administration Menu Setup
     * @description Ensures the main sidebar is pinned and the Administration menu is expanded before each scenario.
     * @prerequisites User is logged in and can access the dashboard.
     * @steps Visit /main/dashboard.
     * @steps If the unpin icon is visible in the sidebar, click it to pin the menu.
     * @steps Click the Administration menu.
     * @expectedResult Administration menu is visible and ready for interaction.
     * @priority Medium
     */
    beforeEach(()=>{
        cy.visit('/main/dashboard')
        // pin the main sidebar
        cy.get('aside').then(el =>{
            let unpin_icon = el.find('.dx-icon-unpin')

            //check if unpin icon is visible
            if (unpin_icon.length > 0){
                cy.wrap(unpin_icon).click().wait(1000)
            }else{
                cy.log('Unpin icon missing')
            }
        })

        cy.getByDataCy("administration-menu").should("be.visible").click()
    })

    /**
     * @scenario View Administration Menu List
     * @description Expands the Administration menu and confirms that the submenu list items are visible.
     * @priority Medium
     * @steps Expand Administration menu.
     * @expectedResult All submenu list items are visible.
     */
    it("Opens the menu list under administration", ()=>{
        cy.getByDataCy("administration-menu").find("ul>li").should("be.visible")
    })

    /**
     * @scenario Open Account Section
     * @description Opens the "Account" section from the Administration menu and validates page load.
     * @priority Medium
     * @steps Click first menu item under Administration.
     * @steps Verify path equals "/administration/account".
     * @steps Verify "Active Users" content is present.
     * @steps Ensure loader ".sk-ball-spin-clockwise" is not visible.
     * @expectedResult Account page loads successfully and shows active users without visible loader.
     */
    it("Opens Account", ()=>{
        cy.getByDataCy("administration-menu").find("ul>li").eq(0).click()
        cy.location("pathname").should("equal", "/administration/account")
        cy.get('#activeUsers')
        cy.contains("Active Users")
        cy.get('.sk-ball-spin-clockwise').should(`not.be.visible`)
    })

    /**
     * @scenario Open Release Notes
     * @description Opens the "Release Notes" section from the Administration menu and validates page load.
     * @priority Medium
     * @steps Click second menu item under Administration.
     * @steps Verify path equals "/administration/release-notes".
     * @steps Verify "Release Notes" text is present.
     * @steps Ensure loader ".sk-ball-spin-clockwise" is not visible.
     * @expectedResult Release Notes page loads successfully without visible loader.
     */
    it("Opens release notes", ()=>{
        cy.getByDataCy("administration-menu").find("ul>li").eq(1).click()
        cy.location("pathname").should("equal", "/administration/release-notes")
        cy.contains("Release Notes")
        cy.get('.sk-ball-spin-clockwise').should(`not.be.visible`)
    })

})

