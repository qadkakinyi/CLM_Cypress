describe("My Tasks", ()=>{

    
    it("Visit my tasks and history page and tests switching tasks and history", ()=>{
        cy.getByDataCy("my-tasks").click()
        cy.location("pathname").should("include", "/my-tasks")
        
        //check if my tasks page is visible
        cy.getByDataCy("selected-tab").eq(0).should("be.visible").invoke('text').then(value=>{
            expect(value.toLowerCase()).to.equal("tasks")
        })
        
        //ensure history page is loaded and displayed
        cy.getByDataCy("selected-tab").eq(1).should("be.visible").click().invoke('text').then(value=>{
            expect(value.toLowerCase()).to.equal("history")
        })
    })
    
    it("Can add a new task", ()=>{
        //Switch back to tasks tab
        //check if add task button is visible and if when clicked the add task modal is visible
        cy.visit('/main/dashboard')
        cy.getByDataCy("my-tasks").click()
        cy.getByDataCy("selected-tab").eq(0).should("be.visible").click()
        cy.getByDataCy("add-task").should("be.visible").click() 
        cy.getByDataCy("add-task-modal").should("be.visible")
    })
        
})