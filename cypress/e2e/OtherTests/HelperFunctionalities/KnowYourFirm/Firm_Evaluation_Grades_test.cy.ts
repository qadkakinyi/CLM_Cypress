
describe('Firm Impact Score', ()=>{

    beforeEach(()=>{
        cy.visit('/settings/firm-evaluation-grades').wait(2000)
    })

    it('Adds a Firm Impact Score', ()=>{

        cy.contains('sa-button','Add').click().wait(1000)
        cy.getByFormControlName('name').eq(0).type('Test DKA')

        //regulation group
        cy.get('dx-drop-down-box').eq(0).click().wait(500)
        cy.get('#dynamicSelectBoxDropdownGrid').find('.dx-datagrid-rowsview').find('tr > td').first().click().wait(500)
        
        cy.getByFormControlName('riskPointFrom').eq(0).type('1')
        cy.getByFormControlName('riskPointTo').eq(0).type('3')
        
        //color
        cy.get('dx-drop-down-box').eq(1).click().wait(500)
        cy.get('#dynamicSelectBoxDropdownGrid .dx-datagrid-rowsview .dx-datagrid-content tr td').contains('Coral').click({force:true}).wait(500)

        cy.get('#addFirmImpactScoreForm > .custom-backround-transparent > .row > .col > [icon="save"]').eq(0).click().wait(1000)

        cy.contains('The firm impact score has been added').wait(1000)
    })

    it('Edits a Firm Impact Score', () => {

        cy.get('#gridFirmImpactScores tr .dx-first-cell .dx-texteditor-input').type('Test DKA', {force:true}).wait(2000)
        cy.get('#gridFirmImpactScores tr td').find('.dx-icon-edit').eq(0).click({force:true}).wait(1000)

        cy.get('#gridFirmImpactScores .dx-datagrid-table .dx-texteditor-container > .dx-texteditor-input-container > .dx-texteditor-input').as('scores')

        cy.get('@scores').eq(5).clear().wait(1000).type('Test Impact Score DKA', {force: true}).wait(1000)
        cy.get('tr td').find('.dx-icon-save').eq(1).click().wait(1500)

        cy.contains(`The firm impact score has been updated.`).wait(1000)
    })

    it('Deletes a Firm Impact Score', () => {

        cy.get('#gridFirmImpactScores tr .dx-first-cell .dx-texteditor-input').type('Test Impact Score DKA', {force:true}).wait(2000)
        cy.get('#gridFirmImpactScores tr td').find('.dx-icon-trash').eq(1).click({force: true}).wait(1000)
        cy.get('.dx-popup-normal').contains('Yes').click({force: true}).wait(1000);

        cy.contains(`The firm impact score has been deleted.`).wait(1000)
    })

})

describe('Firm Residual Risk', ()=>{

    beforeEach(()=>{
        cy.visit('/settings/firm-evaluation-grades').wait(2000)
        cy.contains('Firm Residual Risk').click().wait(2000)
    })

    it('Adds a Firm Residual Risk', ()=>{

        cy.contains('sa-button','Add').click().wait(1000)
        cy.getByFormControlName('name').eq(1).type('Test DKA')

        //regulation group
        cy.get('dx-drop-down-box').eq(2).click().wait(500)
        cy.get('#dynamicSelectBoxDropdownGrid').find('.dx-datagrid-rowsview').find('tr > td').first().click().wait(500)

        cy.getByFormControlName('riskPoint').eq(0).type('1')

        //color
        cy.get('dx-drop-down-box').eq(3).click().wait(500)
        cy.get('#dynamicSelectBoxDropdownGrid .dx-datagrid-rowsview .dx-datagrid-content tr td').contains('Coral').click({force:true}).wait(500)

        cy.get('#addFirmResidualRiskForm > .custom-backround-transparent > .row > .col > [icon="save"] > .sa-button').click().wait(1000)

        cy.contains('The firm residual risk has been added').wait(1000)
    })

    it('Edits a Firm Residual Risk', () => {

        cy.get('#gridFirmResidualRisks tr .dx-first-cell .dx-texteditor-input').type('Test DKA', {force:true}).wait(2000)
        cy.get('#gridFirmResidualRisks tr td').find('.dx-icon-edit').eq(0).click({force:true}).wait(1000)

        cy.get('#gridFirmResidualRisks .dx-datagrid-table .dx-texteditor-container > .dx-texteditor-input-container > .dx-texteditor-input').as('scores')

        cy.get('@scores').eq(4).clear().wait(1000).type('Test Residual Risk DKA', {force: true}).wait(1000)
        cy.get('tr td').find('.dx-icon-save').eq(1).click().wait(1500)

        cy.contains(`The firm residual risk has been updated.`).wait(1000)
    })

    it('Deletes a Firm Residual Risk', () => {

        cy.get('#gridFirmResidualRisks tr .dx-first-cell .dx-texteditor-input').type('Test Residual Risk DKA', {force:true}).wait(2000)
        cy.get('#gridFirmResidualRisks tr td').find('.dx-icon-trash').eq(1).click({force: true}).wait(1000)
        cy.get('.dx-popup-normal').contains('Yes').click({force: true}).wait(1000);

        cy.contains(`The firm residual risk has been deleted.`).wait(1000)
    })

})


describe('Firm Overall Risk Score', ()=>{

    beforeEach(()=>{
        cy.visit('/settings/firm-evaluation-grades').wait(2000)
        cy.contains('Firm Overall Risk Score').click().wait(2000)
    })

    it('Adds a Firm Overall Risk Score', ()=>{

        cy.contains('sa-button','Add').click().wait(1000)
        cy.getByFormControlName('name').eq(2).type('Test DKA')

        //regulation group
        cy.get('dx-drop-down-box').eq(4).click().wait(500)
        cy.get('#dynamicSelectBoxDropdownGrid').find('.dx-datagrid-rowsview').find('tr > td').first().click().wait(500)

        cy.getByFormControlName('riskPointFrom').eq(1).type('1')
        cy.getByFormControlName('riskPointTo').eq(1).type('4')

        //color
        cy.get('dx-drop-down-box').eq(5).click().wait(500)
        cy.get('#dynamicSelectBoxDropdownGrid .dx-datagrid-rowsview .dx-datagrid-content tr td').contains('Coral').click({force:true}).wait(500)
        
        cy.getByFormControlName('nextEvaluationDays').type('30')

        cy.get('#addFirmOverallRiskScoreForm > .custom-backround-transparent > .row > .col > [icon="save"] > .sa-button').click().wait(1000)

        cy.contains('The firm overall risk score has been added').wait(1000)
    })

    it('Edits a Firm Overall Risk Score', () => {

        cy.get('#gridFirmOverallRiskScores tr .dx-first-cell .dx-texteditor-input').type('Test DKA', {force:true}).wait(2000)
        cy.get('#gridFirmOverallRiskScores tr td').find('.dx-icon-edit').eq(0).click({force:true}).wait(1000)

        cy.get('#gridFirmOverallRiskScores .dx-datagrid-table .dx-texteditor-container > .dx-texteditor-input-container > .dx-texteditor-input').as('scores')

        cy.get('@scores').eq(6).clear().wait(1000).type('Test Overall Risk Score DKA', {force: true}).wait(1000)
        cy.get('tr td').find('.dx-icon-save').eq(1).click().wait(1500)

        cy.contains(`The firm overall risk score has been updated.`).wait(1000)
    })

    it('Deletes a Firm Overall Risk Score', () => {

        cy.get('#gridFirmOverallRiskScores tr .dx-first-cell .dx-texteditor-input').type('Test Overall Risk Score DKA', {force:true}).wait(2000)
        cy.get('#gridFirmOverallRiskScores tr td').find('.dx-icon-trash').eq(1).click({force: true}).wait(1000)
        cy.get('.dx-popup-normal').contains('Yes').click({force: true}).wait(1000);

        cy.contains(`The firm overall risk score has been deleted.`).wait(1000)
    })

})