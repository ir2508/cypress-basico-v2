/// <reference types="Cypress" />

describe('Central de Atendimento ao Cliente TAT', function () {
    this.beforeEach(function () {
        cy.visit('./src/index.html')
    })

    it('verifica o título da aplicação', function () {
        cy.title().should('be.equal', 'Central de Atendimento ao Cliente TAT')
    })

    it('preenche os campos obrigatórios e envia o form', function () {
        cy.fillMandatoryFieldsAndSubmit()
        cy.get('.success').should('be.visible')
    })

    it('telefone continua vazio com texto não númerico', function () {
        cy.get('#phone').should('be.visible').type('Teste', { delay: 0 }).should('have.value', '')
        cy.get('button[type="submit"]').click()
        cy.get('.error').should('be.visible')
    })

    it('telefone é obrigatório, mas não foi preenchido', function () {
        cy.get('#phone').should('be.visible').should('have.value', '')
        cy.get('#phone-checkbox').should('be.visible').check().should('be.checked')
        cy.fillMandatoryFieldsAndSubmit()
        cy.get('.error').should('be.visible')
    })

    it('limpar os campos preenchidos', function () {
        cy.get('#firstName').should('be.visible').type('Igor Roberto', { delay: 0 }).should('have.value', 'Igor Roberto')
        cy.get('#firstName').clear().should('have.value', '')

        cy.get('#lastName').should('be.visible').type('Barbosa Dos Santos', { delay: 0 }).should('have.value', 'Barbosa Dos Santos')
        cy.get('#lastName').clear().should('have.value', '')

        cy.get('#phone').should('be.visible').should('have.value', '')
        cy.get('#phone').clear().should('have.value', '')

        cy.get('#email').should('be.visible').type('teste@gmail', { delay: 0 }).should('have.value', 'teste@gmail')
        cy.get('#email').clear().should('have.value', '')

        cy.get('#open-text-area').should('be.visible').type('Teste').should('have.value', 'Teste')
        cy.get('#open-text-area').clear().should('have.value', '')

        cy.get('#phone-checkbox').should('be.visible').check().should('be.checked')
        cy.get('#phone-checkbox').uncheck().should('not.be.checked')

        cy.get('button[type="submit"]').click()
        cy.get('.error').should('be.visible')
    })

    it('formulário não foi preenchido', function () {
        cy.contains('button', 'Enviar').click()
        cy.get('.error').should('be.visible')
    })

    it('envia form com comando personalizado', function () {
        cy.fillMandatoryFieldsAndSubmit()
        cy.get('.success').should('be.visible')
    })

    it('seleciona produto YouTube', function () {
        cy.get('#product').select('YouTube').should('have.value', 'youtube')
    })

    it('seleciona produto Mentoria pelo value', function () {
        cy.get('#product').select('mentoria').should('have.value', 'mentoria')
    })

    it('seleciona produto Blog pelo índice', function () {
        cy.get('#product').select(1).should('have.value', 'blog')
    })

    it('seleciona radio feedback', function () {
        cy.get(':nth-child(4) > input').check('feedback').should('be.checked')
    })

    it('confere a marcacacao de cada radio', function () {
        cy.get('input[type="radio"]').should('have.length', 3).each(($radio) => {
            cy.wrap($radio).check().should('be.checked')
        })
    })

    it('marca e desmarca checkbox', function () {
        cy.get('input[type="checkbox"]').should('have.length', 2).each(($check) => {
            cy.wrap($check).check().should('be.checked')
        })

        cy.get('input[type="checkbox"]').first().uncheck()
    })

    // it('anexando um arquivo', function() {
    //     cy.get('input[type="file"]').should('not.have.value').selectFile('cypress/fixtures/example.json').then(input => {
    //         expect(input[0].files[0].name).to.equal('example.json') 
    //     })
    // })

    it('anexando um arquivo', function () {
        cy.get('input[type="file"]').should('not.have.value').selectFile('cypress/fixtures/example.json').should(function ($input) {
            expect($input[0].files[0].name).to.equal('example.json')
        })
    })

    it('anexando um arquivo drag and drop', function () {
        cy.get('input[type="file"]').should('not.have.value').selectFile('cypress/fixtures/example.json', { action: 'drag-drop' }).then(input => {
            expect(input[0].files[0].name).to.equal('example.json')
        })
    })

    it('criando um alias para o arquivo', function () {
        cy.fixture('example.json', { enconding: null }).as('exFile')
        cy.get('input[type="file"]').should('not.have.value').selectFile({ contents: '@exFile', fileName: 'example.json' }, { action: 'drag-drop' }).then(input => {
            expect(input[0].files[0].name).to.equal('example.json')
        })
    })

    it('verificando se link abre em nova guia', function () {
        cy.get('a').should('have.attr','target','_blank')
    })

    it('removendo target blank para testar o link', function () {
        cy.get('a').invoke('removeAttr','target').click()
        cy.get('#title').should('have.text','CAC TAT - Política de privacidade')
    })

})