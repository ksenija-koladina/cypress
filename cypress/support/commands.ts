Cypress.Commands.add('getBySel', (selector, ...args) => {
    return cy.get(`[data-test=${selector}]`, ...args)
})

Cypress.Commands.add('getBySelLike', (selector, ...args) => {
    return cy.get(`[data-test*=${selector}]`, ...args)
})

Cypress.Commands.add('dataCy', (value) => {
    return cy.get(`[data-cy=${value}]`)
});

declare namespace Cypress {
    interface Chainable {
        dataCy(value: string): Chainable<Element>
    }
}

//Custom command

Cypress.Commands.add ("login", (email, password) => {
    cy.visit('https://admin-demo.nopcommerce.com/login')
    cy.get('input[data-val-required="Please enter your email"]').clear().type(email)
    cy.get('input[type=password]').clear().type(password)
    cy.get('button[type=submit]').click()
})