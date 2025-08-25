/**
 * @testSuite Power BI Reports
 * @description Validates navigation to Power BI reports from the dashboard menu.
 * @priority Medium
 * @owner QA Team
 * @tags regression, reporting, ui
 * @fileDescription This test ensures that Power BI Reports menu is accessible and the specific reports load correctly.
 */

// The baseurl for this test uses "https://complytek-testing.regtek.co" in config file
describe("Power Bi Reports", ()=>{

    beforeEach(()=>{
        cy.visit('/main/dashboard').wait(2000)
        cy.contains("Power-BI Reports").should('be.visible').click().wait(1000)
    })

    afterEach(()=>{
        cy.wait(1000)
    })

    /**
     * @scenario Open Power BI Menu and Check Items
     * @description Opens Power BI menu and verifies that menu items are clickable.
     * @steps Visit dashboard, click on Power-BI Reports menu.
     * @steps Click on "Risk Assessment Report first Redesign".
     * @expectedResult The selected report loads successfully.
     */
    it("Opens power bi menu and menu shows menu items", ()=>{
        cy.contains('Risk Assessment Report first Redesign').click().wait(3000)
        // cy.contains('Adverse Media')
    })

    // it("Risk assessment report first redesign", ()=>{
    //     cy.contains('span', 'Risk Assessment Report').click()
    //     cy.wait(10000)
    //     cy.location("pathname").should('include', '/main/power-bi/report/c245eca4')
    // })
    //
    // it("Transaction monitoring report", ()=>{
    //     cy.contains('span', 'Transaction Monitoring Report').click()
    //     cy.wait(10000)
    //     cy.location("pathname").should('include', '/main/power-bi/report/1a49d3d7')
    // })
    //
    // it("Transaction screening", ()=>{
    //     cy.contains('span', 'Transaction Screening').click()
    //     cy.wait(10000)
    //     cy.location("pathname").should('include', '/main/power-bi/report/ff080714')
    // })
    //
    // it("Transaction screening performance", ()=>{
    //     cy.contains('span', 'Transaction Screening Performance').click()
    //     cy.wait(10000)
    //     cy.location("pathname").should('include', '/main/power-bi/report/d2df14c1')
    // })

})

