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
        getByDataCy(selector: string): Chainable<any>
    }

    interface Chainable<Subject = any> {
        getByFormControlName(selector: string): Chainable<any>
    }

    interface Chainable {
        poll(
            selectorOrText?: string, 
            text? : string,
            options?: {
                interval?: number;
                timeout?: number;
                description?: string
            }
        ): Chainable;
    }
    
    interface Chainable {
        waitUntilLoaderDisappears():Chainable
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
    cy.get('input[name="username"]').should('be.visible').type(username, {delay: 50});
    cy.get('input[name="password"]').should('be.visible').type(password, {delay: 50});

    cy.get('#loginFormSubmitButton').type('Cypress.io{enter}').wait(1000)

    // Dismiss active session modal if it appears
    cy.get('body').then($body => {
        if ($body.find('#Msg1').length > 0) {
            cy.get('#Msg1').find('#bot2-Msg1').click().wait(1000);
        }
    });

    // Confirm navigation to dashboard
    cy.location('pathname', {timeout: 10000}).should('eq', '/main/dashboard');

    // Ensure the sidebar is pinned
    cy.get('aside').then($aside => {
        const unpinIcon = $aside.find('.dx-icon-unpin');
        if (unpinIcon.length > 0) {
            cy.wrap(unpinIcon).click({force:true}).wait(500);
        } else {
            cy.log('Sidebar already pinned or unpin icon missing.');
        }
    });

});

// cypress/support/commands.ts
Cypress.Commands.add('getBySel', (selector, ...args) => {
    return cy.get(`[data-test=${selector}]`, ...args)
});

Cypress.Commands.add('getByDataCy', (selector) => {
    return cy.get(`[data-cy="${selector}"]`)
})
Cypress.Commands.add('getByFormControlName', (selector) => {
    return cy.get(`[formControlName="${selector}"]`)
})

Cypress.Commands.add('getBySelLike', (selector, ...args) => {
    return cy.get(`[data-test*=${selector}]`, ...args)
});

Cypress.Commands.add('pollFn', (fn, options: { interval?: number; timeout?: number; description?: string } = {}) => {
    const {
        interval = 1000,
        timeout = 60000,
        description = 'Polling condition'
    } = options;
    const start = Date.now();

    function check() {
        return Cypress.Promise.try(fn).then(result => {
            if (result) {
                return result;
            } else if (Date.now() - start > timeout) {
                throw new Error(`${description} did not resolve within ${timeout}ms`);
            } else {
                return Cypress.Promise.delay(interval).then(check)
            }
        })
    }

    return check();
})

Cypress.Commands.add('poll', function (
    selectorOrText?: string,
    text?: string,
    options: {
        interval?: number;
        timeout?: number;
        description?: string;
    } = {}
) {
    const isCssSelector = typeof selectorOrText === 'string' &&
        (/^[.#\[]/.test(selectorOrText.trim()) || selectorOrText.startsWith('#'));

    const isTextOnly = !text && !isCssSelector;
    const isSelectorOnly = text === undefined && isCssSelector;

    return cy.pollFn(() => {
        if (isTextOnly) {
            const match = Cypress.$(`body :contains(${selectorOrText})`).filter(function () {
                return Cypress.$(this).text().includes(selectorOrText!);
            });
            return match.length > 0 ? match.first() : false;
        }

        if (isSelectorOnly) {
            const el = Cypress.$(selectorOrText!);
            return el.length > 0 ? el : false;
        }

        // selector + text
        const el = Cypress.$(selectorOrText!);
        if (el.length === 0) return false;
        return el.text().includes(text!) ? el : false;
    }, {
        timeout: 90000,
        interval: 500,
        description: isTextOnly
            ? `Waiting for text "${selectorOrText}" to appear anywhere`
            : isSelectorOnly
                ? `Waiting for selector "${selectorOrText}" to exist`
                : `Waiting for "${selectorOrText}" to contain "${text}"`,
        ...options
    });
});

Cypress.Commands.add('waitUntilLoaderDisappears', () => {
    const loaderSelector = '.loading-foreground';

    return cy.pollFn(() => {
        const $el = Cypress.$(loaderSelector);
        return $el.length === 0 || !$el.is(':visible');
    }, {
        timeout: 10000,
        interval: 200,
        description: 'Waiting for loader to disappear'
    });
});


