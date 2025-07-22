describe('Side-menu Visibility', ()=>{
    it('Checks if side-menu Is visible on login', ()=>{
        cy.get('.left-menu').should('be.visible')
        cy.contains('Dashboard')
    })
})