/// <reference types="cypress" />

describe('Basic Desktop Tests', () =>{

    //bootstrapping external things
    beforeEach(() =>{
        cy.viewport(1280, 720)
        cy.visit('https://codedamn.com')
    })

    it('Login page looks good', () => {

        cy.contains('Sign In').click()
        cy.contains('Login with your credentials').should('exist')
        cy.contains('Go with Google').should('exist')
        cy.contains('Go with Facebook').should('exist')
        cy.contains('Register an account').should('exist')

    })

    it('The login page links work', () => {

        // 1. Sign In page
        cy.contains('Sign In').click()

        // 2. Password reset page
        cy.contains('Forgot password?').click()

        // 3. verify your page URL
        cy.url().should('include', '/password-reset')

        cy.url().then( (value)=>{
            cy.log('The current real URL is:', value)
        })

        // 4. go back, on the sign in page
        cy.go('back')

        cy.contains('Register an account').click()
        cy.url().should('include', '/register')
    })

    it('Login should work fine', () =>{
        // TODO: Set this as localStorage token for authentication

        cy.contains('Sign In').click()

        cy.get('[data-testid=username]').type('iosdev')
        cy.get('[data-testid=password]').type('iosdev')
        cy.get('[data-testid=login]').click()
        cy.url().should('include', '/dashboard')
    })

})