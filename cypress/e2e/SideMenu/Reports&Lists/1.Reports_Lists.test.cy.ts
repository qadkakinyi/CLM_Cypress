describe("Reports/Lists module", ()=>{
    it("Open reports level 1 menu", ()=>{

        cy.getByDataCy("reports-menu").click().wait(2000).find("ul>li").should("have.length", 7)

    })
})