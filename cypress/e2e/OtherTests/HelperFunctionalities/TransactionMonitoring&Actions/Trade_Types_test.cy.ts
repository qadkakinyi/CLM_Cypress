import {faker} from "@faker-js/faker";

describe('Trade Types', ()=>{
    beforeEach(()=>{
        cy.visit('/settings/trade-types').wait(2000)
    })

    it('Adds a Trade Type', ()=>{
        cy.contains('sa-button', 'Add').click().wait(1000)
        cy.getByFormControlName('name').eq(0).type('Trade Type DKA')
        cy.getByFormControlName('mappingReference').eq(0).type(faker.string.alphanumeric(13))

        cy.get('#addTradeTypeForm > .custom-backround-transparent > .row > .col > [icon="save"] > .sa-button').click().wait(1000)
        cy.contains('Trade type has been added')
    })

    it('Edits a Trade Type', () => {

        cy.get('#gridTradeTypes tr .dx-first-cell .dx-texteditor-input').type('Trade Type DKA', {force:true}).wait(2000)
        cy.get('#gridTradeTypes tr td').find('.dx-icon-edit').eq(0).click({force:true}).wait(1000)

        cy.get('#gridTradeTypes .dx-datagrid-table .dx-texteditor-container > .dx-texteditor-input-container > .dx-texteditor-input').as('tradetypes')

        cy.get('@tradetypes').eq(3).clear().wait(1000).type('DKA Trade Type', {force: true}).wait(1000)
        cy.get('tr td').find('.dx-icon-save').eq(1).click().wait(1500)

        cy.contains(`The trade type has been updated.`).wait(1000)
    })

    it('Deletes a Trade Type', () => {

        cy.get('#gridTradeTypes tr .dx-first-cell .dx-texteditor-input').type('DKA Trade Type', {force:true}).wait(2000)
        cy.get('#gridTradeTypes tr td').find('.dx-icon-trash').eq(1).click({force: true}).wait(1000)
        cy.get('.dx-popup-normal').contains('Yes').click({force: true}).wait(1000);

        cy.contains(`The trade type has been deleted.`).wait(1000)
    })
})