import {faker} from "@faker-js/faker";
import {navigateToClientMenu} from "../../support/e2e";

let IdNumber = 12345678
let location = '';
describe('Internal Screening - Individual', ()=>{
    before(()=>{
        // add blacklist reason
        cy.visit('/administration/internal-blacklists-setup').wait(3000)
        cy.get('span').contains('Internal Blacklist Reasons').click().wait(1500)
        cy.contains('Add').click().wait(1000)
        cy.getByFormControlName('name').type('Fraud')
        cy.getByFormControlName('externalReference').type(faker.string.alphanumeric(12))
        cy.getByDataCy('save-blacklist-reason').click()
        //if reason exists close the form
        // cy.get("p:contains('Internal Blacklisted Reason already exists.')").then((el)=>{
        //     if(el.is(':visible')){
        //         cy.getByDataCy('Close-Blacklist-Reason-Form').click()
        //     }            
        // })
        cy.wait(1000)
        
        // add internal blacklist
        cy.visit('/administration/internal-blacklists-setup').wait(3000)
        cy.get('span').contains('Individuals').click()
        cy.contains('Add').click()
        cy.wait(1000)
        cy.getByFormControlName('firstName').type(faker.person.firstName())
        cy.getByFormControlName('lastName').type(faker.person.lastName())
        cy.getByFormControlName('dateOfBirth').type(faker.date.birthdate().toISOString().slice(0, 10))
        cy.getByFormControlName('taxIdentificationNumber').eq(0).type(IdNumber.toString())
        // cy.getByFormControlName('taxIdentificationNumber').type(faker.string.alphanumeric(15))
        cy.getByDataCy('blacklistedReason').click()
        cy.get('#dynamicSelectBoxDropdownGrid table').contains('td', 'Fraud').click({ force: true });
        cy.wait(1000)
        cy.getByDataCy('markedDate').type(faker.date.recent().toISOString().slice(0, 10))
        cy.contains('Save').click({force:true})
        cy.wait(1000)

    })

    
    it('Performs Internal blacklists search', ()=>{
        navigateToClientMenu('Individual')

        cy.get('.left-secondary-menu .left-menu-items.main-menu li>sa-menu-item>a').contains('span', 'Internal Screening').click().wait(2000);

        cy.location('pathname').then((loc)=>{
            location = loc
        })
        
        cy.contains('Internal Black Lists Search').click()
        cy.wait(1000)
        // cy.getByFormControlName('firstName').clear()
        // cy.getByFormControlName('lastName').clear()
        // cy.getByFormControlName('dateOfBirth').clear()
        cy.getByFormControlName('taxIdentificationNumber').type(IdNumber.toString())
        cy.getByDataCy('search-blacklisted-individual').click()
        cy.contains('Internal search has been executed.')
        
        // cy.getByDataCy('search-results').find('tbody>tr').contains('12345678')
        

        cy.wait(1500)
    })
    
    
    // it('Performs internal monitoring', ()=>{
    //    
    // })
})