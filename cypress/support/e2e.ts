// ***********************************************************
// This example support/e2e.ts is processed and
// loaded automatically before your test files.
//
// This is a great place to put global configuration and
// behavior that modifies Cypress.
//
// You can change the location of this file or turn off
// automatically serving support files with the
// 'supportFile' configuration option.
//
// You can read more here:
// https://on.cypress.io/configuration
// ***********************************************************

// When a command from ./commands is ready to use, import with `import './commands'` syntax
import '@percy/cypress';

import './commands';
// import fs from 'fs-extra'
Cypress.on('uncaught:exception', (err, runnable, promise) => {
  // returning false here prevents Cypress from failing the test
  return false
})

// before(() => {
//   cy.login('admin', 'Admin1!');
// })

before(() => {
    cy.login('systemadmin', 'Password1!');
})
// beforeEach(() => {
//   Cypress.on('window:before:load', (win) => {
//     cy.spy(win.console, 'error');
//   });
// })

// afterEach(() => {
//   cy.window().then((win) => {
//     let errorMessage = win.console.error.toString();
//
//     expect(!(errorMessage.includes('not defined') || errorMessage.includes('400') || errorMessage.includes('500')));
//   });
// });


// export let  images_folder = {
//     name: ''
// }
//
// let screenshotsDir =`cypress/screenshots/All/${images_folder.name}`
//
// export function deleteFolder(){
//     return fs.remove(screenshotsDir)
// }

export function filterClientType(type:string){
    cy.wait(1500)
    cy.get('#gridClients .dx-datagrid-headers  .dx-datagrid-filter-row>[aria-colindex="2"] .dx-button-content').eq(0).click()
    cy.wait(500).get('.dx-scrollview-content').contains(type).click().wait(2000)
}

export function navigateToClientMenu(type:string){
    cy.visit('main/clients').wait(2000);
    cy.get('#gridClients').should('be.visible');

    cy.get('#gridClients table tr td .dx-header-filter-indicator').eq(0).click({force:true});

    filterClientType(type)

    let gridClientsRows = cy.wrap('#gridClients table tbody tr');
    gridClientsRows.get('.dx-command-edit-with-icons a').eq(1).click({ force: true })
    cy.wait(3000);
}
