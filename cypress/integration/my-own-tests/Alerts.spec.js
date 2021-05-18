/// <reference types="cypress" />

describe('UI Elements', () => {

    it('Alerts', () => {

        cy.visit("...")

        cy.get('#signin_info > a.signin').click()

        cy.wait(5000)

        cy.get('input[type=submit]').click()

        cy.on('window:alert', (str) => {
            expect(str).to.eq('Please enter a valid user name')
        }
        ) //Mocha framework in Cypress




    })

    it.only('Alerts', () => {

        cy.visit("http://testautomationpractice.blogspot.com/")

        andom-words

        cy.get('#HTML9 > div.widget-content > button').click()

        cy.on('window:confirm', (str) => {
            expect(str).to.eq('Press a button!')
        })

    })
})

















