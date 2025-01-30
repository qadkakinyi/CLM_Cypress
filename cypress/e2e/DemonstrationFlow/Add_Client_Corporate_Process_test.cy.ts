import {faker} from "@faker-js/faker";
const api_baseUrl = Cypress.env('api_baseUrl')

let companyName = faker.company.name()
let token = "";
let location = '';
let clientId = '';
let differentUserID = '';
let DocNumber = faker.number.int(8)
let newDocID = '';
let birthDay = `${faker.date.past({years:20}).toISOString()}`


describe("Add Corporate Client Process", ()=>{

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

    it('should add a corporate client', () => {
        cy.visit('/main/clients').wait(2000)

        //add client api call
        cy.request({
            method: "POST",
            url: `${api_baseUrl}/api/Staging/clientCorporate`,
            headers:{
                "Content-Type": "application/json",
                'Authorization':   `Bearer ${token}`
            },
            body:{
                "registeredName": companyName,
                "registrationNumber": faker.string.alphanumeric(13),
                "externalReference": faker.string.alphanumeric(13),
                "authorisedCapital": 1000000,
                "clientRegulationGroupId": 1,
                "clientStatusId": 3,
                "countryOfIncorporationId": 8,
                "joinedDate": new Date().toISOString(),
                "notes": "This client was created from the Demonstration flow API test",
                "phone": "+25471-234-5678",
                "email": "string",
                "ipAddress": companyName+`@gmail.com`,
                "isClient": true,
                "ignoreAutoOngoingMonitoringStatus": true,
                "issuedCapital": 10000,
                "defaultFullStructureEvaluation": "Yes"
            }
        }).then((res) =>{
            if(res.body){
                cy.get('[aria-colindex="4"]  .dx-texteditor-input-container > .dx-texteditor-input').eq(0).type(companyName).wait(2500)

                cy.get('#gridClients table tr td .dx-header-filter-indicator').eq(0).click({force:true});

                let gridClientsRows = cy.wrap('#gridClients table tbody tr');
                gridClientsRows.get('.dx-command-edit-with-icons a').eq(0).click({ force: true }).wait(2000);
                cy.contains(companyName)
                cy.location('pathname').then(url =>{
                    location = url
                    const pathSections = url.split('/');
                    clientId = pathSections[3]
                }).wait(1500)
            }
        })
    });

    it('should add a client document', () => {
        cy.visit(location).wait(3000)
        cy.get('.left-secondary-menu .left-menu-items.main-menu li>sa-menu-item>a').contains('Documents').scrollIntoView().click().wait(2000);

        cy.request({
            method: "POST",
            url: `${api_baseUrl}/api/clientCommon/${clientId}/documents`,
            headers:{
                "Content-Type": "application/json",
                'Authorization': `Bearer ${token}`
            },
            body:{
                "clientId": `${clientId}`,
                "documentId": 1,
                "collectionStatus": 1,
                "documentForm": 1,
                "documentNumber": "123",
                "countryOfIssueId": 1,
                "dateOfIssue": "",
                "expirationDate": "",
                "collectionDate": "2024-10-29",
                "certifiedDate": "",
                "certifiedByUsername": null,
                "reviewedByUsername": null,
                "customFields": {},
                "comment": "",
                "directoryPathOrUrl": ""
            }
        }).then(res =>{
            console.log(res)
            newDocID = res.body.id
        })
    });

    it('should update document status to collected', () => {
        cy.visit(location).wait(3000)
        cy.get('.left-secondary-menu .left-menu-items.main-menu li>sa-menu-item>a').contains('Documents').scrollIntoView().click().wait(2000);

        cy.request({
            method: "PUT",
            url: `${api_baseUrl}/api/clientCommon/${clientId}/documents`,
            headers:{
                "Content-Type": "application/json",
                'Authorization': `Bearer ${token}`
            },
            body:{
                "id": newDocID,
                "clientId": `${clientId}`,
                "documentId": 1,
                "collectionStatus": 4,
                "verificationStatus": 5,
                "verificationMessage": "",
                "documentForm": 1,
                "documentNumber": "123",
                "countryOfIssueId": 1,
                "dateOfIssue": "",
                "expirationDate": "",
                "collectionDate": "2024-10-24",
                "nextCollectionDate": "2025-10-24",
                "certifiedDate": "",
                "certifiedByUsername": null,
                "reviewedByUsername": null,
                "attachments": [],
                "mandatory": true,
                "directoryPathOrUrl": "",
                "customFields": {},
                "comment": ""
            }
        }).then(res =>{
            console.log(res)
            res.body.collectionStatus = 4
        })
    });

    it('should perform internal monitoring', () => {
        cy.visit(location).wait(3000)
        cy.get('.left-secondary-menu .left-menu-items.main-menu li>sa-menu-item>a').contains('Internal Screening').scrollIntoView().click().wait(2000);
        cy.request({
            method: "POST",
            url : `${api_baseUrl}/api/clientCommon/${clientId}/internalBlackListsOngoingMonitoring`,
            headers:{
                "Content-Type": "application/json",
                'Authorization':   `Bearer ${token}`
            }
        })
        cy.reload()
        cy.wait(2000)
        cy.contains('Remove Internal Monitoring')
    });

    it('should perform internal blacklist search', () => {
        cy.visit(location).wait(3000)
        cy.get('.left-secondary-menu .left-menu-items.main-menu li>sa-menu-item>a').contains('Internal Screening').scrollIntoView().click().wait(2000);

        cy.request({
            method: "POST",
            url: `${api_baseUrl}/api/clientCommon/${clientId}/internalBlackListsSearch`,
            headers:{
                "Content-Type": "application/json",
                'Authorization':   `Bearer ${token}`
            },
            body:{
                "identificationNumber": DocNumber,
                "registeredName": companyName,
                "dateOfBirth": birthDay,
                "idNumber": DocNumber,
                "clientType": 1
            }
        }).then(res=>{
            console.log(res)
            cy.reload()
        })
    });

    it('should add a shareholder', () => {
        cy.visit(location).wait(3000)
        cy.get('.left-secondary-menu .left-menu-items.main-menu li>sa-menu-item>a').contains('span', 'Shareholders/Partners').click();
        
        //get current count of shareholders
        let totalStakeholdersCount 
        cy.request({
            method: 'GET',
            url: `${api_baseUrl}/api/paging/${clientId}/shareholders?skip=0&requireTotalCount=true`,
            headers:{
                "Content-Type": "application/json",
                'Authorization':   `Bearer ${token}`
            }
        }).then(res=>{
            totalStakeholdersCount = res.body.totalCount
        })
        
        cy.request({
            method: 'POST',
            url: `${api_baseUrl}/api/clientCorporates/${clientId}/shareholders`,
            headers:{
                "Content-Type": "application/json",
                'Authorization':   `Bearer ${token}`
            },
            body: {
                "clientId": clientId,
                "shareholderCapacity": 2,
                "includeInEvaluation": true,
                "isControllingPerson": false,
                "isNominee": false,
                "appointmentDate": "2024-10-31",
                "resignationDate": "2024-11-01",
                "isLegalRepresentative": false,
                "profileId": clientId,
                "rateWeightPercentage": 65,
                "numberOfShares": null,
                "clientType": "1",
                "externalReference": null,
                "ignoreAutoOngoingMonitoringStatus": false,
                "clientCorporate": {
                    "appointmentDate": "2024-10-31",
                    "resignationDate": "2024-11-01"
                },
                "customFields": {}
            }
        }).then(res =>{
            // get current count of shareholders
            //expecting the count to be plus 1
            cy.request({
                method: 'GET',
                url: `${api_baseUrl}/api/paging/${clientId}/shareholders?skip=0&requireTotalCount=true`,
                headers:{
                    "Content-Type": "application/json",
                    'Authorization':   `Bearer ${token}`
                }
            }).then(res=>{
                let updatedTotalStakeholderCount = res.body.totalCount
                expect(updatedTotalStakeholderCount).to.equal(totalStakeholdersCount + 1);
            })
        })
    });

    it('should add a capacity', () => {
        cy.visit(location).wait(3000)
        cy.get('.left-secondary-menu .left-menu-items.main-menu li>sa-menu-item>a').contains('span', 'Capacity').click();

        //get current count of shareholders
        let totalCapacityCount
        cy.request({
            method: 'GET',
            url: `${api_baseUrl}/api/paging/${clientId}/authorizedPersons?skip=0&requireTotalCount=true`,
            headers:{
                "Content-Type": "application/json",
                'Authorization':   `Bearer ${token}`
            }
        }).then(res=>{
            totalCapacityCount = res.body.totalCount
        })
        
        // get Clients to select one who will be given a capacity since this current user cannot be given a capacity
        cy.request({
            method: 'POST',
            url: `${api_baseUrl}/api/paging/clients`,
            headers:{
                "Content-Type": "application/json",
                'Authorization':   `Bearer ${token}`
            },
            body:{
                "skip":0,
                "take":1
            }
        }).then(res=>{
            differentUserID = res.body.data[0].id
            let userClientType = res.body.data[0].clientType
            
            cy.request({
                method: 'POST',
                url: `${api_baseUrl}/api/clientCommon/${clientId}/authorizedPersons`,
                headers:{
                    "Content-Type": "application/json",
                    'Authorization':   `Bearer ${token}`
                },
                body: {
                    "clientId": clientId,
                    "capacityId": 4,
                    "includeInEvaluation": true,
                    "isNominee": false,
                    "isLegalRepresentative": false,
                    "isControllingPerson": false,
                    "profileId":  differentUserID,
                    "rateWeightPercentage": 72,
                    "clientType": userClientType,
                    "ignoreAutoOngoingMonitoringStatus": false,
                    "clientCorporate": {
                        "customFields": {}
                    },
                    "appointmentDate": "2024-11-11",
                    "resignationDate": "2024-11-12",
                    "customFields": {}
            }
            }).then(res =>{
                // get current count of capacities
                //expecting the count to be plus 1
                cy.request({
                    method: 'GET',
                    url: `${api_baseUrl}/api/paging/${clientId}/authorizedPersons?skip=0&requireTotalCount=true`,
                    headers:{
                        "Content-Type": "application/json",
                        'Authorization':   `Bearer ${token}`
                    }
                }).then(res=>{
                    let updatedCapacityCount = res.body.totalCount
                    expect(updatedCapacityCount).to.equal(totalCapacityCount + 1);
                })
            })
        })
    });

    it('should archive a client(soft delete)', () => {

        cy.request({
            method: 'DELETE',
            url: `${api_baseUrl}/api/clientCommon/${clientId}/soft`,
            headers:{
                "Content-Type": "application/json",
                'Authorization':   `Bearer ${token}`
            }
        }).then(res=>{
            if (res.body){
                cy.visit(location).wait(2000)
                cy.contains('N/A')
            }
        })
    });
})