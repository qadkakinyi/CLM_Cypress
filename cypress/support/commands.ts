// ***********************************************
// This example namespace declaration will help
// with Intellisense and code completion in your
// IDE or Text Editor.
// ***********************************************
// declare namespace Cypress {
//   interface Chainable<Subject = any> {
//     customCommand(param: any): typeof customCommand;
//   }
// }
//
// function customCommand(param: any): void {
//   console.warn(param);
// }
//
// NOTE: You can use it like so:
// Cypress.Commands.add('customCommand', customCommand);
//
// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
declare namespace Cypress {
  interface Chainable<Subject = any> {
    login(username: string, password: string): Chainable<any>;
  }

  interface Chainable<Subject = any> {
    testFunctionTemplate(url: string, fn: any): Chainable<any>;
  }

  interface Chainable<Subject = any> {
    getBySel(selector: any): Chainable<any>;
  }

  interface Chainable<Subject = any> {
    getBySelLike(selector: any): Chainable<any>;
  }
  
  interface Chainable<Subject = any> {
    getByDataCy(selector: string):Chainable<any>
  }  
  interface Chainable<Subject = any> {
    getByFormControlName(selector: string):Chainable<any>
  }

  interface Chainable<Subject = any> {
    visualSnapshot(snapName: any): Chainable<any>;
  }
}

// custom command to make taking snapshots with full name
// formed from the test title + suffix easier
// cy.visualSnapshot() // default full test title
// cy.visualSnapshot('clicked') // full test title + ' - clicked'
// also sets the width and height to the current viewport
Cypress.Commands.add("visualSnapshot", (maybeName) => {
  // @ts-ignore
  let snapshotTitle = cy.state("runnable").fullTitle();
  if (maybeName) {
    snapshotTitle = snapshotTitle + " - " + maybeName;
  }
  cy.percySnapshot(snapshotTitle, {
    // @ts-ignore
    widths: [cy.state("viewportWidth")],
    // @ts-ignore
    minHeight: cy.state("viewportHeight"),
  });
});

Cypress.Commands.add("login", (username: string, password: string) => {
  
    cy.visit('/').wait(2000);

    cy.url().should('includes', 'login');
    cy.get('input[name="username"]').should('be.visible').type(username, { delay: 50 });
    cy.get('input[name="password"]').should('be.visible').type(password, { delay: 50 });

    cy.get('#loginFormSubmitButton').type('Cypress.io{enter}').wait(1000)

  // Dismiss active session modal if it appears
  cy.get('body').then($body => {
    if ($body.find('#Msg1').length > 0) {
      cy.get('#Msg1').find('#bot2-Msg1').click().wait(1000);
    }
  });

  // Confirm navigation to dashboard
  cy.location('pathname', { timeout: 10000 }).should('eq', '/main/dashboard');

  // Ensure the sidebar is pinned
  cy.get('aside').then($aside => {
    const unpinIcon = $aside.find('.dx-icon-unpin');
    if (unpinIcon.length > 0) {
      cy.wrap(unpinIcon).click().wait(500);
    } else {
      cy.log('Sidebar already pinned or unpin icon missing.');
    }
  });
  
});

// cypress/support/commands.ts
Cypress.Commands.add('getBySel', (selector, ...args) => {
  return cy.get(`[data-test=${selector}]`, ...args)
});

Cypress.Commands.add('getByDataCy', (selector)=>{
  return cy.get(`[data-cy="${selector}"]`)
})
Cypress.Commands.add('getByFormControlName', (selector)=>{
  return cy.get(`[formControlName="${selector}"]`)
})

Cypress.Commands.add('getBySelLike', (selector, ...args) => {
  return cy.get(`[data-test*=${selector}]`, ...args)
});

