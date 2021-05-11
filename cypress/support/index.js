"use strict";
Cypress.Commands.add('dataCy', function (value) {
    return cy.get("[data-cy=" + value + "]");
});
