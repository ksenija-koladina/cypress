/// <reference types="cypress" />

describe('Testing', () => {

    before(() => {
        // runs once before all tests in the block
        cy.log('********************This is SETUP block ********************')

    })

    beforeEach(() => {
        // runs before each test in the block
        cy.log('********************This is LOGIN********************')
    })

    afterEach(() => {
        // runs after each test in the block
        cy.log('********************This is LOGOUT********************')
    })

    after(() => {
        // runs once after all tests in the block
        cy.log('********************This is TEAR DOWN block ********************')
    })

    it('Searching', () => {

        cy.log('********************This is Searching Test ********************')

    })

    it('Advanced Searching', () => {

        cy.log('********************This is Advanced Searching Test ********************')

    })

    it('Listing Products', () => {

        cy.log('********************This is Listing Products Test ********************')

    })

})

















