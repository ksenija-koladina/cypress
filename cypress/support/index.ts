Cypress.Commands.add('dataCy', (value) => {
    return cy.get(`[data-cy=${value}]`)
});

declare namespace Cypress {
    interface Chainable {
        dataCy(value: string): Chainable<Element>
    }
}