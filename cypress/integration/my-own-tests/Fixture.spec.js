/// <reference types="cypress" />

describe('Fixtures', () => {

    // before( () => {
    //
    //     cy.fixture('example1').then((loginData) => {
    //         const emailData = loginData.email
    //         const passData = loginData.password
    //     })
    //
    // })

    it('FixturesDemoTest', () => {

        cy.visit('https://admin-demo.nopcommerce.com/login')

        cy.fixture('example1').then((loginData) => {
            const emailData = loginData.email
            const passData = loginData.password

            cy.get('input[data-val-required="Please enter your email"]').clear().type(emailData)  //email
            cy.get('input[type=password]').clear().type(passData)       //pass
        })

        cy.get('button[type=submit]').click() //Sing In

    })

})

















