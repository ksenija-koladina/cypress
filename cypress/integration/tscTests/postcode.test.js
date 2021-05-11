"use strict";
/// <reference types="cypress" />
describe('First Test', function () {
    it('Booking Free Valuation work good', function () {
        cy.visit('https://preprod.yopa.co.uk/');
        cy.contains('Award winning estate agents').should('exist');
        cy.contains('Okay, got it').click();
        cy.get('#hero-home-postcode-input').type('CR0 6UW');
        cy.get('.home-hero__form-var > .input-group > .input-group-btn > .y-btn')
            .as('postcodeButton')
            .click();
        cy.url().should('include', '/property-valuation/address-select');
        cy.contains('Select Your Address').should('exist');
        //Address
        // cy.get('.scroll-container').find('[data-street="Lebanon Road"]').as('flats')
        cy.document().then(function ($doc) {
            var flats = $doc.querySelectorAll('[data-street="Lebanon Road"]');
            var count = flats.length;
            var random = Math.floor(Math.random() * count);
            cy.get(flats[random])
                .click();
        });
        //Date and time
        cy.url().should('include', 'property-valuation/appointment-select');
        cy.document().then(function ($doc) {
            var days = $doc.querySelectorAll(".day-component.available-day");
            var count = days.length;
            var random = Math.floor(Math.random() * count);
            cy.get(days[random])
                .click();
        });
        cy.document().then(function ($doc) {
            var timeAv = $doc.querySelectorAll(".timeslot > .available");
            var count = timeAv.length;
            var random = Math.floor(Math.random() * count);
            if (timeAv.length)
                cy.get(timeAv[random])
                    .click();
        });
        //Input form
        cy.url().should('include', 'property-valuation/contact-details');
        cy.get('[id="val_vend_full_name"]')
            .type('Full Name');
        cy.get('[id="val_vend_email"]')
            .type('Email@email');
        cy.get('[id="val_vend_phone"]')
            .type('123456789');
        cy.get('[id="val_opt_in"]').click();
        cy.get('[id="val_vend_full_name_error"]')
            .as('nameValidation')
            .should('not.exist');
        cy.get('[id="val_vend_email_error"]')
            .as('emailValidation')
            .should("contain", "Please enter a valid email");
        cy.get('[id="val_vend_phone_error"]')
            .as('phoneValidation')
            .should("contain", "Please enter a valid phone number");
    });
});
