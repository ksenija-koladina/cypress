"use strict";
/// <reference types="cypress" />
//import htmlString = JQuery.htmlString;
describe('Test Suite', function () {
    it('Booking Free Valuation work good', function () {
        cy.viewport(1280, 720);
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
        if (cy.get('.day-component.available-day').should('not.exist')) {
            cy.get('#next-week').click();
        }
        //Date
        cy.document().then(function ($doc) {
            var days = $doc.querySelectorAll(".day-component.available-day");
            var count = days.length;
            var random = Math.floor(Math.random() * count);
            var daysRandom = days[random];
            var daysRandomText = daysRandom.textContent;
            cy.get(days[random])
                .click();
            cy.wait(3000);
            //Time
            var timeAv = $doc.querySelectorAll(".timeslot > .available");
            count = timeAv.length;
            random = Math.floor(Math.random() * count);
            var timeRandom = timeAv[random];
            cy.get(timeAv[random]).click();
            // })
            //Contact Details input form
            cy.url().should('include', 'property-valuation/contact-details');
            function fullNameF() {
                var text1 = "";
                var text2 = "";
                var possible1 = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
                var possible2 = "abcdefghijklmnopqrstuvwxyz";
                text1 += possible1.charAt(Math.floor(Math.random() * possible1.length));
                for (var i = 0; i < 8; i++) {
                    text2 += possible2.charAt(Math.floor(Math.random() * possible2.length));
                }
                return "" + text1 + text2;
            }
            function emailF() {
                var emailText = "";
                var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
                for (var i = 0; i < 10; i++)
                    emailText += possible.charAt(Math.floor(Math.random() * possible.length));
                return emailText;
            }
            function phoneF() {
                var phoneNumber = "";
                for (var i = 0; i < 11; i++)
                    phoneNumber += Math.floor(Math.random() * 9);
                return phoneNumber;
            }
            var emailLogin = emailF() + "@email.com";
            cy.get('[id="val_vend_full_name"]')
                .type(fullNameF() + " " + fullNameF());
            cy.get('[id="val_vend_email"]')
                .type(emailLogin);
            cy.get('[id="val_vend_phone"]')
                .type("+" + phoneF());
            cy.get('[id="val_opt_in"]').click();
            cy.get('[id="val_vend_full_name_error"]')
                .as('nameValidation')
                .should('not.exist');
            cy.get('[id="val_vend_email_error"]')
                .as('emailValidation')
                .should('not.exist');
            cy.get('[id="val_vend_phone_error"]')
                .as('phoneValidation')
                .should('not.exist');
            cy.get('#book-your-valuation-button')
                .click();
            cy.wait(5000);
            cy.url().should('include', 'property-valuation/confirmation');
            cy.get('#go-to-yopahub-sidebar-link')
                .click();
            // Password input form
            function randPassF() {
                var randText = "";
                var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
                var possible2 = "abcdefghijklmnopqrstuvwxyz";
                for (var i = 0; i < 9; i++)
                    randText += possible2.charAt(Math.floor(Math.random() * possible2.length));
                randText += possible.charAt(Math.floor(Math.random() * possible.length));
                randText += Math.floor(Math.random() * 9);
                return randText;
            }
            var passwordLogin = randPassF();
            cy.get('input[yp-e2e-id=input-password]').type(passwordLogin);
            cy.get('button[yp-e2e-id=reset-password-button]')
                .click();
            //Login page
            cy.get('input[yp-e2e-id=login-email-input]').type(emailLogin);
            cy.get('input[yp-e2e-id=login-password-input]').type(passwordLogin);
            cy.get('button[yp-e2e-id=login-button]').click();
            cy.wait(10000);
            // Closing Welcome Back window
            if (cy.get('#ngdialog1 > div.ngdialog-content').should('exist')) {
                cy.get('[yp-e2e-id=verify-account-goto-yopahub-button]').click();
            }
            // Click to Properties
            cy.get('[yp-e2e-id=properties]').click();
            // Laika pārbaude
            var dayTextVar;
            if (daysRandomText === '1') {
                dayTextVar = daysRandomText + "st June";
            }
            else if (daysRandomText === '2') {
                dayTextVar = days[random].textContent + "nd June";
            }
            else if (daysRandomText === '3') {
                dayTextVar = days[random].textContent + "rd June";
            }
            else {
                dayTextVar = days[random].textContent + "th June";
            }
            cy.get('.date').should('contain', dayTextVar).and('contain', timeRandom.textContent);
        });
    });
});
