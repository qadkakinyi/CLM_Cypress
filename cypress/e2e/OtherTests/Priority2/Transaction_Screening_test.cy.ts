let user_token = '';
let userId = '';
let case_Id = '';
let api_baseUrl = Cypress.env('api_baseUrl')
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
describe('Transaction Screening with APIS', ()=>{
    
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

describe('Performing Transaction Screening With UI', ()=>{

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