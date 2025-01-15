import {faker} from "@faker-js/faker";

describe('Game Types', ()=>{
    beforeEach(()=>{
        cy.visit('/settings/gaming-setups').wait(2000)
    })
    
    it('Adds a Game Type', ()=>{
        cy.contains('sa-button', 'Add').click().wait(1000)
        cy.getByFormControlName('name').eq(0).type('Action Games')
        cy.getByFormControlName('mappingReference').eq(0).type(faker.string.alphanumeric(13))
        
        cy.contains('sa-button', 'Save').click().wait(1000)
        cy.contains('Game type has been added')
    })

    it('Edits a Game Type', () => {
       
        cy.get('#gridGameTypes tr .dx-first-cell .dx-texteditor-input').type('Action Games', {force:true}).wait(2000)
        cy.get('#gridGameTypes tr td').find('.dx-icon-edit').eq(0).click({force:true}).wait(1000)

        cy.get('#gridGameTypes .dx-datagrid-table .dx-texteditor-container > .dx-texteditor-input-container > .dx-texteditor-input').as('gameTypes')

        cy.get('@gameTypes').eq(3).clear().wait(1000).type('Adventure Games', {force: true}).wait(1000)
        cy.get('tr td').find('.dx-icon-save').eq(1).click().wait(1500)

        cy.contains(`Game type has been updated.`)
    })

    it('Deletes a Game Type', () => {
       
        cy.get('#gridGameTypes tr .dx-first-cell .dx-texteditor-input').type('Adventure Games', {force:true}).wait(2000)
        cy.get('#gridGameTypes tr td').find('.dx-icon-trash').eq(1).click({force: true}).wait(1000)
        cy.get('.dx-popup-normal').contains('Yes').click({force: true}).wait(1000);

        cy.contains(`Game type has been deleted.`)
    })
})

describe('Gaming Account Statuses', ()=>{
    beforeEach(()=>{
        cy.visit('/settings/gaming-setups').wait(2000)
        cy.contains('Gaming Account Statuses').click().wait(2000)
    })

    it('Adds a Gaming Account Status', ()=>{
        cy.contains('sa-button', 'Add').click().wait(1000)
        cy.getByFormControlName('name').eq(1).type('Blocked')
        cy.getByFormControlName('mappingReference').eq(1).type(faker.string.alphanumeric(13))

        cy.getByDataCy('Save-client-gaming-status').click().wait(1000)
        cy.contains('Gaming account status has been added')
    })

    it('Edits a Gaming Account Status', () => {

        cy.get('#gridGamingAccountStatuses tr .dx-first-cell .dx-texteditor-input').type('Blocked', {force:true}).wait(2000)
        cy.get('#gridGamingAccountStatuses tr td').find('.dx-icon-edit').eq(0).click({force:true}).wait(1000)

        cy.get('#gridGamingAccountStatuses .dx-datagrid-table .dx-texteditor-container > .dx-texteditor-input-container > .dx-texteditor-input').as('statuses')

        cy.get('@statuses').eq(3).clear().wait(1000).type('Unblocked', {force: true}).wait(1000)
        cy.get('tr td').find('.dx-icon-save').eq(1).click().wait(1500)

        cy.contains(`Gaming account status has been updated.`)
    })

    it('Deletes a Gaming Account Status', () => {

        cy.get('#gridGamingAccountStatuses tr .dx-first-cell .dx-texteditor-input').type('Unblocked', {force:true}).wait(2000)
        cy.get('#gridGamingAccountStatuses tr td').find('.dx-icon-trash').eq(1).click({force: true}).wait(1000)
        cy.get('.dx-popup-normal').contains('Yes').click({force: true}).wait(1000);

        cy.contains(`Gaming account status has been deleted.`)
    })
})

describe('Gaming Transaction Types', ()=>{
    beforeEach(()=>{
        cy.visit('/settings/gaming-setups').wait(2000)
        cy.contains('Gaming Transaction Types').click().wait(2000)
    })

    it('Adds a Gaming Transaction Type', ()=>{
        cy.contains('sa-button', 'Add').click().wait(1000)
        cy.getByFormControlName('name').eq(2).type('DKA Type')
        cy.getByFormControlName('mappingReference').eq(2).type(faker.string.alphanumeric(13))
        
        cy.get('#addGamingTransactionTypeForm [icon="save"]').click().wait(1000)
        cy.contains('Gaming transaction type has been added')
    })

    it('Edits a Gaming Transaction Type', () => {

        cy.get('#gridGamingTransactionType tr .dx-first-cell .dx-texteditor-input').type('DKA Type', {force:true}).wait(2000)
        cy.get('#gridGamingTransactionType tr td').find('.dx-icon-edit').eq(0).click({force:true}).wait(1000)

        cy.get('#gridGamingTransactionType .dx-datagrid-table .dx-texteditor-container > .dx-texteditor-input-container > .dx-texteditor-input').as('transactionTYpes')

        cy.get('@transactionTYpes').eq(3).clear().wait(1000).type('Type DKA', {force: true}).wait(1000)
        cy.get('tr td').find('.dx-icon-save').eq(1).click().wait(1500)

        cy.contains(`Gaming transaction type has been updated.`)
    })

    it('Deletes a Gaming Transaction Type', () => {

        cy.get('#gridGamingTransactionType tr .dx-first-cell .dx-texteditor-input').type('Type DKA', {force:true}).wait(2000)
        cy.get('#gridGamingTransactionType tr td').find('.dx-icon-trash').eq(1).click({force: true}).wait(1000)
        cy.get('.dx-popup-normal').contains('Yes').click({force: true}).wait(1000);

        cy.contains(`Gaming transaction type has been deleted.`)
    })
})