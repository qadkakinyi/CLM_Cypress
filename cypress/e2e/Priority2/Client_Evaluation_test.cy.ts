import {faker} from "@faker-js/faker";
import {filterClientType, navigateToClientMenu} from "../../support/e2e";
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

let firstName = faker.person.firstName('male');
let lastName = faker.person.lastName('male')
let clientId = '';
let token = '';
function NavigateToClientDashboard(){
    cy.visit('main/clients').wait(3000);
    cy.get('#gridClients').should('be.visible');

    cy.get('[aria-colindex="4"]  .dx-texteditor-input-container > .dx-texteditor-input').eq(0).type(firstName+' '+lastName).wait(2500)
    // cy.get('[aria-colindex="4"]  .dx-texteditor-input-container > .dx-texteditor-input').eq(0).type('Leon Gulg').wait(2500)

    cy.get('#gridClients table tr td .dx-header-filter-indicator').eq(0).click({force:true});

    let gridClientsRows = cy.wrap('#gridClients table tbody tr');
    gridClientsRows.get('.dx-command-edit-with-icons a').eq(0).click({ force: true }).wait(2000);
}

function getClientID(){
    cy.location('pathname').then(path=>{
        const pathSections = path.split('/');
        clientId = pathSections[3]
    })
}
describe('Perform Client Evaluation Using Staging APIs', ()=>{
    
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
    
    it('Generate Regulation Group Hash Key', function() {

        cy.getByDataCy('system-settings-menu').scrollIntoView().click();
        cy.get('[title="Account"]').click().wait(1000);
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

    it('Creates a Regulation Group', ()=>{
        cy.visit('/settings/regulation-groups').wait(1500)
        cy.contains('Add').click().wait(1000)
        cy.getByFormControlName('name').type(regulation_group_name)
        cy.getByFormControlName('mappingReference').type(faker.string.alphanumeric(13))
        // cy.getByDataCy('countries').click().wait(500)
        cy.get('dx-drop-down-box').eq(0).click().wait(500)
        cy.get('#dynamicSelectBoxDropdownGrid .dx-datagrid-rowsview .dx-datagrid-content table tr').eq(0).click().wait(1000)
        // cy.getByDataCy('currency').click().wait(500)
        cy.get('dx-drop-down-box').eq(1).click().wait(500)
        cy.contains('0x').click({force:true}).wait(1000)
        cy.getByFormControlName('hash').eq(0).type(hashValue)
        cy.contains('sa-button','Save').click().wait(1500)
        cy.contains('Regulation group has been added.').wait(1000)
    })

    it('Adds a Criteria and Its Answers', ()=>{
        cy.visit('/settings/criteria').wait(2000)
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

        cy.contains('sa-button', 'Save').click().wait(1000)
        cy.contains('The criterion has been added').wait(2000)
        
        //  ADD CRITERION ANSWER
        cy.contains('[icon="plus"]', 'Add').click().wait(1000)
        cy.getByFormControlName('value').type('Test')
        cy.getByFormControlName('evaluationGrade').select('Low')
        cy.getByFormControlName('isDefault').check()
        cy.get('#addAnswerForm > .custom-backround-transparent > .row > .col > [icon="save"] > .sa-button').click().wait(2000)
    })

    it('Add Individual Client To The New Regulation Group', () => {

        cy.visit("/main/clients").wait(2000);
        cy.get('#addIndividual').click().wait(1500);
        
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
        
    })
    
    it('Navigates to the newly created client dashboard', ()=>{
        cy.visit('main/clients').wait(3000);
        cy.get('#gridClients').should('be.visible');
        
        cy.get('[aria-colindex="4"]  .dx-texteditor-input-container > .dx-texteditor-input').eq(0).type(`${firstName} ${lastName}`).wait(2500)

        cy.get('#gridClients table tr td .dx-header-filter-indicator').eq(0).click({force:true});

        let gridClientsRows = cy.wrap('#gridClients table tbody tr');
        gridClientsRows.get('.dx-command-edit-with-icons a').eq(0).click({ force: true }).wait(2000);
        
    })

    it('Adds an evaluation', ()=>{
        NavigateToClientDashboard()
        
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

})