/// <reference types="cypress" />

describe('UI Elements', () => {
    it('Verifying Inputbox & Radion button', () => {

        cy.visit("...")
        cy.url().should('include', '.../...')

        cy.get('input[name=userName]').should('be.visible').should('be.enabled').type('something')
        cy.get('input[name=password]').should('be.visible').should('be.enabled').type('somePass')

        cy.get('input[name=login]').should('be.visible').click()

        // Title verification

        cy.title().should('eq', 'Some Title')

        //Radio buttons
        cy.get('input[value=someValue]').should('be.visible').should('be.checked')
        cy.get('input[value=someValue2]').should('be.visible').should('not.be.checked').click()

        cy.get('[name=someName]').should('be.visible').click() // Continue button

        cy.title().should('eq', 'Select...') // Title verification




    })
})