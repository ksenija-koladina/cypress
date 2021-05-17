/// <reference types="cypress" />

describe('UI Elements', () => {

    it('Hobbies check boxes', () => {

        cy.visit("http://demo.automationtesting.in/Register.html")

        cy.get('#checkbox1').check().should('be.checked').and('have.value', 'Cricket')
        cy.get('#checkbox2').check().should('be.checked').and('have.value', 'Movies')
        cy.get('#checkbox3').check().should('be.checked').and('have.value', 'Hockey')

        cy.get('#checkbox1').uncheck().should('not.be.checked')
        cy.get('#checkbox2').uncheck().should('not.be.checked')
        cy.get('#checkbox2').uncheck().should('not.be.checked')

        cy.get('input[type=checkbox]').check(['Cricket', 'Movies']) // Multiple checkbox selection and checking



    })

    it('Skills Drop Down', () => {

        //cy.visit("http://demo.automationtesting.in/Register.html")

        cy.get('#Skills').select('Android').should('have.value', 'Android')


    })

    it('Languages Multi Select', () => {

        //cy.visit("http://demo.automationtesting.in/Register.html")

        cy.get('#msdd').click()
        cy.get('.ui-corner-all').contains('English').click()
        cy.get('.ui-corner-all').contains('Japanese').click()

    })


    it('Select counties searchable drop down', () => {

        //cy.visit("http://demo.automationtesting.in/Register.html")

        cy.get('[role=combobox]').click({force:true})
        cy.get('.select2-search__field').type('Ind')
        cy.get('.select2-search__field').type('{enter}')

    })

})
















