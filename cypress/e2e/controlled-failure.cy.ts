describe('Fallos controlados', () => {
  beforeEach(() => {
    cy.resetData()
    cy.visit('/')
  })

  it('botón agregar está deshabilitado para productos agotados', () => {
    cy.get('[data-cy=product-item]').last()
      .find('[data-cy=add-to-cart]')
      .should('be.disabled')
  })

  it('muestra error y permite reintentar cuando la API falla con 500', () => {
    cy.intercept('POST', '**/api/orders', {
      statusCode: 500,
      body: { error: 'SERVER_ERROR' }
    }).as('postOrderFail')

    cy.get('[data-cy=add-to-cart]').first().click()
    cy.get('[data-cy=confirm-order]').click()

    cy.wait('@postOrderFail')
    cy.get('[data-cy=error-message]').should('be.visible')
    cy.get('[data-cy=confirm-order]').should('be.visible').and('not.be.disabled')
  })
})
