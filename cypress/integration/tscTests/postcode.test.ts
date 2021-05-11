/// <reference types="cypress" />

import htmlString = JQuery.htmlString;

describe('First Test', () =>{

    it('Booking Free Valuation work good', () =>{
        cy.visit('https://preprod.yopa.co.uk/')
        cy.contains('Award winning estate agents').should('exist')
        cy.contains('Okay, got it').click()

        cy.get('#hero-home-postcode-input').type('CR0 6UW')
        cy.get('.home-hero__form-var > .input-group > .input-group-btn > .y-btn')
            .as('postcodeButton')
            .click()
        cy.url().should('include', '/property-valuation/address-select')
        cy.contains('Select Your Address').should('exist')

        //Address

        // cy.get('.scroll-container').find('[data-street="Lebanon Road"]').as('flats')

        cy.document().then(($doc) => {
            const flats = $doc.querySelectorAll('[data-street="Lebanon Road"]') as NodeList
            let count: number = flats.length;
            let random: number = Math.floor(Math.random() * count);
            cy.get(flats[random])
                .click();
        })

        //Date and time

        cy.url().should('include', 'property-valuation/appointment-select')

        cy.document().then(($doc) => {
            const days = $doc.querySelectorAll(".day-component.available-day") as NodeList
            let count: number = days.length;
            let random: number = Math.floor(Math.random() * count);
            cy.get(days[random])
                .click()

        })

        cy.document().then(($doc) => {
            const timeAv = $doc.querySelectorAll(".timeslot > .available") as NodeList
            let count: number = timeAv.length;
            let random: number = Math.floor(Math.random() * count);
            if (timeAv.length)
            cy.get(timeAv[random])
                .click();
        })

        //Input form

        cy.url().should('include', 'property-valuation/contact-details')


        cy.get('[id="val_vend_full_name"]')
            .type('Full Name')
        cy.get('[id="val_vend_email"]')
            .type('Email@email')
        cy.get('[id="val_vend_phone"]')
            .type('123456789')
        cy.get('[id="val_opt_in"]').click()

        cy.get('[id="val_vend_full_name_error"]')
            .as('nameValidation')
            .should('not.exist')
        cy.get('[id="val_vend_email_error"]')
            .as('emailValidation')
            .should("contain", "Please enter a valid email")
        cy.get('[id="val_vend_phone_error"]')
            .as('phoneValidation')
            .should("contain", "Please enter a valid phone number")


    })

})
