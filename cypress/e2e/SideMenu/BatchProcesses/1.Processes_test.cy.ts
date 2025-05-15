describe("Processes Menu", ()=>{
    it("Toggles first level menu list items visibility", ()=>{

        cy.getByDataCy("processes").click()
        //check if the menu is visible
        cy.getByDataCy("processes-menu-level-1").find("li").should("be.visible").should("have.length.greaterThan", 4)

    })

})