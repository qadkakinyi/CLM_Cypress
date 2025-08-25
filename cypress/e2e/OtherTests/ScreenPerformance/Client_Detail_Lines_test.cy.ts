import {navigateToClientMenu} from "../../../support/e2e";

/**
 * @testSuite Client Detail Lines - Performance Navigation
 * @description Validates that navigating across all client detail lines triggers a loader that then disappears quickly, indicating data loaded successfully.
 * @priority Medium
 * @owner QA Team
 * @tags performance, navigation, clients, ui
 * @dependencies cypress, navigateToClientMenu
 * @fileDescription Smoke-style performance check for client detail sections using the left secondary menu.
 */

describe('Client Detail Lines Performance', ()=>{
    /**
     * @suite Client Detail Lines Performance
     * @description Iterates over each client detail menu entry and verifies spinner behavior.
     * @prerequisites User is logged in and can access the Clients → Individual area.
     * @prerequisites Left secondary menu is visible; loader uses selector ".sk-ball-spin-clockwise".
     */

    /**
     * @scenario Navigate and Verify Loaders
     * @description Clicks each client detail line, expects the loader to appear, then confirms it is not visible shortly after.
     * @priority Medium
     * @steps Use helper to navigate to the Clients section for "Individual".
     * @steps Iterate through each left-menu item and click it.
     * @steps Confirm loader appears, wait 2 seconds, then assert loader is not visible.
     * @expectedResult Each detail page loads and the spinner becomes not visible within the test window (≤ 2s; under a 10s budget).
     */
    it('should navigate to each client detail line within 10 seconds', () => {
        // Click on Know your Clients navigation item
        navigateToClientMenu('Individual')

        cy.get('.left-secondary-menu .left-menu-items.main-menu li>sa-menu-item>a').each((el, index, list)=>{
            cy.wrap(el).click();
            //expect loader to exist
            cy.get('.sk-ball-spin-clockwise')
            cy.wait(2000)
            // after this 2 seconds the data should have loaded and spinner should not be visible
            cy.get('.sk-ball-spin-clockwise').should(`not.be.visible`)
        })
    });
})

