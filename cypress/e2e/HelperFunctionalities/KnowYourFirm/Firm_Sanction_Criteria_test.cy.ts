
describe('Firm Sanction Criteria', ()=>{

    beforeEach(()=>{
        cy.visit('/settings/firm-sanction-criteria').wait(3000)
    })

    it('Adds a Firm Sanction Criteria', ()=>{

        cy.contains('sa-button','Add').click().wait(1000)
        cy.getByFormControlName('name').eq(0).type('Test DKA')
        cy.getByFormControlName('riskPoint').eq(0).type('4')

        //regulation group
        cy.get('dx-drop-down-box').eq(0).click().wait(500)
        cy.get('#dynamicSelectBoxDropdownGrid').find('.dx-datagrid-rowsview').find('tr > td').first().click().wait(500)

        //category
        cy.get('dx-drop-down-box').eq(1).click().wait(500)
        cy.get('#dynamicSelectBoxDropdownGrid .dx-datagrid-rowsview .dx-datagrid-content tr td').contains('Client Base').click({force:true}).wait(500)

        cy.get('.custom-background-transparent > .row > .col > [icon="save"] > .sa-button').click().wait(1000)

        cy.contains('The criterion has been added').wait(1000)
    })

    it('Edits a Firm Sanction Criteria', () => {

        cy.get('#gridSanctionCriteria tr .dx-first-cell .dx-texteditor-input').type('Test DKA', {force:true}).wait(3000)
        cy.get('#gridSanctionCriteria tr td').find('.fa-angle-double-right').eq(0).click({force:true}).wait(1000)

        cy.getByFormControlName('name').eq(0).clear().wait(200).type('DKA Test Sanction Criteria')

        // disable status
        cy.get('dx-drop-down-box').eq(2).click().wait(500)
        cy.contains('Disabled').click().wait(500)
        
        cy.get('.caret').wait(500).click()
        cy.get('.save-and-close-link').click().wait(1000)

        cy.contains(`The Firm Sanction Criterion has been updated.`).wait(1000)
    })
    
    it('Adds, Edits and Deletes a Criterion Answer', ()=>{
        cy.get('#gridSanctionCriteria tr .dx-first-cell .dx-texteditor-input').type('DKA Test Sanction Criteria', {force:true}).wait(2000)
        cy.get('#gridSanctionCriteria tr td').find('.fa-angle-double-right').eq(0).click({force:true}).wait(1000)
        
        //add criterion answer
        cy.get('app-firm-sanction-criterion').contains('sa-button', 'Add').click().wait(500)
        cy.get('#addAnswerForm').getByFormControlName('name').eq(1).type('Test DKA').wait(500)
        cy.get('#addAnswerForm').getByFormControlName('firmSanctionImpactScoreId').select(0)
        cy.get('#addAnswerForm').getByFormControlName('isDefault').check()

        cy.get('#addAnswerForm [icon="save"]').click().wait(1000)
        
        //edit criterion answer
        cy.get('.dx-icon-edit').eq(1).click().wait(500)
        cy.get('#gridFirmSanctionCriterionAnswers .dx-texteditor-container > .dx-texteditor-input-container > .dx-texteditor-input').eq(6).type(' Edited')
        cy.get('td .dx-icon-save').eq(1).click().wait(2000)
        cy.contains('The criterion answer has been updated').wait(1500)
        
        //delete criterion answer
        cy.get('.dx-checkbox-icon').eq(0).click().wait(1000)
        cy.get('.sa-panel > :nth-child(2) > .row > sa-action-buttons > .sa-action-buttons > [primary-buttons=""] > [icon="trash"]').click().wait(1000)
        cy.contains('.MessageBoxButtonSection #bot2-Msg1', 'Yes').click().wait(2000)
        cy.contains('Criterion Answer has been deleted')
    })

    it('Deletes a Firm Sanction Criteria', () => {

        cy.get('#gridSanctionCriteria tr .dx-first-cell .dx-texteditor-input').type('DKA Test Sanction Criteria', {force:true}).wait(2000)
        cy.get('#gridSanctionCriteria tr td').find('.fa-angle-double-right').eq(0).click({force: true}).wait(1000)
        cy.contains('sa-button', 'Delete').eq(0).click().wait(1000)
        cy.get('.MessageBoxContainer').contains('Yes').click({force: true}).wait(1000);

        cy.contains(`The criterion has been deleted.`).wait(1000)
    })

})