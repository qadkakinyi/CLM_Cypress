let menu_items = [
    "Dashboard",
    "Know Your Clients",
    "Know Your Transactions",
    "My Tasks",
    "Know Your Firm",
    "Power-BI Reports",
    "Processes",
    "Management",
    "Reports/Lists",
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
})