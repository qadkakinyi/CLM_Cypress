describe('Click on navigation menu of RegTek', () => {
  it('Start clicking on navigation items', () => {
    cy.login("systemadmin", "Password1!")
    cy.get('ul.main-menu>li>sa-menu-item>a').click({ multiple: true });
  })
})
