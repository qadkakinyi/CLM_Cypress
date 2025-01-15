import {faker} from "@faker-js/faker";

describe('Bank', ()=>{
    it('Add bank', ()=>{
        cy.visit('/settings/banks')
        cy.contains('Add').click()
        cy.wait(1000)
        cy.getByDataCy("bank-name").type(`Xyz Test Bank`)
        cy.getByDataCy("bank-code").type(faker.string.alphanumeric(20))
        cy.getByDataCy("bank-mapping-reference").type(faker.string.alphanumeric(20))
        cy.contains('Save').click().wait(2000)
        cy.contains('The bank has been added')
    })

    it("Edits Address type", ()=>{
        cy.visit('/settings/banks').wait(2000)

        cy.get('#gridBanks tr .dx-first-cell .dx-texteditor-input').type('Xyz Test', {force:true}).wait(2500)
        cy.get('tr td').find('.dx-icon-edit').eq(1).click({force:true}).wait(1000)

        cy.get('#gridBanks .dx-datagrid-table .dx-texteditor-container > .dx-texteditor-input-container > .dx-texteditor-input').eq(6).clear().wait(1000).type('Xyz Bank Test '+faker.string.alphanumeric(3), {force:true}).wait(1000)
        cy.get('tr td').find('.dx-icon-save').eq(1).click().wait(1000)
        cy.contains('The bank has been updated')
    })

    it("Deletes Address type", ()=>{
        cy.visit('/settings/banks').wait(2000)

        cy.get('#gridBanks tr .dx-first-cell .dx-texteditor-input').type('Xyz Bank', {force:true}).wait(2500)
        cy.get('tr td').find('.dx-icon-trash').eq(1).click({ force: true }).wait(1000)
        cy.get('.dx-popup-normal').contains( 'Yes').click({ force: true }).wait(1000);
        cy.contains('The bank has been deleted.')
    })
})