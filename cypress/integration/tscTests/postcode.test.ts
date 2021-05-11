/// <reference types="cypress" />

import htmlString = JQuery.htmlString;

describe('First Test', () =>{

    it('Booking Free Valuation work good', () =>{
        cy.request('https://preprod.yopa.co.uk/')
        cy.contains('Award winning estate agents').should('exist')
        cy.contains('Okay, got it').click()

        cy.get('#hero-home-postcode-input').type('CR0 6UW')
        cy.get('[class="y-btn y-btn--lg y-btn--lg-on-sm y-btn--no-radius-left ' +
            'y-btn--no-max-width home-hero__postcode-button home-hero__postcode-button--test"]')
            .as('postcodeButton')
            .click()
        cy.url().should('include', '/property-valuation/address-select')
        cy.contains('Select Your Address').should('exist')

        //Address

        cy.document().then(($doc) => {
            const flats = $doc.querySelectorAll('*[data-street="Lebanon Road"]') as NodeList
            let count: number = flats.length;
            let random: number = Math.floor(Math.random() * count);
            cy.get(flats[random])
                .click();
        })

        //Date and time
        cy.document().then(($doc) => {
            const days = $doc.querySelectorAll(".day-component.available-day") as NodeList
            let count: number = days.length;
            let random: number = Math.floor(Math.random() * count);
            cy.get(days[random])
                .click()

        })

        cy.document().then(($doc) => {

            const timeAv = $doc.querySelectorAll(".timeslot > .available") as NodeList
            let count = timeAv.length;
            let random = Math.floor(Math.random() * count);
            if (timeAv.length)
            cy.get(timeAv[random])
                .click();
        })


        //Input form
        cy.get('[id="val_vend_full_name"]')
            .type('Full Name')
        cy.get('[id="val_vend_email"]')
            .type('Email@email')
        cy.get('[id="val_vend_phone"]')
            .type('123456789')
        cy.get('[id="val_opt_in"]').click()

        cy.get('[id="val_vend_full_name_error"]')
            .as('fullNameValidation')
            .should('not.exist')
        cy.get('[id="val_vend_email_error"]')
            .as('emailValidation')
            .should('be.visible')
        cy.get('[id="val_vend_phone_error"]')
            .as('phoneValidation')
            .should('be.visible')


    })

})