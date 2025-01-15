import {faker} from "@faker-js/faker";

describe.skip('Add Edit and Delete Contract policies', ()=>{
    
    before(()=>{
        cy.visit('/settings/contracts-setup')
        
        // add contract policy category
        cy.contains('Add').should('be.visible').click()
        cy.wait(1000)
        cy.getByDataCy('contract-category-name').type('Fixed Price Category')
        cy.getByDataCy('contract-category-ref').type(faker.string.alphanumeric(13))
        cy.getByDataCy('save-contract-category').click()
        cy.get("p:contains('Contract category already exists.')").then((el)=>{
            if(el.is(':visible')){
                cy.getByDataCy('Close-Contract-Category-Form').click()
            }
        })
        cy.wait(1000)
        
        // add contract product
        // cy.get('span').contains('Contract Products').click()
        // cy.wait(500)
        // cy.contains('Add').click()
        // cy.wait(1000)
        // cy.get('#addContractPolicyProductForm .product-name').type('Warranty')
        // cy.get('#addContractPolicyProductForm .product-reference').type(faker.string.alphanumeric(13))
        // cy.getByDataCy('policy-category').click()
        // cy.contains('Fixed Price Category').click() //=================BUG===
        // cy.wait(300)
        // cy.getByDataCy('save-policy').click()
        // cy.wait(1000)
        
        // add contract status
        cy.contains('Contract Status').click()
        cy.wait(500)
        cy.contains('Add').click()
        cy.wait(1000)
        cy.get('#addContractPolicyStatusForm .policy-status-name').type('Pending')
        cy.get('#addContractPolicyStatusForm .policy-status-reference').type(faker.string.alphanumeric(13))
        cy.getByDataCy('save-status').click()
        cy.wait(1000)
        
    })
    
    it('Add a contract policy', ()=>{
        cy.visit('/main/clients')
        cy.wait(2000)
        cy.get('#gridClients').should('be.visible');

        cy.get('#gridClients table tr td .dx-header-filter-indicator').eq(0).click();

        let gridClientsRows = cy.wrap('#gridClients table tbody tr');
        gridClientsRows.get('.dx-command-edit-with-icons a').last().click({ force: true });

        cy.get('.left-secondary-menu .left-menu-items.main-menu li>sa-menu-item>a').contains('span', 'Policies').click();

        cy.wait(1000)
        
        cy.getBySel('addContract').contains('Add').click()
        cy.wait(1000)
        
        cy.getByFormControlName('policyNumber').type('12345678')
        cy.getByFormControlName('policyParticulars').type('Valid 1 year')
        cy.getByFormControlName('initialAmount').type('10000')
        cy.getByFormControlName('yearlyAmount').type('30000')
        cy.getByDataCy('policy-status').click()
        cy.contains('Pending').click()
        cy.wait(500)
        cy.getByDataCy('policy-product').click()
        
        cy.getByFormControlName('policyInceptionDate').type(faker.date.past().toISOString().slice(0, 10))
        cy.getByFormControlName('policyExpirationDate').type(faker.date.future().toISOString().slice(0, 10))
        cy.getByDataCy('assignedTo').click()
        cy.contains('Other').click()
        cy.getByFormControlName('applicationApprovalReference').type(faker.string.alphanumeric(10))
        // cy.getByFormControlName('bankName').type('')
        cy.getByFormControlName('policyPlan').type('Mandatory')
    })
    
})