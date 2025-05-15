
describe('Evaluation Score Match', ()=>{
    it('It checks evaluation score in `Know your Clients page` vs in the client Dashboard ', ()=>{
        cy.visit('main/clients').wait(2000);
        cy.get('#gridClients').should('be.visible');

        cy.get('#gridClients table tr td .dx-header-filter-indicator').eq(0).click({force:true});

        cy.wait(1500)
        //get index of td with text `Client Type`
        // this is the filterClientType to Individual 
        cy.get('#gridClients tr').find('td[aria-label="Column Client Type"]').then(td=>{
            let colIndex = td.attr('aria-colindex')
            cy.log('ColIndex '+colIndex)
            cy.get(`#gridClients .dx-datagrid-headers  .dx-datagrid-filter-row>[aria-colindex="${colIndex}"] .dx-button-content`).eq(0).click()
            cy.wait(500).get('.dx-scrollview-content').contains('Individual').click().wait(3000)
        })
        
        // get index of LAST EVALUATION GRADE column
        // cy.get('#gridClients .dx-scrollbar-horizontal').scrollTo('right')
        cy.get('#gridClients tr').find('td[aria-label="Column Last Evaluation Grade"]').then(td=>{
            let columnIndex = td.attr('aria-colindex')
            cy.log('ColIndex '+columnIndex)
            cy.get(`#gridClients .dx-datagrid-content tr[aria-rowindex="2"] td[aria-colindex="${columnIndex}"]`).then(el=>{
                // navigate to client dashboard
                cy.wait(2000)
                cy.wrap(el).invoke('text').then(grade=>{
                    cy.log(grade)

                    let gridClientsRows = cy.wrap('#gridClients table tbody tr');

                    //get last evaluation grade from Know your clients page
                    gridClientsRows.get('.dx-command-edit-with-icons a').eq(0).click({ force: true })
                    cy.wait(4000);

                    cy.get('.left-secondary-menu .left-menu-items.main-menu li>sa-menu-item>a').contains('span', 'Evaluations').click().wait(3000);

                    //GET LAST EVALUATION GRADE WHICH IS THE FIRST IN THE TABLE
                    cy.get('#gridClientEvaluations .dx-datagrid-content tr[aria-rowindex="1"] td[aria-colindex="4"]').invoke('text').then(gradeInTable=>{
                        expect(grade).to.include(gradeInTable)
                    })
                    
                    // CHECK IF THAT IS THE VALUE PRINTED ON THE DASHBOARD LEFT PANEL
                    // cy.get('.evaluationGrade > .stat span').invoke('text').then(gradeInLeftPanel=>{
                    //     expect(grade).to.include(gradeInLeftPanel)
                    // })
                    
                })

            })
           
        })
    })
})