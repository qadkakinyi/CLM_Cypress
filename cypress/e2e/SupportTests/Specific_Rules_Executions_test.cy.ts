describe('Specific Rules Execution', ()=>{
    it('Checks if Rule 55 execution is executed successfully', ()=>{
        cy.visit('/administration/rules').wait(10000)
        
        cy.get('[aria-colindex="3"] .dx-texteditor-input').eq(0).type('55').wait(6000)
        
        cy.get('#gridRules .fa-angle-double-right').eq(0).click({force:true}).wait(4000)
        //activate rule and save
        cy.getByFormControlName('status').select('Active')
        cy.contains('sa-button', 'Save').click().wait(3000)
        
        //Test executions
        cy.contains('sa-button', 'Test Execution').click().wait(3000)
        cy.contains("Run Test and Don't Create Cases").scrollIntoView().click().wait(3000)
        
        cy.contains('The rule was executed successfully')
    })

    it('Checks if Rule 11 execution is executed successfully', ()=>{
        cy.visit('/administration/rules').wait(10000)

        cy.get('[aria-colindex="3"] .dx-texteditor-input').eq(0).type('11').wait(6000)

        cy.get('#gridRules .fa-angle-double-right').eq(0).click({force:true}).wait(4000)
        //activate rule and save
        cy.getByFormControlName('status').select('Active')
        cy.contains('sa-button', 'Save').click().wait(3000)

        //Test executions
        cy.contains('sa-button', 'Test Execution').click().wait(3000)
        cy.contains("Run Test and Don't Create Cases").scrollIntoView().click().wait(3000)

        cy.contains('The rule was executed successfully')
    })
})