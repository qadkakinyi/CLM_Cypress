import {faker} from "@faker-js/faker";

describe('Transaction Types', ()=>{
    beforeEach(()=>{
        cy.visit('/settings/transactions-setup').wait(2000)
    })

    it('Adds a Transaction Type', ()=>{
        cy.contains('sa-button', 'Add').click().wait(1000)
        cy.getByFormControlName('name').eq(1).type('Transfer DKA')
        cy.getByFormControlName('mappingReference').eq(1).type(faker.string.alphanumeric(13))

        cy.get('[data-test="saveTransactionType"] > .sa-button').click().wait(1000)
        cy.contains('Transaction type has been added')
    })

    it('Edits a Transaction Type', () => {

        cy.get('#gridTransactionTypes tr .dx-first-cell .dx-texteditor-input').type('Transfer DKA', {force:true}).wait(2000)
        cy.get('#gridTransactionTypes tr td').find('.dx-icon-edit').eq(0).click({force:true}).wait(1000)

        cy.get('#gridTransactionTypes .dx-datagrid-table .dx-texteditor-container > .dx-texteditor-input-container > .dx-texteditor-input').as('transactionTypes')

        cy.get('@transactionTypes').eq(4).clear().wait(1000).type('DKA Transfer', {force: true}).wait(1000)
        cy.get('tr td').find('.dx-icon-save').eq(1).click().wait(1500)

        cy.contains(`Transaction type has been updated.`)
    })

    it('Deletes a Game Type', () => {

        cy.get('#gridTransactionTypes tr .dx-first-cell .dx-texteditor-input').type('DKA Transfer', {force:true}).wait(2000)
        cy.get('#gridTransactionTypes tr td').find('.dx-icon-trash').eq(1).click({force: true}).wait(1000)
        cy.get('.dx-popup-normal').contains('Yes').click({force: true}).wait(1000);

        cy.contains(`Transaction type has been deleted.`)
    })
})

describe('Transaction Methods', ()=>{
    beforeEach(()=>{
        cy.visit('/settings/transactions-setup').wait(2000)
        cy.contains('Transaction Methods').click().wait(2000)
    })

    it('Adds a Transaction Method', ()=>{
        cy.contains('sa-button', 'Add').click().wait(1000)
        cy.getByFormControlName('name').eq(0).type('DKA B2B Transfer')
        cy.getByFormControlName('mappingReference').eq(0).type(faker.string.alphanumeric(13))

        cy.contains('button', 'Save').click().wait(1000)
        cy.contains('Transaction method has been added').wait(1000)
    })

    it('Edits a Transaction Method', () => {

        cy.get('#gridTransactionMethods tr .dx-first-cell .dx-texteditor-input').type('DKA B2B Transfer', {force:true}).wait(2000)
        cy.get('#gridTransactionMethods tr td').find('.dx-icon-edit').eq(0).click({force:true}).wait(1000)

        cy.get('#gridTransactionMethods .dx-datagrid-table .dx-texteditor-container > .dx-texteditor-input-container > .dx-texteditor-input').as('methods')

        cy.get('@methods').eq(3).clear().wait(1000).type('B2B DKA Transfer', {force: true}).wait(1000)
        cy.get('tr td').find('.dx-icon-save').eq(1).click().wait(1500)

        cy.contains(`Transaction method has been updated.`).wait(1000)
    })

    it('Deletes a Transaction Method', () => {

        cy.get('#gridTransactionMethods tr .dx-first-cell .dx-texteditor-input').type('B2B DKA Transfer', {force:true}).wait(2000)
        cy.get('#gridTransactionMethods tr td').find('.dx-icon-trash').eq(1).click({force: true}).wait(1000)
        cy.get('.dx-popup-normal').contains('Yes').click({force: true}).wait(1000);

        cy.contains(`Transaction method has been deleted.`)
    })
})

describe('Execution Status Threshold', ()=>{
    beforeEach(()=>{
        cy.visit('/settings/transactions-setup').wait(2000)
        cy.contains('Execution Status Threshold').click().wait(2000)
    })

    it('Edits a Gaming Transaction Type', () => {

        cy.get('#gridLiveTransactionStatusThreshold tr .dx-first-cell .dx-texteditor-input').type('Accepted', {force:true}).wait(2000)
        cy.get('#gridLiveTransactionStatusThreshold tr td').find('.dx-icon-edit').last().click({force:true}).wait(1000)

        cy.get('#gridLiveTransactionStatusThreshold .dx-datagrid-table .dx-texteditor-container > .dx-texteditor-input-container > .dx-texteditor-input').as('thresholds')

        cy.get('@thresholds').eq(3).clear().wait(1000).type('1', {force: true}).wait(1000)
        cy.get('tr td').find('.dx-icon-save').eq(1).click().wait(3000)
        
        //revert
        // cy.get('#gridLiveTransactionStatusThreshold tr .dx-first-cell .dx-texteditor-input').type('Accepted', {force:true}).wait(2000)
        cy.get('#gridLiveTransactionStatusThreshold tr td').find('.dx-icon-edit').last().click({force:true}).wait(1000)

        cy.get('#gridLiveTransactionStatusThreshold .dx-datagrid-table .dx-texteditor-container > .dx-texteditor-input-container > .dx-texteditor-input').as('thresholds')

        cy.get('@thresholds').eq(3).clear().wait(1000).type('0', {force: true}).wait(1000)
        cy.get('tr td').find('.dx-icon-save').eq(1).click().wait(1500)

        cy.contains(`Execution status threshold has been updated.`)
    })
    
})