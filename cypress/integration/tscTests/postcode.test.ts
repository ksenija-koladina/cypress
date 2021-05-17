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
            const flats = $doc.querySelectorAll('[data-street="Lebanon Road"]') as NodeListOf<any>
            let count: number = flats.length;
            let random: number = Math.floor(Math.random() * count);
           cy.get(flats[random])
               .click();
        })

        //Date and time

        cy.url().should('include', 'property-valuation/appointment-select')

        cy.document().then(($doc) => {
            const days = $doc.querySelectorAll(".day-component.available-day") as NodeListOf<any>
            let count: number = days.length;
            let random: number = Math.floor(Math.random() * count);
            cy.get(days[random])
               .click()

        })

        cy.document().then(($doc) => {
            const timeAv = $doc.querySelectorAll(".timeslot > .available") as NodeListOf<any>
            let count: number = timeAv.length;
            let random: number = Math.floor(Math.random() * count);
            if (timeAv.length)
            cy.get(timeAv[random]).as('bookingTime')
                .click();
        })

        //Input form

        cy.url().should('include', 'property-valuation/contact-details')

        function fullNameF() {
            let text1 = "";
            let text2 = "";
            let possible1 = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
            let possible2 = "abcdefghijklmnopqrstuvwxyz";

            text1 += possible1.charAt(Math.floor(Math.random() * possible1.length));

            for (let i = 0; i < 8; i++) {
            text2 += possible2.charAt(Math.floor(Math.random() * possible2.length));
            }
            return `${text1}${text2}`;
        }

        function emailF() {
            let emailText = "";
            let possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

            for (let i = 0; i < 10; i++)
                emailText += possible.charAt(Math.floor(Math.random() * possible.length));

            return emailText;
        }

        function phoneF() {
            let phoneNumber = "";

            for (let i = 0; i < 11; i++)
                phoneNumber += Math.floor(Math.random() * 9);

            return phoneNumber;
        }

        cy.get('[id="val_vend_full_name"]')
            .type(`${fullNameF()} ${fullNameF()}`)
        cy.get('[id="val_vend_email"]')
            .type(`${emailF()}@email.com`)
        cy.get('[id="val_vend_phone"]')
            .type(`+${phoneF()}`)

        cy.get('[id="val_opt_in"]').click()

        cy.get('[id="val_vend_full_name_error"]')
            .as('nameValidation')
            .should('not.exist')
        cy.get('[id="val_vend_email_error"]')
            .as('emailValidation')
            .should('not.exist')
        cy.get('[id="val_vend_phone_error"]')
            .as('phoneValidation')
            .should('not.exist')

        cy.get('#book-your-valuation-button')
            .click()

        cy.wait(5000);

        cy.url().should('include', 'property-valuation/confirmation')

        cy.get('#go-to-yopahub-sidebar-link')
            .click()




    })

})
