import {navigateToClientMenu, navigateToNewestClientMenu} from "../../../support/e2e";
import {faker} from "@faker-js/faker";

let location = '';
let authorized_Capital = ''
describe('Shareholders/Partners', ()=>{

    it('Adds Shareholder', ()=>{
        let clientName;
        cy.readFile('cypress/fixtures/client_corporate.json').then((data) =>{
            clientName = data.companyName
            navigateToNewestClientMenu(clientName)
        })

        cy.get('.left-secondary-menu .left-menu-items.main-menu li>sa-menu-item>a').contains('span', 'Shareholders/Partners').click().wait(2000);
        cy.getByDataCy('add-stakeholder').click().wait(1000)
        
        cy.location('pathname').then((loc)=>{
            location = loc
        })
        
        cy.getBySel('capacitiesList').click().wait(1000)
        cy.getBySel('dynamicSelectBoxDropdownGrid').contains('Shareholder').click().wait(1000)
        
        cy.getByDataCy('weight-percentage').clear().type(faker.number.int({min:1, max:19}).toString())
        
        cy.getByFormControlName('numberOfShares').wait(500).clear().type(faker.number.int({min:1, max:10}).toString())
        cy.getByFormControlName('isNominee').click()
        cy.getByFormControlName('isControllingPerson').click()
        
        cy.getBySel('controllingPersonTypesList').click()
        cy.getBySel('dynamicSelectBoxDropdownGrid').find('[aria-rowindex="2"]').eq(1).should('be.visible').click()
        cy.getByFormControlName('controllingPersonTypeOther').type(faker.word.words(5))
        
        cy.getByFormControlName('appointmentDate').type(faker.date.past().toISOString().slice(0, 10))
        // cy.getByFormControlName('resignationDate').type(faker.date.recent().toISOString().slice(0, 10))
        
        cy.get('#clientsFilteringDataGrid').click()
        cy.get('#clientsFilteringDataGrid [aria-rowindex="1"]').click().wait(2000)
        cy.get('#addShareholderForm').contains('Save').click()
        cy.contains('The shareholder has been added.').wait(2000)

        cy.location('pathname').then((loc)=>{
            location = loc
        })
    })

    it('Should error out if shares exceed Authorized capital', ()=>{
        cy.visit(location).wait(3000)

        cy.get('.left-secondary-menu .left-menu-items.main-menu li>sa-menu-item>a').contains('span', 'Profile').click().wait(2000);
        cy.getByFormControlName('authorisedCapital').invoke('val').then(inputValue=>{
            authorized_Capital = inputValue
            console.log(authorized_Capital)

            cy.get('.left-secondary-menu .left-menu-items.main-menu li>sa-menu-item>a').contains('span', 'Shareholders/Partners').click().wait(2000);
            cy.getByDataCy('add-stakeholder').click().wait(1000)

            cy.location('pathname').then((loc)=>{
                location = loc
            })

            cy.getBySel('capacitiesList').click()
            cy.getBySel('dynamicSelectBoxDropdownGrid').find('[aria-rowindex="2"]').click()

            cy.getByDataCy('weight-percentage').clear().type(faker.number.int({min:0, max:19}).toString())

            cy.getByFormControlName('numberOfShares').clear().type(authorized_Capital+1).toString() // ensures this is impossible since there is another stakeholder
            cy.getByFormControlName('isNominee').click()
            cy.getByFormControlName('isControllingPerson').click()

            cy.getBySel('controllingPersonTypesList').click()
            cy.getBySel('dynamicSelectBoxDropdownGrid').find('[aria-rowindex="2"]').eq(1).should('be.visible').click()
            cy.getByFormControlName('controllingPersonTypeOther').type(faker.word.words(5))

            cy.getByFormControlName('appointmentDate').type(faker.date.past().toISOString().slice(0, 10))
            cy.getByFormControlName('resignationDate').type(faker.date.recent().toISOString().slice(0, 10))

            cy.get('#clientsFilteringDataGrid').click()
            cy.get('#clientsFilteringDataGrid [aria-rowindex="2"]').click().wait(2000)
            cy.get('#addShareholderForm').contains('Save').click()
            cy.contains('The number of shares exceed the authorised capital.').wait(2000)
            
        })
        
    })
    
    it('Edits Authorized Person', ()=>{
        cy.visit(location).wait(2000)
        cy.get('#gridClientShareholders .dx-icon-chevrondoubleright').should('be.visible').eq(0).click({force:true}).wait(2000)
        cy.get('#editClientShareholderForm')
        cy.getByDataCy('weight-percentage').clear().type(faker.number.int({min:10, max:49}).toString())
        cy.contains('div','Save & Close').click().wait(500)
        cy.contains('Shareholder has been updated.').wait(2000)
    })
    
    it('Deletes Authorized Person', ()=>{
        cy.visit(location).wait(3000)
        cy.get('#gridClientShareholders .dx-icon-trash').should('be.visible').eq(0).click({force:true}).wait(1500)
        cy.contains('Yes').click().wait(500)
        cy.contains('Shareholder has been deleted.')
    })

})