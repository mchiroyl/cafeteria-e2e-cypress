describe('Camino exitoso', () => {
  beforeEach(() => {
    cy.resetData()
    cy.visit('/')
    // Espera que los productos carguen en el DOM antes de continuar
    cy.get('[data-cy=product-item]', { timeout: 10000 }).should('have.length.at.least', 1)
  })

  it('selecciona productos, confirma orden y verifica identificador y total', () => {
    // Solo toma productos disponibles (no agotados)
    cy.get('[data-cy=add-to-cart]').not('[disabled]').first().click()
    cy.get('[data-cy=add-to-cart]').not('[disabled]').eq(1).click()

    cy.get('[data-cy=cart-total]').should('not.contain', 'Q0.00')

    cy.intercept('POST', '**/api/orders').as('postOrder')
    cy.get('[data-cy=confirm-order]').click()

    cy.wait('@postOrder', { timeout: 10000 }).then(interception => {
      expect(interception.response?.statusCode).to.eq(201)
      expect(interception.response?.body).to.have.property('orderId')
      expect(interception.response?.body).to.have.property('total')

      const { orderId, total } = interception.response!.body
      cy.get('[data-cy=order-id]').should('contain', String(orderId))
      cy.get('[data-cy=order-total]').should('contain', total.toFixed(2))
    })
  })
})
