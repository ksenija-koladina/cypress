/// <reference types="cypress" />

describe('CustomSuite', () => {

    beforeEach( () => {
        cy.login('admin@yourstore.com', 'admin')
    })

    it('LoginTest', () => {

        cy.title().should('be.equal', 'Dashboard / nopCommerce administration')

        cy.login('admin@yourstore.com', 'admin123')         //invalid data
        cy.title().should('be.equal', 'Your store. Login')


    })

    it('Add customer', () => {

        //Script for Adding new customer

        cy.log('Adding customer........')

    })

    it('Edit customer', () => {

        //Script for Editing customer

        cy.log('Editing customer........')


    })

})

















