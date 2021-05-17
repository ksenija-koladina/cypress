/// <reference types="cypress" />

describe('Testing', () => {

    it('Navigation Tests', () => {

        cy.visit("https://demo.nopcommerce.com")

        cy.title().should('eq', 'nopCommerce demo store') // Home

        cy.get('body > div.master-wrapper-page > div.header > ' +
            'div.header-upper > div.header-links-wrapper > div.header-links > ul > li:nth-child(1) > a').contains('Register').click()

        cy.title().should('eq', 'nopCommerce demo store. Register') // Register Page

        cy.go('back')
        cy.title().should('eq', 'nopCommerce demo store') //Home

        cy.go('forward')
        cy.title().should('eq', 'nopCommerce demo store. Register') //Reqister Page

        cy.go(-1)       // or  cy.go('back')
        cy.title().should('eq', 'nopCommerce demo store') //Home

        cy.go(1)        // or  cy.go('forward')
        cy.title().should('eq', 'nopCommerce demo store. Register') //Reqister Page

        cy.reload()  //reload the page

    })

})

















