/**
 * @testSuite System Settings - Navigation & Visibility
 * @description Validates the System Settings menu: submenu count and page visibility for each item.
 * @priority Medium
 * @owner QA Team
 * @tags regression, navigation, settings, system-settings
 * @dependencies cypress, getByDataCy
 * @fileDescription Opens the System Settings menu to verify submenu length, then iterates through each submenu item to confirm expected page content is visible.
 */

let routes = [
    {index:0, route: '/system-settings/account', assertion: 'Account'},
    {index:1, route: '/system-settings/case-statuses', assertion: 'Case Statuses'},
    {index:2, route: '/system-settings/defaults', assertion: 'Defaults'},
    {index:3, route: '/system-settings/id-verification-data-supports', assertion: 'eIDV Data Supports'},
    {index:4, route: '/system-settings/event-engines-setup', assertion: 'Event Engines Setup'},
    {index:5, route: '/system-settings/languages-setup', assertion: 'Language Setup'},
    {index:6, route: '/system-settings/parameter-queries', assertion: 'Parameter Queries'},
    {index:7, route: '/system-settings/portal-setup', assertion: 'Portal Setup'},
    {index:8, route: '/system-settings/system-logs', assertion: 'System Logs'},
    {index:9, route: '/system-settings/hangfire-details', assertion: 'Last heartbeat'}
]

describe("System Settings", ()=>{
    /**
     * @scenario Open System Settings Menu
     * @description Expands the System Settings menu and validates the number of submenu items.
     * @priority Medium
     * @steps Click data-cy="system-settings-menu" and wait briefly.
     * @expectedResult Submenu has exactly 10 items.
     */
    it("Click system settings menu and opens the submenus", ()=>{

        cy.getByDataCy("system-settings-menu").click().wait(2000).find("ul>li").should("have.length", 10)
    })

    /**
     * @scenario Visit Each System Settings Page
     * @description Pins sidebar if needed, opens System Settings, and clicks each submenu item; verifies expected text for each page.
     * @priority Medium
     * @steps Visit dashboard → (optional) pin sidebar → open System Settings → iterate submenu items with .each() → assert expected text via routes[index].assertion.
     * @expectedResult Each page displays its corresponding assertion text.
     */
    it("Visits each page and asserts if it is visible", ()=>{

        cy.visit("/main/dashboard")

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

        // routes.forEach((route, i)=>{
        cy.getByDataCy("system-settings-menu").scrollIntoView().click()

        cy.get("[data-cy='system-settings-menu'] ul>li").each((el, index)=>{
            cy.wrap(el).click();
            cy.wait(2500)
            // cy.getByDataCy("system-settings-menu").scrollIntoView().click()
            cy.contains(routes[index].assertion)
        })
        // })
    })
})

