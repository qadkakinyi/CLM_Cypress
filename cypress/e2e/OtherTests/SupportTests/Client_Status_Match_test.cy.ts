
describe('Client Status Match', ()=>{
    it('It checks client status in `Client Management page` vs in the client Profile ', ()=>{
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

        // get index of Client Status column
        cy.get('#gridClients tr').find('td[aria-label="Column Client Status"]').then(td=>{
            let columnIndex = td.attr('aria-colindex')
            cy.log('ColIndex '+columnIndex)
            //arrange from the latest client to the oldest
            cy.get('#gridClients tr').find('td[aria-label="Column Client Type"]').click().wait(2000)
            
            cy.get(`#gridClients .dx-datagrid-content tr[aria-rowindex="2"] td[aria-colindex="${columnIndex}"]`).then(el=>{
                // navigate to client dashboard
                cy.wait(2000)
                cy.wrap(el).invoke('text').then(status=>{
                    cy.log(status)

                    let gridClientsRows = cy.wrap('#gridClients table tbody tr');

                    //get client status from Know your clients page  
                    gridClientsRows.get('.dx-command-edit-with-icons a').eq(0).click({ force: true })
                    cy.wait(3000);

                    cy.get('.left-secondary-menu .left-menu-items.main-menu li>sa-menu-item>a').contains('span', 'Profile').click().wait(3000);

                    cy.get('app-profile #editProfileForm .row').eq(2).find( 'dx-drop-down-box input').eq(1).should('have.value', status)

                })

            })

        })
    })
})