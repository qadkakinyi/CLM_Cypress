import {navigateToClientMenu, navigateToNewestClientMenu} from "../../../support/e2e";
import {faker} from "@faker-js/faker";

let location = '';
let middleName = faker.person.middleName('male');
let firstName = faker.person.firstName('male');
describe('Capacity - Corporate', ()=>{

    it('Adds Authorized Person', ()=>{
        let clientName;
        cy.readFile('cypress/fixtures/client_corporate.json').then((data) =>{
            clientName = data.companyName
            navigateToNewestClientMenu(clientName)
        })
        
        cy.wait(3000)

        cy.get('.left-secondary-menu .left-menu-items.main-menu li>sa-menu-item>a').contains('span', 'Capacity').click();
        cy.getBySel('addAuthorizedPerson').click().wait(1000)

        cy.getBySel('capacitiesList').click()
        cy.getBySel('dynamicSelectBoxDropdownGrid').find('[aria-rowindex="2"]').click()
        
        cy.getByDataCy('weight-percentage').clear().type(faker.number.int({min:1, max:9}).toString())
        
        cy.getByFormControlName('includeInEvaluation').click()
        cy.getByFormControlName('isNominee').click()
        cy.getByFormControlName('isControllingPerson').click()
        
        cy.getBySel('controllingPersonTypesList').click().wait(1000)
        cy.getBySel('dynamicSelectBoxDropdownGrid').find('[aria-rowindex="2"]').eq(1).click()
        cy.getByFormControlName('controllingPersonTypeOther').type(faker.word.words(5))
        
        cy.getByFormControlName('appointmentDate').type(faker.date.past().toISOString().slice(0, 10))
        // cy.getByFormControlName('resignationDate').type(faker.date.recent().toISOString().slice(0, 10))
        
        // cy.getBySel('existingClientsList').click()
        // cy.get('#clientsFilteringDataGrid').find('[aria-rowindex="1"]').click().wait(2000)
        
        // CREATE A NEW PROFILE WITH A MIDDLE NAME
        cy.get('[name="radioProfileCreationType"]').eq(1).wait(200).check()

        cy.get('dx-drop-down-box').eq(2).click().wait(2000); ///here
        cy.get('[data-test="dynamicSelectBoxDropdownGrid"]').eq(2).find('.dx-datagrid-rowsview table tbody tr td').eq(0).click({ force: true }).wait(2000)
        
        cy.get('#addAuthorizedPersonForm input[name="firstName"]').type(firstName);
        cy.get('#addAuthorizedPersonForm input[name="middleName"]').type(middleName);
        cy.get('#addAuthorizedPersonForm input[name="lastName"]').type(faker.person.lastName('male'));

        cy.get('#addAuthorizedPersonForm input[name="externalReference"]').type(faker.string.alphanumeric(12));
        cy.get('#addAuthorizedPersonForm input[name="phone"]').type(faker.string.numeric(8));
        cy.get('#addAuthorizedPersonForm input[name="email"]').type(`${firstName}@gmail.com`);
        cy.get('#addAuthorizedPersonForm input[name="ssn"]').type(faker.string.alphanumeric(10));
        cy.get('#addAuthorizedPersonForm input[name="taxIdentificationNumber"]').type(faker.string.alphanumeric(10));
        cy.get('#addAuthorizedPersonForm input[name="dateOfBirth"]').type(faker.date.birthdate({ min: 18, max: 65, mode: 'age' }).toISOString().slice(0, 10));
        
        cy.get('#addAuthorizedPersonForm textarea[name="notes"]').type(faker.lorem.paragraph());

        cy.get('[data-test="saveClientAuthorizedPerson"] > .sa-button').click().wait(3500)
        cy.contains('The authorized person has been added.').wait(1500)

        cy.location('pathname').then((loc)=>{
            location = loc
        })
    })
    
    it('Edits Authorized Person', ()=>{
        cy.visit(location).wait(4000)
        cy.get('#gridClientAuthorizedPersons .dx-icon-chevrondoubleright').eq(0).click({force:true}).wait(2000)
        cy.get('#editClientAuthorizedPersonForm')
        cy.getByDataCy('weight-percentage').clear().type(faker.number.int({min:10, max:49}).toString())
        
        //check if middle name is found in the tree view
        cy.contains('sa-tree-view',`${firstName} ${middleName}`)
        cy.contains('div','Save & Close').click().wait(1000)
        cy.contains('The capacity has been updated.').wait(2500)
    })
    
    it('Deletes Authorized Person', ()=>{
        cy.visit(location).wait(3000)
        cy.get('#gridClientAuthorizedPersons .dx-icon-trash').first().click({force:true}).wait(3000)
        cy.contains('Yes').click().wait(1500)
        cy.contains('The authorized person has been deleted.').wait(1500)
    })

})