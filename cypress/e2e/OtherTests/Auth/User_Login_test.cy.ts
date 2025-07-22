describe.skip("User Login", ()=>{
    
    let login_details;
    
    beforeEach(()=>{
        cy.fixture("login_details").then((logins)=>{
            login_details = logins
        })
    })
    
    it("successfully logs in a user", ()=>{
        
        cy.login(login_details.username, "Password1!")
        
        cy.get("")
    })

    it("denies authentication with incorrect user details", ()=>{
        cy.login("systemadmin", "Password1!")

        cy.get("")
    })
})