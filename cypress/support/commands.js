Cypress.Commands.add('fillMandatoryFieldsAndSubmit', function () {
    cy.get('#firstName').should('be.visible').type('Igor Roberto', { delay: 0 }).should('have.value', 'Igor Roberto')
    cy.get('#lastName').should('be.visible').type('Barbosa Dos Santos', { delay: 0 }).should('have.value', 'Barbosa Dos Santos')
    cy.get('#email').should('be.visible').type('teste@gmail.com', { delay: 0 }).should('have.value', 'teste@gmail.com')
    cy.get('#open-text-area').should('be.visible').type('Teste').should('have.value', 'Teste')
    cy.get('button[type="submit"]').click()
})