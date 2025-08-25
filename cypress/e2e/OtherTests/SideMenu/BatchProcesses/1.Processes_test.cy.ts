/**
 * @testSuite Processes Menu Navigation
 * @description Verifies that the first-level menu items under "Processes" can be toggled for visibility and contain more than four items.
 * @priority Medium
 * @owner QA Team
 * @tags regression, navigation, processes
 * @dependencies cypress, getByDataCy
 * @fileDescription Ensures that expanding the Processes menu displays its first-level list items and validates their count.
 */

describe("Processes Menu", ()=>{

    /**
     * @suite Processes Menu Toggle
     * @description Confirms that the Processes menu can be expanded and its first-level menu items are visible.
     * @prerequisites User is logged in and has access to the Processes menu.
     * @steps Click the Processes menu item.
     * @steps Verify that the first-level menu list items are visible.
     * @steps Ensure that the number of first-level items is greater than four.
     * @expectedResult First-level menu items are visible and contain more than four items.
     * @priority Medium
     */
    it("Toggles first level menu list items visibility", ()=>{

        cy.getByDataCy("processes").click()
        //check if the menu is visible
        cy.getByDataCy("processes-menu-level-1").find("li").should("be.visible").should("have.length.greaterThan", 4)

    })

})

