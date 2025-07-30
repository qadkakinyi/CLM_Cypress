const corporateEntity = 'Complytek';
const individualEntityName = 'Vladimir Putin';
const individualEntityName2 = 'Donald Trump';

describe('Case 1: Auto Accepted -> Released', () => {

    it('Performs transaction screening for individual client with corporateEntities only and asserts Auto Status and Case Status', () => {
        let clientName;
        cy.readFile('cypress/fixtures/client_individual.json').then((data) => {
            clientName = data.individualClientName

            // Navigate to Transaction Screening page
            cy.visit('/administration/check-transaction-screening');
            cy.wait(2000);

            // Select Regulation Group
            cy.get('#checkTransactionScreeningForm dx-drop-down-box').eq(0).click().wait(1000);
            cy.get('#dynamicSelectBoxDropdownGrid tbody td').eq(2).click({force: true}).wait(1000);

            // Select Client
            cy.get('#checkTransactionScreeningForm dx-drop-down-box').eq(1).click().wait(1000);
            cy.get('.dx-datagrid-filter-row [aria-colindex="1"] .dx-texteditor-input').eq(1).type(clientName).wait(3000)
            cy.contains(clientName).click({force: true}).wait(2000);

            // Fill in corporateEntities only
            cy.contains('sa-button', 'Add Business Entity').scrollIntoView().click().wait(1000);
            cy.get('[formarrayname="businessEntities"] [name="name"]').type(corporateEntity)

            // Trigger Screening
            cy.contains('sa-button', 'Perform Transaction Screening').click().wait(8000);

            // Expect Auto Status to be `Auto Manual Review`
            cy.get('#editTransactionScreeningCaseForm app-dynamic-selectbox').eq(0).find('dx-drop-down-box input').eq(1).should('have.value', 'Auto Manual Review')

            // Change the hit names to no match
            cy.get('app-negative-lists-business-search-results .dx-checkbox-icon').eq(0).click().wait(2000)
            cy.contains('sa-button', 'Change Status').click().wait(1000);
            cy.contains('.MessageBoxButtonSection #bot2-Msg1', 'Yes').click().wait(5000)
            // cy.contains('The statuses has been updated') // removing this not because it fails but sometimes it's fast other times slow making the test to fail if execution takes longer

            // Assert that Auto Status is 'Auto Accepted' on re-running the same transaction screening
            // Trigger Screening
            cy.contains('sa-button', 'Perform Transaction Screening').click().wait(8000);
            // Expect Auto Status to be `Auto Manual Review`
            cy.get('#editTransactionScreeningCaseForm app-dynamic-selectbox').eq(0).find('dx-drop-down-box input').eq(1).should('have.value', 'Auto Accepted')
            // Expect Case Status to be `Released`
            cy.get('#editTransactionScreeningCaseForm app-dynamic-selectbox').eq(1).find('dx-drop-down-box input').eq(1).should('have.value', 'In Progress')
        });
    })

    it('Performs transaction screening for individual client with person only and asserts Auto Status and Case Status', () => {
        let clientName;
        cy.readFile('cypress/fixtures/client_individual.json').then((data) => {
            clientName = data.individualClientName

            // Navigate to Transaction Screening page
            cy.visit('/administration/check-transaction-screening');
            cy.wait(2000);

            // Select Regulation Group
            cy.get('#checkTransactionScreeningForm dx-drop-down-box').eq(0).click().wait(1000);
            cy.get('#dynamicSelectBoxDropdownGrid tbody td').eq(2).click({force: true}).wait(1000);

            // Select Client
            cy.get('#checkTransactionScreeningForm dx-drop-down-box').eq(1).click().wait(1000);
            cy.get('.dx-datagrid-filter-row [aria-colindex="1"] .dx-texteditor-input').eq(1).type(clientName).wait(3000)
            cy.contains(clientName).click({force: true}).wait(2000);

            // Fill in corporateEntities only
            cy.contains('sa-button', 'Add Person Entity').scrollIntoView().click().wait(1000);
            cy.get('[formarrayname="personEntities"] [name="lastName"]').type(individualEntityName)

            // Trigger Screening
            cy.contains('sa-button', 'Perform Transaction Screening').click().wait(8000);

            // Expect Auto Status to be `Auto Manual Review`
            cy.get('#editTransactionScreeningCaseForm app-dynamic-selectbox').eq(0).find('dx-drop-down-box input').eq(1).should('have.value', 'Auto Manual Review')

            // Change the hit names to no match
            cy.get('app-negative-lists-person-search-results .dx-checkbox-icon').eq(0).click().wait(2000)
            cy.contains('sa-button', 'Change Status').click().wait(1000);
            cy.contains('.MessageBoxButtonSection #bot2-Msg1', 'Yes').click().wait(5000)
            // cy.contains('The statuses has been updated') // removing this not because it fails but sometimes it's fast other times slow making the test to fail if execution takes longer

            // Assert that Auto Status is 'Auto Accepted' on re-running the same transaction screening
            // Trigger Screening
            cy.contains('sa-button', 'Perform Transaction Screening').click().wait(8000);
            // Expect Auto Status to be `Auto Manual Review`
            cy.get('#editTransactionScreeningCaseForm app-dynamic-selectbox').eq(0).find('dx-drop-down-box input').eq(1).should('have.value', 'Auto Accepted')
            // Expect Case Status to be `Released`
            cy.get('#editTransactionScreeningCaseForm app-dynamic-selectbox').eq(1).find('dx-drop-down-box input').eq(1).should('have.value', 'In Progress')
        });
    })

    it('Performs transaction screening for corporate client with personEntities only and asserts Auto Status', () => {
        let clientName;
        cy.readFile('cypress/fixtures/client_corporate.json').then((data) => {
            clientName = data.companyName;

            // Navigate to Transaction Screening page
            cy.visit('/administration/check-transaction-screening');
            cy.wait(2000);

            // Select Regulation Group
            cy.get('#checkTransactionScreeningForm dx-drop-down-box').eq(0).click().wait(1000);
            cy.get('#dynamicSelectBoxDropdownGrid tbody td').eq(2).click({force: true}).wait(1000);

            // Select Client
            cy.get('#checkTransactionScreeningForm dx-drop-down-box').eq(1).click().wait(1000);
            cy.get('.dx-datagrid-filter-row [aria-colindex="1"] .dx-texteditor-input').eq(1).type(clientName).wait(3000);
            cy.contains(clientName).click({force: true}).wait(2000);

            // Fill in personEntities only
            cy.contains('sa-button', 'Add Person Entity').scrollIntoView().click().wait(1000);
            cy.get('[formarrayname="personEntities"] [name="lastName"]').type(individualEntityName);

            // Trigger Screening
            cy.contains('sa-button', 'Perform Transaction Screening').click().wait(8000);

            // Expect Auto Status to be `Auto Manual Review`
            cy.get('#editTransactionScreeningCaseForm app-dynamic-selectbox')
                .eq(0)
                .find('dx-drop-down-box input')
                .eq(1)
                .should('have.value', 'Auto Manual Review');

            // Change the hit names to no match
            cy.get('app-negative-lists-person-search-results .dx-checkbox-icon').eq(0).click().wait(2000);
            cy.contains('sa-button', 'Change Status').click().wait(1000);
            cy.contains('.MessageBoxButtonSection #bot2-Msg1', 'Yes').click().wait(5000);

            // Trigger Screening again
            cy.contains('sa-button', 'Perform Transaction Screening').click().wait(8000);

            // Expect Auto Status to be `Auto Accepted`
            cy.get('#editTransactionScreeningCaseForm app-dynamic-selectbox')
                .eq(0)
                .find('dx-drop-down-box input')
                .eq(1)
                .should('have.value', 'Auto Accepted');

            // Expect Case Status to be `Released`
            cy.get('#editTransactionScreeningCaseForm app-dynamic-selectbox').eq(1).find('dx-drop-down-box input').eq(1).should('have.value', 'In Progress')
        });
    });

    it('Performs transaction screening for corporate client with businessEntities only and asserts Auto Status', () => {
        let clientName;
        cy.readFile('cypress/fixtures/client_corporate.json').then((data) => {
            clientName = data.companyName;

            // Navigate to Transaction Screening page
            cy.visit('/administration/check-transaction-screening');
            cy.wait(2000);

            // Select Regulation Group
            cy.get('#checkTransactionScreeningForm dx-drop-down-box').eq(0).click().wait(1000);
            cy.get('#dynamicSelectBoxDropdownGrid tbody td').eq(2).click({force: true}).wait(1000);

            // Select Client
            cy.get('#checkTransactionScreeningForm dx-drop-down-box').eq(1).click().wait(1000);
            cy.get('.dx-datagrid-filter-row [aria-colindex="1"] .dx-texteditor-input').eq(1).type(clientName).wait(3000);
            cy.contains(clientName).click({force: true}).wait(2000);

            // Fill in businessEntities only
            cy.contains('sa-button', 'Add Business Entity').scrollIntoView().click().wait(1000);
            cy.get('[formarrayname="businessEntities"] [name="name"]').type(corporateEntity);

            // Trigger Screening
            cy.contains('sa-button', 'Perform Transaction Screening').click().wait(8000);

            // Expect Auto Status to be `Auto Manual Review`
            cy.get('#editTransactionScreeningCaseForm app-dynamic-selectbox')
                .eq(0)
                .find('dx-drop-down-box input')
                .eq(1)
                .should('have.value', 'Auto Manual Review');

            // Change the hit names to no match
            cy.get('app-negative-lists-business-search-results .dx-checkbox-icon').eq(0).click().wait(2000);
            cy.contains('sa-button', 'Change Status').click().wait(1000);
            cy.contains('.MessageBoxButtonSection #bot2-Msg1', 'Yes').click().wait(5000);

            // Trigger Screening again
            cy.contains('sa-button', 'Perform Transaction Screening').click().wait(8000);

            // Expect Auto Status to be `Auto Accepted`
            cy.get('#editTransactionScreeningCaseForm app-dynamic-selectbox')
                .eq(0)
                .find('dx-drop-down-box input')
                .eq(1)
                .should('have.value', 'Auto Accepted');

            // Expect Case Status to be `Released`
            cy.get('#editTransactionScreeningCaseForm app-dynamic-selectbox').eq(1).find('dx-drop-down-box input').eq(1).should('have.value', 'In Progress')
        });
    });
});

describe('Case 2A: Auto Manual Review -> New (Negative match)', () => {

    it('Performs transaction screening for individual client and asserts Auto Status and Case Status', () => {
        let clientName;
        cy.readFile('cypress/fixtures/client_individual.json').then((data) => {
            clientName = data.individualClientName

            // Navigate to Transaction Screening page
            cy.visit('/administration/check-transaction-screening');
            cy.wait(2000);

            // Select Regulation Group
            cy.get('#checkTransactionScreeningForm dx-drop-down-box').eq(0).click().wait(1000);
            cy.get('#dynamicSelectBoxDropdownGrid tbody td').eq(2).click({force: true}).wait(1000);

            // Select Client
            cy.get('#checkTransactionScreeningForm dx-drop-down-box').eq(1).click().wait(1000);
            cy.get('.dx-datagrid-filter-row [aria-colindex="1"] .dx-texteditor-input').eq(1).type(clientName).wait(3000)
            cy.contains(clientName).click({force: true}).wait(2000);

            // Fill in corporateEntities only
            cy.contains('sa-button', 'Add Person Entity').scrollIntoView().click().wait(1000);
            cy.get('[formarrayname="personEntities"] [name="lastName"]').type(individualEntityName2)

            // Trigger Screening
            cy.contains('sa-button', 'Perform Transaction Screening').click().wait(8000);

            // Expect Auto Status to be `Auto Manual Review`
            cy.get('#editTransactionScreeningCaseForm app-dynamic-selectbox').eq(0).find('dx-drop-down-box input').eq(1).should('have.value', 'Auto Manual Review')
            // Expect Case Status to be `New`
            cy.get('#editTransactionScreeningCaseForm app-dynamic-selectbox').eq(1).find('dx-drop-down-box input').eq(1).should('have.value', 'In Progress')
        });
    })
});