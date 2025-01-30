import {faker} from "@faker-js/faker";
const api_baseUrl = Cypress.env('api_baseUrl')

let firstName = faker.person.firstName()
let lastName = faker.person.lastName()
let token = "";
let location = '';
let clientId = '';
let DocNumber = faker.number.int(8)
let newDocID = '';
let birthDay = `${faker.date.past({years:20}).toISOString()}`

describe("Add Individual Client Process", ()=>{
    
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
    
    it('should add an individual client', () => {
        cy.visit('/main/clients').wait(2000)
        
        //add client api call
        cy.request({
            method: "POST",
            url: `${api_baseUrl}/api/Staging/clientIndividual`,
            headers:{
                "Content-Type": "application/json",
                'Authorization':   `Bearer ${token}`
            },
            body:{
                externalReference: `${faker.string.alphanumeric(10)}`,
                firstName: firstName,
                lastName: lastName,
                middleName: "Doe",
                clientRegulationGroupId: 1,
                clientStatusId: 3,
                countryOfBirthId: 8,
                dateOfBirth: birthDay,
                joinedDate: new Date().toISOString(),
                notes: "This client was created from the Demonstration flow API test",
                phone: `${faker.phone.number()}`,
                email: `${firstName+lastName}@gmail.com`,
                ipAddress: `${faker.internet.ip()}`,
                isClient: true,
                ignoreAutoOngoingMonitoringStatus: false,
                gender: "Male = 1",
                ssn: `${faker.string.alphanumeric(10)}`,
                taxIdentificationNumber: `${faker.string.alphanumeric(15)}`
            }
        }).then((res) =>{
            if(res.body){
                cy.get('[aria-colindex="4"]  .dx-texteditor-input-container > .dx-texteditor-input').eq(0).type(firstName+' '+lastName).wait(2500)

                cy.get('#gridClients table tr td .dx-header-filter-indicator').eq(0).click({force:true});

                let gridClientsRows = cy.wrap('#gridClients table tbody tr');
                gridClientsRows.get('.dx-command-edit-with-icons a').eq(0).click({ force: true }).wait(2000);
                cy.contains(firstName+' '+lastName)
                cy.location('pathname').then(url =>{
                    location = url
                    const pathSections = url.split('/');
                    clientId = pathSections[3]
                }).wait(1500)
            }
        })
    });

    it('should add a client document', () => {
        cy.visit(location).wait(2000)
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
                "collectionDate": "2024-10-24",
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
        cy.visit(location).wait(2000)
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

    it('should add to internal monitoring', () => {
        cy.visit(location).wait(2000)
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
        cy.visit(location).wait(2000)
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
                "firstName": firstName,
                "lastName": lastName,
                "dateOfBirth": new Date(birthDay),
                "idNumber": DocNumber,
                "clientType": 1
            }
        }).then(res=>{
            console.log(res)
            cy.reload()
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
                cy.contains('null null')
            } 
        })
    });
})