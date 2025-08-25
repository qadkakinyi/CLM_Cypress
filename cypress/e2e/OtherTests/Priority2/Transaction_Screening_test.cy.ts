/**
 * @testSuite Transaction Screening - API & UI
 * @description Validates transaction screening via APIs and UI: obtains token, screens a transaction, navigates to the created case, and verifies the case page.
 * @priority Medium
 * @owner QA Team
 * @tags regression, transaction-screening, api, ui, cases
 * @dependencies user-authentication, cypress, env-api_baseUrl
 * @fileDescription Covers end-to-end transaction screening using backend APIs and the Administration UI.
 */

let user_token = '';
let userId = '';
let case_Id = '';
let api_baseUrl = Cypress.env('api_baseUrl')

/**
 * @prerequisites Environment variable "api_baseUrl" is configured and reachable.
 * @prerequisites Valid credentials for token retrieval.
 * @steps POST {api_baseUrl}/token with grant_type=password, username=systemadmin, password=Password1!.
 * @expectedResult Bearer token is stored in "user_token" for subsequent API calls.
 * @priority Medium
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
        user_token = res.body.access_token
    })
})

/**
 * @suite Transaction Screening via APIs
 * @description Uses backend endpoints to locate a client, perform transaction screening, and open the created case.
 * @prerequisites User token obtained in the global before() hook.
 * @testData clientRegulationGroupId=1; corporate entity name="Test LLC"; transactionReference="REF001".
 */
describe('Transaction Screening with APIS', ()=>{

    /**
     * @scenario Perform Transaction Screening (API) and Navigate to Case
     * @description Retrieves a client ID, performs screening via /IkycCalls/transactionScreening, then opens the case page.
     * @priority Medium
     * @steps GET /api/reportFilters/filter to fetch client list and capture first client "id" as userId.
     * @steps POST /api/IkycCalls/transactionScreening with clientId and corporateEntities.
     * @steps Read "caseId" from response and visit /main/client-individual/{userId}/1/transaction-screening-case/{caseId}.
     * @expectedResult Response includes "caseId"; the case page loads and displays the case ID.
     */
    it('Perform Transaction Screening check and navigate to the created case', ()=>{
        cy.wait(2000)
        // get client ID
        cy.request({
            method: "GET",
            url: `${api_baseUrl}/api/reportFilters/filter?customFilters={%22isClient%22:null,%22isArchived%22:false,%22isDeleted%22:false,%22clientTypes%22:[1,2],%22regulationGroups%22:[1],%22subGroups%22:null}&skip=0&take=50&requireTotalCount=true&_=1728980328740`,
            headers:{
                'Content-Type':'application/json',
                'Authorization': `Bearer ${user_token}`
            }
        }).then((response)=>{
            userId = response.body.data[0].id

            if(userId){
                cy.wait(2000)
                cy.request({
                    method: "POST",
                    url: `${api_baseUrl}/api/IkycCalls/transactionScreening`,
                    body: {
                        "swiftMt": "",
                        "sepa": "",
                        "iso2022": "",
                        "paymentDescriptionDetails": "",
                        "citiesMatchPercentage": 80,
                        "internalBlacklistsMatchPercentage": 80,
                        "transactionReference": "REF001",
                        "checkExistingScreening": "",
                        "fastPayment": "",
                        "clientRegulationGroupId": 1,
                        "clientId": userId,
                        "retrieveFullScreeningDetails": "",
                        "personEntities": [],
                        "corporateEntities": [
                            {
                                "address": "",
                                "capacity": "",
                                "country": "",
                                "name": "Test LLC"
                            }
                        ],
                        "unspecifiedEntities": [],
                        "countriesCheck": [],
                        "citiesCheck": [],
                        "restrictedCountries": [],
                        "restrictedCities": []
                    },
                    headers:{
                        'Content-Type':'application/json',
                        'Authorization': `Bearer ${user_token}`
                    }
                }).then(res=>{
                    case_Id = res.body.caseId

                    if(case_Id){
                        cy.visit(`/main/client-individual/${userId}/1/transaction-screening-case/${case_Id}`).wait(5000)
                        cy.contains(case_Id)
                    }
                })
            }
        })
    })
})

/**
 * @suite Transaction Screening via UI
 * @description Executes transaction screening from the Administration UI and navigates to the created case.
 * @prerequisites User has access to Administration → Check Transaction Screening page.
 * @testData Business entity name="Test Company LLC".
 */
describe('Performing Transaction Screening With UI', ()=>{

    /**
     * @scenario Check Transaction Screening (UI)
     * @description Selects regulation group and client, adds a business entity, performs screening, then opens the case.
     * @priority Medium
     * @steps Navigate to /administration/check-transaction-screening.
     * @steps Select a regulation group (first row) and a client (first row) from dropdown grids.
     * @steps Click "Add Business Entity" and set name to "Test Company LLC".
     * @steps Click "Perform Transaction Screening" and verify the case number appears.
     * @steps Click "Go to Case" and verify the case page loads without errors.
     * @expectedResult "Transaction Screening Case Number:" is displayed; case page shows "Transaction Screening Case" and no "Unexpected Error".
     */
    it('Check Transaction Screening', ()=>{
        cy.visit('/administration/check-transaction-screening').wait(2000)

        cy.get('dx-drop-down-box').eq(0).click().wait(500)
        cy.get('#dynamicSelectBoxDropdownGrid .dx-datagrid-rowsview .dx-datagrid-content table tr').eq(0).click().wait(1000)

        cy.get('dx-drop-down-box').eq(1).click().wait(2000)
        cy.get('#clientsFilteringDataGrid .dx-datagrid-rowsview .dx-datagrid-content table tr').eq(0).click().wait(1000)

        cy.contains('sa-button', 'Add Business Entity').click().wait(500)
        cy.getByFormControlName('name').type('Test Company LLC')

        cy.contains('sa-button', 'Perform Transaction Screening').click().wait(6000)
        cy.contains('Transaction Screening Case Number: ')

        cy.contains('sa-button', 'Go to Case').click().wait(4000)
        cy.contains('Transaction Screening Case')
        cy.contains('Unexpected Error').should('not.exist')
        cy.contains(case_Id+1)
    })
})

