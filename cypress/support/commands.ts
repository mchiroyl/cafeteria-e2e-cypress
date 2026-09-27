Cypress.Commands.add('resetData', () => {
  cy.request('POST', 'http://localhost:3000/api/test/reset')
    .its('status').should('eq', 200)
})

declare global {
  namespace Cypress {
    interface Chainable {
      resetData(): Chainable<void>
    }
  }
}
