let sub_group_name = '';

describe('Sub-group values Match', ()=>{
    it('checks if subgroup values under screening possible matches (Home screen) match the values in the profile', ()=>{
        cy.wait(2000)
        
        cy.get('#screeningActionsForReview').click().wait(2500)

        cy.get(`#gridScreeningPendingActions .dx-datagrid-rowsview table [aria-rowindex="2"] td`).eq(9).invoke('text').then(text => {
            sub_group_name = text
            
            cy.log('SubGroup '+sub_group_name)
            cy.get("#gridScreeningPendingActions .fa-angle-double-right").eq(0).click({force:true}).wait(4000)

            cy.get('.left-secondary-menu .left-menu-items.main-menu li>sa-menu-item>a').contains('span', 'Profile').click().wait(4000);
            
            cy.get('app-profile #editProfileForm .row').eq(5).find( 'dx-drop-down-box input').eq(1).should('have.value', sub_group_name)
        })
    })
})