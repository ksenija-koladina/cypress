/// <reference types="cypress" />

describe('First Test', () =>{

    it('Booking Free Valuation work good', () =>{
        cy.visit('https://preprod.yopa.co.uk/')
        cy.contains('Award winning estate agents').should('exist')
        cy.contains('Okay, got it').click()

        cy.get('[id="hero-home-postcode-input"]').type('CR0 6UW')
        cy.get('[class="y-btn y-btn--lg y-btn--lg-on-sm y-btn--no-radius-left y-btn--no-max-width home-hero__postcode-button home-hero__postcode-button--test"]').click()
        cy.url().should('include', '/property-valuation/address-select')
        cy.contains('Select Your Address').should('exist')

        //Address
        cy.get('.list-group-item').should('contain.text', 'Flat ')
        cy.contains('Flat').click()

        //Date and time
        cy.get('[class="day-component available-day "]').contains('1').click()
        cy.get('[class="available"]').contains('15:00').click()

        //Input form
        cy.get('[id="val_vend_full_name"]').type('Full Name')
        cy.get('[id="val_vend_email"]').type('Email@email')
        cy.get('[id="val_vend_phone"]').type('123456789')

        cy.get('[id="val_opt_in"]').click()
        cy.get('[id="val_vend_full_name_error"]').should('not.exist')
        cy.get('[id="val_vend_email_error"]').should('be.visible')
        cy.get('[id="val_vend_phone_error"]').should('be.visible')


    })

})