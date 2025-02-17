let location =''
describe('Handle Screening Process', ()=>{
    it('Ensures matches redirect to the correct client', ()=>{
        cy.visit('/processes/handle-screening').wait(3000)
        cy.get('.dx-datagrid-group-closed').eq(0).click({force:true}).wait(3000)
        cy.get('tbody tr[aria-rowindex="2"]').eq(0)
        cy.get('[aria-rowindex="2"] > [aria-describedby="dx-col-10"]').invoke('text').then((text)=>{
            cy.log(text)
            //NAVIGATE TO THE CLIENT DASHBOARD
            cy.get('.dx-datagrid-content-fixed > .dx-datagrid-table > tbody > .dx-data-row  .dx-link').eq(0).scrollIntoView().click().wait(7000)

            //confirm that client name in the dashboard matches the value gotten from the match list
            cy.get('.sa-panel div h2').eq(0).invoke('text').then(text2=>{
                expect(text.trim()).to.equal(text2.trim())
            })

            cy.location('pathname').then((loc)=>{
                location = loc
            })
        })
    })

    it('Checks for correct screening status', ()=>{
        location = location.replace(/\/businessSearchProfile.*/, '/negative-lists')
        cy.visit(location).wait(2000)

        cy.get('.informer > .count').wait(2000).invoke('text').then(recordsCount=>{
            cy.get('sa-info-bar .stat > span').eq(1).invoke('text').then(screeningStatus=>{
                if(recordsCount == 0){
                    expect(screeningStatus).to.not.equal('Pending Action')
                    expect(screeningStatus).to.not.equal('Match')
                }else if(recordsCount > 1){
                    expect(screeningStatus).to.not.equal('No Match')
                }
            })
        })

        cy.wait(1500)
    })
})