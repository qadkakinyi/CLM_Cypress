import {faker} from "@faker-js/faker";
import { navigateToNewestClientMenu } from "../../../support/e2e";

/**
 * @testSuite Client Evaluation - Staging API & UI
 * @description End-to-end flow that generates a provider hash key, creates a regulation group, defines a criterion and answer, adds an individual client mapped to that group, performs an evaluation via staging APIs, and tears down by deleting the regulation group.
 * @priority High
 * @owner QA Team
 * @tags regression, smoke, e2e, staging-api, regulation-groups, criteria, individual-clients, evaluations
 * @dependencies user-authentication, faker-js, cypress, env-api_baseUrl
 * @fileDescription Validates the staging-API-driven evaluation workflow and related UI flows from setup to cleanup.
 */

let api_baseUrl = Cypress.env('api_baseUrl')
function getProviderKey(){
    let today = new Date();
    let formattedDate = today.getFullYear().toString() + ('0' + (today.getMonth() +1)).slice(-2) + ('0' + today.getDate()).slice(-2)
    console.log(formattedDate)
    return formattedDate
}

let hashValue = '';
let regulation_group_name = 'DKA Regulation Group '+faker.number.int({max:100});
let criteria_mappingReference = faker.string.alphanumeric(13);
let location = '';

let firstName = ''
let lastName = ''
let clientId = '';
let token = '';
function NavigateToClientDashboard(){
    cy.visit('main/clients').wait(3000);
    cy.get('#gridClients').should('be.visible');

    cy.get('[aria-colindex="4"]  .dx-texteditor-input-container > .dx-texteditor-input').eq(0).type(firstName+' '+lastName).wait(2500)
    // cy.get('[aria-colindex="4"]  .dx-texteditor-input-container > .dx-texteditor-input').eq(0).type('Leon Gulg').wait(2500)

    cy.get('#gridClients table tr td .dx-header-filter-indicator').eq(0).click();

    let gridClientsRows = cy.wrap('#gridClients table tbody tr');
    gridClientsRows.get('.dx-command-edit-with-icons a').eq(0).click({ force: true }).wait(2000);
}

function getClientID(){
    cy.location('pathname').then(path=>{
        const pathSections = path.split('/');
        clientId = pathSections[3]
    })
}

/**
 * @suite Staging API-Driven Client Evaluation
 * @description Creates prerequisites (hash, regulation group, criterion & answer) and executes an evaluation for an Individual client using mixed UI + API steps.
 * @prerequisites Logged-in user with permissions to manage Settings, Clients, and Evaluations.
 * @prerequisites Environment variable "api_baseUrl" is configured and reachable.
 * @prerequisites Backend supports provider key generation and accepts TTL "10".
 * @prerequisites Mapping references "Criterion_Test" and "CriterionAnswer_Test" exist (or adjust API payload accordingly).
 * @testData Faker-generated names/IDs; dynamic regulation group name "DKA Regulation Group <n>"; random criterion mapping reference.
 */
describe('Perform Client Evaluation Using Staging APIs', ()=>{

    /**
     * @prerequisites Staging API bearer token is required for subsequent API requests.
     * @steps Send POST {api_baseUrl}/token with username "systemadmin" and password "Password1!".
     * @expectedResult Access token is stored in variable "token" for later API calls.
     */
    before(()=>{
        //get authorization token
        cy.request({
            method:"POST",
            url:`${api_baseUrl}/token`,
            body:{
                "grant_type": 'password',
                "username": 'systemadmin',
                "password": 'Password1!'
            },
            headers:{
                "Content-Type": "application/x-www-form-urlencoded"
            }}).then(res=>{
            token = res.body.access_token
        })
    })

    /**
     * @scenario Generate Provider Hash Key
     * @description Generates a provider hash key required for creating a regulation group.
     * @priority High
     * @testData Provider key = current date (yyyyMMdd) from getProviderKey(); TTL = "10".
     * @steps Open System Settings → Account → Key generator.
     * @steps Select a provider from the dropdown.
     * @steps Enter provider key (yyyyMMdd) and TTL.
     * @steps Save and capture the generated hash value.
     * @expectedResult Hash key is generated and stored in variable "hashValue".
     */
    it('Generate Regulation Group Hash Key', function() {

        cy.getByDataCy('system-settings-menu').scrollIntoView().click();
        cy.contains('ul sa-menu-item span',"Account").click().wait(1000);
        cy.get('[icon="key"] > .sa-button > .text').click().wait(1000);
        cy.get('.col-md-12 > .form-group > app-dynamic-selectbox > .sa-input-dropdown > .custom-selectbox > .dx-dropdowneditor-input-wrapper > .dx-texteditor-container > .dx-texteditor-buttons-container > .dx-widget > .dx-button-content > .dx-dropdowneditor-icon').click();
        cy.get('[aria-rowindex="4"] > td').click();
        cy.get('#createHashKeyForm > fieldset > :nth-child(2) > .col-md-12 > .sa-input > .ng-untouched').clear();
        cy.get('#createHashKeyForm > fieldset > :nth-child(2) > .col-md-12 > .sa-input > .ng-untouched').type(getProviderKey());
        cy.get('.row.ng-star-inserted > .col-md-12 > .sa-input > .ng-untouched').clear();
        cy.get('.row.ng-star-inserted > .col-md-12 > .sa-input > .ng-untouched').type('10');
        cy.get('#createHashKeyForm > .custom-backround-transparent > .row > .col > [icon="save"] > .sa-button').click().wait(2000);
        cy.getByFormControlName('hashKey').invoke('val').then((value)=>{
            hashValue=value;
        })

        cy.get('#createHashKeyForm > .custom-backround-transparent > .row > .col > [icon="times"] > .sa-button > .text').click();

    });

    /**
     * @scenario Create Regulation Group
     * @description Creates a new regulation group using the generated hash key.
     * @priority High
     * @testData Name = regulation_group_name; mappingReference = random alphanumeric(13); country/currency selected from dropdowns; hash = hashValue.
     * @steps Navigate to Settings → Regulation Groups and click Add.
     * @steps Enter name and mapping reference.
     * @steps Select country and currency from the dropdown grids.
     * @steps Enter/paste the generated hash value.
     * @steps Save the regulation group.
     * @expectedResult Toast "Regulation group has been added." is displayed and the group is created.
     */
    it('Creates a Regulation Group', ()=>{
        cy.visit('/settings/regulation-groups').wait(3500)
        cy.contains('sa-button[icon="plus"]','Add').should('be.visible').click().wait(1000)
        cy.getByFormControlName('name').type(regulation_group_name)
        cy.getByFormControlName('mappingReference').type(faker.string.alphanumeric(13))
        // cy.getByDataCy('countries').click().wait(500)
        cy.get('dx-drop-down-box').eq(0).click().wait(500)
        cy.get('#dynamicSelectBoxDropdownGrid .dx-datagrid-rowsview .dx-datagrid-content table tr').eq(0).click().wait(1000)
        // cy.getByDataCy('currency').click().wait(500)
        cy.get('dx-drop-down-box').eq(1).click().wait(500)
        cy.contains('0x').click({force:true}).wait(1000)
        cy.getByFormControlName('hash').eq(0).type(hashValue)
        cy.contains('#addRegulationGroupForm sa-button[icon="save"]','Save').scrollIntoView().click().wait(1500)
        cy.contains('Regulation group has been added.').wait(1000)
    })

    /**
     * @scenario Add Criterion and Default Answer
     * @description Adds a criterion linked to the new regulation group and creates a default answer.
     * @priority High
     * @testData Criterion: name="Test", riskPoint=1, mappingReference=criteria_mappingReference; Client Type="Individual"; Setup Type="Custom".
     * @steps Open Settings → Criteria and click Add.
     * @steps Fill in name, risk point, and mapping reference.
     * @steps Select regulation group, criteria category, client type (Individual), and setup type (Custom).
     * @steps Enable Include in Evaluation and save.
     * @steps Click Add to create an answer; set value="Test", grade="Low", mark as default; save.
     * @expectedResult Toast "The criterion has been added" appears and the default answer is created.
     */
    it('Adds a Criteria and Its Answers', ()=>{
        cy.visit('/settings/criteria').wait(3500)
        cy.contains('sa-button', 'Add').click().wait(1000)

        cy.getByFormControlName('name').eq(0).type('Test')
        cy.getByFormControlName('riskPoint').eq(0).type('1')
        cy.getByFormControlName('mappingReference').eq(0).type(criteria_mappingReference)
        // regulation group
        cy.get('dx-drop-down-box').eq(0).click().wait(500)
        cy.get('#dynamicSelectBoxDropdownGrid .dx-datagrid-rowsview .dx-datagrid-content tr td').contains(regulation_group_name).click({force:true}).wait(500)
        // criteria category
        cy.get('dx-drop-down-box').eq(1).click().wait(500)
        cy.get('#dynamicSelectBoxDropdownGrid .dx-datagrid-rowsview .dx-datagrid-content').eq(1).find(' tr td').eq(0).click({force:true}).wait(500)
        // client type
        cy.get('dx-drop-down-box').eq(2).click().wait(500)
        cy.get('#dynamicSelectBoxDropdownGrid .dx-datagrid-rowsview .dx-datagrid-content tr td').contains('Individual').click({force:true}).wait(500)
        // criterion setup type
        cy.get('dx-drop-down-box').eq(3).click().wait(500)
        cy.get('#dynamicSelectBoxDropdownGrid .dx-datagrid-rowsview .dx-datagrid-content tr td').contains('Custom').click({force:true}).wait(500)

        cy.getByFormControlName('includeInEvaluation').check()

        cy.contains('#addCriterionForm sa-button[icon="save"]', 'Save').click().wait(1000)
        cy.contains('The criterion has been added').wait(4000)

        //  ADD CRITERION ANSWER
        cy.contains('[icon="plus"]', 'Add').click().wait(1000)
        cy.getByFormControlName('value').type('Test')
        cy.getByFormControlName('evaluationGrade').select('Low')
        cy.getByFormControlName('isDefault').check()
        cy.get("#addAnswerForm sa-button[icon='save']").click().wait(2000)
    })

    /**
     * @scenario Add Individual Client and Navigate to Dashboard
     * @description Creates a new individual client and associates it with the newly created regulation group.
     * @priority High
     * @testData Faker-generated first/middle/last name; external reference, phone, email, SSN, TIN, DOB, IP; country="Albania".
     * @steps Open Clients page and click Add Individual.
     * @steps Fill in personal details and select Client Status.
     * @steps Select the created regulation group from the dropdown.
     * @steps Fill in identifiers and contact fields; select country; add IP and notes.
     * @steps Save and capture the client page location for later use.
     * @expectedResult Toast "Client individual has been added" appears and the client page shows the created name.
     */
    it('Add Individual Client To The New Regulation Group and Navigates to the client dashboard', () => {

        cy.visit("/main/clients").wait(2000);
        cy.get('#addIndividual').click().wait(1500);

        firstName = faker.person.firstName('male');
        lastName = faker.person.lastName('male');

        cy.get('#addClientIndividualForm input[name="firstName"]').type(firstName);
        cy.get('#addClientIndividualForm input[name="lastName"]').type(lastName);
        cy.get('#addClientIndividualForm input[name="middleName"]').type(faker.person.middleName('male'));

        cy.get('#clientStatusesDropdown').click();
        cy.get('#dynamicSelectBoxDropdownGrid .dx-datagrid-rowsview table tbody tr td').eq(0).click({ force: true })

        cy.get('#regulationGroupsDropdown').should('be.visible').click()

        cy.wait(1000)

        cy.get('.dx-overlay-wrapper.dx-popup-wrapper.dx-dropdowneditor-overlay .dx-datagrid-rowsview table tbody tr td').contains(regulation_group_name).click({ force: true });

        cy.get('#addClientIndividualForm input[name="externalReference"]').type(faker.string.alphanumeric(12));
        cy.get('#addClientIndividualForm input[name="phone"]').type(faker.string.numeric(8));
        cy.get('#addClientIndividualForm input[name="email"]').type(`${firstName}@gmail.com`);
        cy.get('#addClientIndividualForm input[name="ssn"]').type(faker.string.alphanumeric(10));
        cy.get('#addClientIndividualForm input[name="taxIdentificationNumber"]').type(faker.string.alphanumeric(10));
        cy.get('#addClientIndividualForm input[name="dateOfBirth"]').type(faker.date.birthdate({ min: 18, max: 65, mode: 'age' }).toISOString().slice(0, 10));

        cy.get('#countriesDropdown').click();
        cy.get('#dynamicSelectBoxDropdownGrid table tr').contains('td', 'Albania').click();

        cy.get('#addClientIndividualForm input[name="ipAddress"]').type(faker.internet.ipv4());
        cy.get('#addClientIndividualForm textarea[name="notes"]').type(faker.lorem.paragraph());

        cy.get('#saveClientIndividual').click().wait(2000);
        cy.contains('Client individual has been added').wait(2000)

        cy.location('pathname').then((loc)=>{
            location = loc
        })
        cy.wait(3000)
        cy.contains(`${firstName} ${lastName}`).wait(1500)
    })

    /**
     * @scenario Create and Perform Evaluation (Staging APIs)
     * @description Initializes, creates, updates, and performs a client evaluation using staging API calls with conditional UI handling.
     * @priority High
     * @testData reasonForEvaluation uses randomized faker number; mapping refs "Criterion_Test" and "CriterionAnswer_Test".
     * @steps Navigate to the client's page and open Evaluations.
     * @steps If the initialization form is visible, POST /api/staging/addClientEvaluation, close the dialog, and click New again.
     * @steps If criteria dropdowns are visible, POST /api/staging/createClientEvaluation with mapping references; store evaluation ID.
     * @steps PUT /api/clientCommon/{clientId}/evaluations/{evaluationID} to update metadata.
     * @steps POST /api/clientCommon/{clientId}/evaluations/{evaluationID}/perform to complete evaluation.
     * @steps Click "Save & Close" in the UI.
     * @expectedResult Evaluation is created and performed successfully; the form closes without errors.
     */
    it('Adds an evaluation', ()=>{
        cy.visit(location).wait(2000)

        cy.get('.left-secondary-menu .left-menu-items.main-menu li>sa-menu-item>a').contains('span', 'Evaluations').click().wait(2000);
        getClientID();
        cy.get('[primary-buttons=""] > sa-button.ng-star-inserted > .sa-button > .text').click();
        cy.wait(1000)
        cy.getByDataCy('reasonForEvaluation').then((el)=>{
            //step 1
            if(el.is(':visible')){

                cy.wait(1000)

                cy.log(clientId)

                cy.request({
                    method: 'POST',
                    url: `${api_baseUrl}/api/staging/addClientEvaluation`,
                    headers:{
                        'Content-Type': 'application/json',
                        'Authorization':   `Bearer ${token}`
                    },
                    body: {
                        "ClientId": clientId,
                        "ReasonForEvaluation": `Test Request Using Cypress ${faker.number.int()}`
                    }
                }).then((response)=>{
                    cy.log(`${response}`)
                    console.log(response)
                    cy.get('#initializeEvaluationForm > .custom-backround-transparent > .row > .col > [icon="times"] > .sa-button').click().wait(3000)
                    cy.get('[primary-buttons=""] > sa-button.ng-star-inserted > .sa-button > .text').click().wait(2000);
                })
            }

            //step 2
            cy.getByDataCy('criteria-dropdowns').then((el)=> {
                if(el.is(':visible')) {

                    cy.request({
                        method:'POST',
                        url: `${api_baseUrl}/api/staging/createClientEvaluation`,
                        headers:{
                            'Content-Type':'application/json',
                            'Authorization': `Bearer ${token}`
                        },
                        body:{
                            "clientId": clientId,
                            "reasonForEvaluation": `Test Request Using Cypress ${faker.number.int()}`,
                            "createEvaluationIfNoPendingOneExists": true,
                            "criterionAnswersPairs": [
                                {
                                    "criterionMappingReference": "Criterion_Test",
                                    "criterionAnswers": [
                                        {
                                            "criterionAnswerMappingReference": "CriterionAnswer_Test"
                                        }
                                    ]
                                }
                            ]
                        }}

                    ).then((response:any)=>{
                        cy.log(`${response.body.clientEvaluationID}`)

                        let evaluationID = response.body.clientEvaluationID;

                        cy.request({
                            method: 'PUT',
                            url: `${api_baseUrl}/api/clientCommon/${clientId}/evaluations/${evaluationID}`,
                            body:{
                                "id": evaluationID,
                                "clientId": clientId,
                                "evaluationDate": "2019-01-01T00:00:00",
                                "reasonForEvaluation": "Reason for Evaluation Example Update",
                                "evaluationScore": 1,
                                "evaluationGradeId": 1,
                                "highestGradeId": 1,
                                "complianceOfficerGradeId": 1,
                                "complianceOfficerComment": "ComplianceOfficerComment Example Update",
                                "managerGradeId": 1,
                                "managerComment": "ManagerComment Update",
                                "nextEvaluationDate": "2020-01-01T00:00:00",
                                "clientEvaluationCriteria": []
                            },
                            headers:{
                                'Content-Type':'application/json',
                                'Authorization': `Bearer ${token}`
                            }
                        }).then(res=>{
                            cy.wait(2000)
                            cy.request({
                                method:'POST',
                                url:`${api_baseUrl}/api/clientCommon/${clientId}/evaluations/${evaluationID}/perform`,
                                body:{
                                    "clientId": clientId,
                                    "reasonForEvaluation": `Test Request Using Cypress ${faker.number.int()}`
                                    //Fields are missing from Request
                                },
                                headers:{
                                    'Content-Type':'application/json',
                                    'Authorization': `Bearer ${token}`
                                }}).then((response)=>{
                                cy.log(JSON.stringify(response.body))
                                //step 3
                                cy.contains('Save & Close').click().wait(3000)
                                // cy.get('sa-button').contains('Complete').click().wait(1000)
                            })
                        })


                    })

                }
            })

            // //step 3
            // cy.contains('Evaluate').click().wait(3000)
            // cy.get('sa-button').contains('Complete').click().wait(1000)

        })

    })

/**
 * @scenario Delete Regulation Group (Teardown)
 * @description Deletes the previously created regulation group to clean up test data.
 * @priority High
 * @steps Open Settings → Regulation Groups, open actions for the target group, click Delete, and confirm.
 * @expectedResult Toast "The Regulation Group has been deleted." is displayed and the group is removed.
 */
it('Deletes the Regulation Group', ()=>{
    cy.visit('/settings/regulation-groups').wait(3000)

    cy.get('.sa-panel header .fa-share-square-o').last().click({force:true}).wait(2000)

    cy.get('[primary-buttons=""] > [icon="trash"] > .sa-button').click({force:true}).wait(1000)
    cy.get('.col > [icon="trash"]').click()
    cy.get('.MessageBoxButtonSection').contains('button', 'Yes').click()
    cy.wait(20000)
    cy.contains('The Regulation Group has been deleted.')
})

})
