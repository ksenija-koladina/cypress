"use strict";
/// <reference types="cypress" />
describe('First Test', function () {
    it('Booking Free Valuation work good', function () {
        cy.request('https://preprod.yopa.co.uk/');
        cy.contains('Award winning estate agents').should('exist');
        cy.contains('Okay, got it').click();
        cy.get('#hero-home-postcode-input').type('CR0 6UW');
        cy.get('[class="y-btn y-btn--lg y-btn--lg-on-sm y-btn--no-radius-left ' +
            'y-btn--no-max-width home-hero__postcode-button home-hero__postcode-button--test"]')
            .as('postcodeButton')
            .click();
        cy.url().should('include', '/property-valuation/address-select');
        cy.contains('Select Your Address').should('exist');
        //Address
        cy.document().then(function ($doc) {
            var flats = $doc.querySelectorAll('*[data-street="Lebanon Road"]');
            var count = flats.length;
            var random = Math.floor(Math.random() * count);
            cy.get(flats[random])
                .click();
        });
        //Date and time
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
        cy.get('[id="val_vend_full_name"]')
            .type('Full Name');
        cy.get('[id="val_vend_email"]')
            .type('Email@email');
        cy.get('[id="val_vend_phone"]')
            .type('123456789');
        cy.get('[id="val_opt_in"]').click();
        cy.get('[id="val_vend_full_name_error"]')
            .as('fullNameValidation')
            .should('not.exist');
        cy.get('[id="val_vend_email_error"]')
            .as('emailValidation')
            .should('be.visible');
        cy.get('[id="val_vend_phone_error"]')
            .as('phoneValidation')
            .should('be.visible');
    });
});
