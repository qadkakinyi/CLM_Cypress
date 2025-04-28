import {navigateToClientMenu, navigateToNewestClientMenu} from "../../support/e2e";
// import {accountNumberTest} from "./Add_Edit_Delete_Client_Bank_Account_test.cy";

describe('Cleans Up Created Objects That Were being Used By other Functionalities', ()=>{
    it('Delete client Bank Account', () => {
        navigateToNewestClientMenu('Individual')
        cy.get('.left-secondary-menu .left-menu-items.main-menu li>sa-menu-item>a').contains('span', 'Bank Accounts').click();
        cy.getBySel('gridClientAccounts').should('be.visible');
        // cy.get('.dx-datagrid-filter-row .dx-texteditor-input-container input').eq(0).type(accountNumberTest);

        cy.wait(2000);

        let gridClientAccounts = cy.wrap('#gridClientAccounts table tbody tr');
        gridClientAccounts.get('.dx-command-edit-with-icons a').eq(0).click({ force: true });

        cy.wait(2000);

        // Delete Bank Account
        cy.getBySel('deleteClientAccountButton').should('be.visible').click();
        cy.get('#bot2-Msg1').contains('Yes').click();
        cy.contains('The bank account has been deleted.')
    })
})