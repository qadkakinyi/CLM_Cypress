/**
 * @testSuite Internal Screening - Individual
 * @description Sets up internal blacklist reason and individual, then verifies internal blacklist search flow from an individual client's Internal Screening page.
 * @priority High
 * @owner QA Team
 * @tags regression, internal-screening, smoke
 * @dependencies navigateToNewestClientMenu
 */

import {faker} from "@faker-js/faker";
import {navigateToClientMenu, navigateToNewestClientMenu} from "../../../support/e2e";

let IdNumber = 12345678
let location = '';

describe('Internal Screening - Individual', ()=>{

    /**
     * @setup Create prerequisites
     * @steps Add "Fraud" internal blacklist reason
     * @steps Add an internal blacklisted individual linked to that reason
     * @expectedResult Reason and individual exist for subsequent search
     */
    before(()=>{
        // add blacklist reason
        cy.visit('/administration/internal-blacklists-setup').wait(3000)
        cy.get('span').contains('Internal Blacklist Reasons').click().wait(1500)
        cy.contains('sa-button','Add').click().wait(1000)
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
        cy.contains('sa-button','Add').click()
        cy.wait(1000)
        cy.getByFormControlName('firstName').type(faker.person.firstName())
        cy.getByFormControlName('lastName').type(faker.person.lastName())
        cy.getByFormControlName('dateOfBirth').type(faker.date.birthdate().toISOString().slice(0, 10))
        // cy.getByFormControlName('taxIdentificationNumber').eq(0).type(IdNumber.toString())
        // cy.getByFormControlName('taxIdentificationNumber').type(faker.string.alphanumeric(15))
        cy.getByDataCy('blacklistedReason').click()
        cy.get('#dynamicSelectBoxDropdownGrid table').contains('td', 'Fraud').click({ force: true });
        cy.wait(1000)
        cy.getByDataCy('markedDate').type(faker.date.recent().toISOString().slice(0, 10))
        cy.contains('Save').click({force:true})
        cy.wait(1000)

    })

    /**
     * @scenario Perform Internal Blacklists Search
     * @steps Open newest individual client
     * @steps Navigate to Internal Screening
     * @steps Open Internal Black Lists Search and search by ID number
     * @expectedResult Search executes and confirmation toast/message appears
     */
    it('Performs Internal blacklists search', ()=>{
        let clientName;
        cy.readFile('cypress/fixtures/client_individual.json').then((data) =>{
            clientName = data.individualClientName
            navigateToNewestClientMenu(clientName)
        })

        cy.get('.left-secondary-menu .left-menu-items.main-menu li>sa-menu-item>a').contains('span', 'Internal Screening').click().wait(2000);

        cy.location('pathname').then((loc)=>{
            location = loc
        })

        cy.contains('Internal Black Lists Search').click()
        cy.wait(1000)
        // cy.getByFormControlName('firstName').clear()
        // cy.getByFormControlName('lastName').clear()
        // cy.getByFormControlName('dateOfBirth').clear()
        // cy.getByFormControlName('taxIdentificationNumber').type(IdNumber.toString())
        cy.getByFormControlName('idNumber').type(IdNumber.toString())
        cy.getByDataCy('search-blacklisted-individual').click()
        cy.contains('Internal search has been executed.')

        // cy.getByDataCy('search-results').find('tbody>tr').contains('12345678')


        cy.wait(1500)
    })

    // it('Performs internal monitoring', ()=>{
    //   
    // })
})

