import {faker} from "@faker-js/faker";
import {navigateToClientMenu} from "../../support/e2e";

let location = '';
describe('Adds, Edits and Deletes Tax Residency - Corporate', ()=>{
    it('Adds Tax Residency', ()=>{
        navigateToClientMenu('Corporate')

        cy.get('.left-secondary-menu .left-menu-items.main-menu li>sa-menu-item>a').contains('span', 'Tax Residency').click();
        cy.wait(1000)

        cy.location('pathname').then((pathname)=>{
            location = pathname
        })

        cy.get('sa-button').contains('Add').click()
        cy.wait(1000)
        
        cy.getBySel('countriesList').click().wait(1000)
        cy.get('#dynamicSelectBoxDropdownGrid .dx-datagrid-content').contains('Afghanistan').click()
        // cy.getBySel('reasonsForTinList').click()
        // cy.get('#dynamicSelectBoxDropdownGrid td').contains('Tin Test').click()
        cy.getByFormControlName('notes').type(faker.word.words(5))
        cy.getByFormControlName('explanation').type(faker.word.words(15))
        cy.get('#addTaxResidencyForm').contains('Save').click()
        cy.contains('Tax residency has been added.').wait(2000)
    })
    
    it('Edits a Tax Residency', ()=>{
        cy.visit(location).wait(3000)
        cy.get('.dx-icon-edit').wait(2000).last().click({force:true})
        cy.get('#gridClientTaxResidencies table .dx-row').first().wait(1500)
        cy.get('#gridClientTaxResidencies .dx-texteditor-input').eq(6).click().wait(500)
        cy.get('.dx-scrollable').contains('Algeria').click().wait(500)
        cy.get('.dx-datagrid-content-fixed > .dx-datagrid-table > tbody > .dx-data-row > .dx-command-edit > .dx-link-save').click().wait(1000)
        cy.contains('Tax residency has been updated.').wait(1000)
    })
    
    it('Deletes a Tax Residency', ()=>{
        cy.visit(location).wait(3000)
        cy.get('.dx-icon-trash').last().click({force:true})
        cy.wait(2000)
        cy.contains('Yes').click().wait(1000)
        cy.contains('Tax residency has been deleted.').wait(1000)
    })
})