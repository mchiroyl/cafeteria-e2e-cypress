describe('Validaciones', () => {
  beforeEach(() => {
    cy.resetData()
    cy.visit('/')
    cy.get('[data-cy=product-item]', { timeout: 10000 }).should('have.length.at.least', 1)
  })

  it('no envía la orden si el carrito está vacío', () => {
    // El mensaje de carrito vacío siempre está visible cuando no hay items
    cy.get('[data-cy=empty-cart-msg]').should('be.visible')

    cy.intercept('POST', '**/api/orders').as('postOrder')
    cy.get('[data-cy=confirm-order]').click()

    // El error se muestra pero NO se llama a la API
    cy.get('[data-cy=error-message]').should('be.visible')
    cy.get('@postOrder.all').should('have.length', 0)
  })

  it('no permite cantidad menor a 1', () => {
    // Agrega primer producto disponible
    cy.get('[data-cy=add-to-cart]').not('[disabled]').first().click()
    // Cambia cantidad a 0
    cy.get('[data-cy=cart-item-qty]').first().clear().type('0')

    cy.intercept('POST', '**/api/orders').as('postOrder')
    cy.get('[data-cy=confirm-order]').click()

    // Debe mostrar error y NO llamar a la API
    cy.get('[data-cy=error-message]').should('be.visible')
    cy.get('@postOrder.all').should('have.length', 0)
  })
})
