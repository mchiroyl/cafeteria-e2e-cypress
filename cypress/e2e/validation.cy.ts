describe('Validaciones', () => {
  beforeEach(() => {
    cy.resetData()
    cy.visit('/')
  })

  it('no envía la orden si el carrito está vacío', () => {
    cy.intercept('POST', '**/api/orders').as('postOrder')
    cy.get('[data-cy=confirm-order]').click()
    cy.get('[data-cy=empty-cart-msg]').should('be.visible')
    cy.get('@postOrder.all').should('have.length', 0)
  })

  it('no permite cantidad menor a 1', () => {
    cy.get('[data-cy=add-to-cart]').first().click()
    cy.get('[data-cy=cart-item-qty]').first().clear().type('0')
    cy.intercept('POST', '**/api/orders').as('postOrder')
    cy.get('[data-cy=confirm-order]').click()
    cy.get('[data-cy=error-message]').should('be.visible')
    cy.get('@postOrder.all').should('have.length', 0)
  })
})
