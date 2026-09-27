Cypress.Commands.add('resetData', () => {
  cy.request({
    method: 'POST',
    url: 'http://localhost:3000/api/test/reset',
    failOnStatusCode: false
  }).then(response => {
    cy.log(`resetData status: ${response.status}`)
    cy.log(`resetData body: ${JSON.stringify(response.body)}`)
    expect(response.status, `resetData falló: ${JSON.stringify(response.body)}`).to.eq(200)
  })
})

declare global {
  namespace Cypress {
    interface Chainable {
      resetData(): Chainable<void>
    }
  }
}

export {}
