import {faker} from "@faker-js/faker";
import {navigateToClientMenu} from "../../support/e2e";

let client_id = '';
describe('Adds, Edits and Deletes Tax Residency - Individual', ()=>{
    it('Adds Tax Residency', ()=>{
        navigateToClientMenu('Individual')
        cy.wait(3000)

        cy.get('.left-secondary-menu .left-menu-items.main-menu li>sa-menu-item>a').contains('span', 'Tax Residency').click();
        cy.wait(1000)

        cy.location('pathname').then((pathname)=>{
            const pathSections = pathname.split('/');
            client_id = pathSections[3]
        })

        cy.get('sa-button').contains('Add').click()
        cy.wait(1000)
        
        cy.getBySel('countriesList').click().wait(1000)
        cy.get('#dynamicSelectBoxDropdownGrid .dx-datagrid-content').contains('Afghanistan').click()
        // cy.getBySel('reasonsForTinList').click()
        // cy.get('#dynamicSelectBoxDropdownGrid td').contains('Tin Test').click()
        cy.getByFormControlName('notes').type(faker.word.words(5))
        cy.getByFormControlName('explanation').type(faker.word.words(15))
        cy.get('#addTaxResidencyForm').contains('Save').click().wait(1000)
        cy.contains('Tax residency has been added.').wait(1500)
    })
    
    it('Edits a Tax Residency', ()=>{
        cy.visit(`/main/client-individual/${client_id}/1/tax-residencies`).wait(3000)
        cy.get('.dx-icon-edit').last().click({force:true}).wait(2000)
        cy.get('#gridClientTaxResidencies table .dx-row').first().wait(1000)
        cy.get('#gridClientTaxResidencies .dx-texteditor-input').eq(6).click()
        cy.get('.dx-scrollable').contains('Algeria').click({force: true}).wait(1000)
        cy.get('.dx-datagrid-content-fixed > .dx-datagrid-table > tbody > .dx-data-row > .dx-command-edit > .dx-link-save').click().wait(1000)
        cy.contains('Tax residency has been updated.').wait(1500)
    })
    
    it('Deletes a Tax Residency', ()=>{
        cy.visit(`/main/client-individual/${client_id}/1/tax-residencies`).wait(3000)
        cy.get('.dx-icon-trash').last().click({force:true})
        cy.wait(2000)
        cy.contains('Yes').click({force:true}).wait(1000)
        cy.contains('Tax residency has been deleted.').wait(1000)
    })
})