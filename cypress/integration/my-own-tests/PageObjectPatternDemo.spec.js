/// <reference types="cypress" />

import LoginPage from '../PageObjects/LoginPage'

describe('Test Suite', () => {

    it('Valid Login Test', () =>{

        const lp = new LoginPage()
        lp.visit()
        lp.fillEmail('admin@yourstore.com')
        lp.fillPassword('admin')
        lp.submit()
        cy.title().should('be.equal', 'Dashboard / nopCommerce administration')
    })

})