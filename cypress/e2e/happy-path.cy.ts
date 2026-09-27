describe('Camino exitoso', () => {
  beforeEach(() => {
    cy.resetData()
    cy.intercept('GET', '**/api/products').as('getProducts')
    cy.visit('/')
    cy.wait('@getProducts').its('response.statusCode').should('eq', 200)
  })

  it('selecciona productos, confirma orden y verifica identificador y total', () => {
    cy.get('[data-cy=add-to-cart]').first().click()
    cy.get('[data-cy=add-to-cart]').eq(1).click()

    cy.get('[data-cy=cart-total]').should('not.contain', 'Q0.00')

    cy.intercept('POST', '**/api/orders').as('postOrder')
    cy.get('[data-cy=confirm-order]').click()

    cy.wait('@postOrder').then(interception => {
      expect(interception.response?.statusCode).to.eq(201)
      expect(interception.response?.body).to.have.property('orderId')
      expect(interception.response?.body).to.have.property('total')

      const { orderId, total } = interception.response!.body
      cy.get('[data-cy=order-id]').should('contain', String(orderId))
      cy.get('[data-cy=order-total]').should('contain', total.toFixed(2))
    })
  })
})
