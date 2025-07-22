// function getClientID(){
//     cy.location('pathname').then(path=>{
//         const pathSections = path.split('/');
//         clientId = pathSections[3]
//     })
// }
let token= '';
let user:any;
let api_baseUrl = Cypress.env('api_baseUrl')
describe('Checks live transaction', ()=>{
    before(()=>{
        // get authorization token
        cy.request({
            method:"POST",
            url:`${api_baseUrl}/token`,
            body:{
                "grant_type": 'password',
                "username": 'systemadmin',
                "password": 'Password1!'
            },
            headers:{
                "Content-Type": "application/x-www-form-urlencoded"
            }}).then(res=>{
            token = res.body.access_token
        })
    })
    
    it('Check live transaction through API', ()=>{
        //get user ID
        cy.wait(1000)
        cy.request({
            method: "POST",
            url: `${api_baseUrl}/api/paging/clients`,
            headers:{
                "Content-Type": "application/x-www-form-urlencoded",
                'Authorization':   `Bearer ${token}`
            },
            body:{
                "skip": '0',
                "requireTotalCount": true
            }
        }).then(res=>{
            let users = res.body.data
            user = users.find(user=>{
                // console.log(user.clientType == 1 && user.regulationGroupId == 1 && user.clientStatusId == 6)
                return (user.clientType == 1 && user.regulationGroupId == 1 && user.clientStatusId == 6 && user.lastEvaluationGradeId == 4)
            })
            if(user){
                cy.log(user.id)
                cy.request({
                    method: "POST",
                    url: `${api_baseUrl}/api/LiveRules/checkLiveTransaction/78`,
                    headers:{
                        'Content-Type': 'application/json',
                        'Authorization':   `Bearer ${token}`
                    },
                    body: {
                        "clientId": user.id,
                        "baseAmount": 18500,
                        "baseCurrency": "EUR",
                        "transactionDate": "2024-10-23T11:17:03.269Z",
                        "incomingCountryId": 155,
                        "outgoingCountryId": 8,
                        "transactionMethodId": 2,
                        "transactionTypeId": 2
                    }
                }).then(res=>{
                    console.log(res.body[0].caseId)
                    if(res.body[0].caseId){
                        let caseId = res.body[0].caseId
                        cy.visit(`https://complytek-testing.regtek.co/main/client-individual/${user.id}/1/case/${caseId}`).wait(2000)
                        cy.contains('Temporarily Rejected').wait(1000)
                    }
                })
            }
        })
        
        
    })
})