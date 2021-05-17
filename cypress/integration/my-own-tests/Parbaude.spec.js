describe('First Test', () => {

    it('Booking Free Valuation work good', () => {

        cy.viewport(1280, 720)
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
            const flats = $doc.querySelectorAll('[data-street="Lebanon Road"]')

            let count = flats.length;
            let random = Math.floor(Math.random() * count);
            cy.get(flats[random])
                .click();
        })

        //Date and time

        cy.url().should('include', 'property-valuation/appointment-select')

        if (cy.get('.day-component.available-day').should('not.exist')) {
            cy.get('#next-week').click()
        }

        cy.document().then(($doc) => {
            const days = $doc.querySelectorAll(".day-component.available-day")
            let count = days.length;
            let random = Math.floor(Math.random() * count);
            const daysRandomDay = days[random];
            cy.log(daysRandomDay)
            cy.get(daysRandomDay)
                .click()

        })

        let timeAv
        let timeRandom
        let timeRandomText

        cy.document().then(($doc) => {
            timeAv = $doc.querySelectorAll(".timeslot > .available")
            let count = timeAv.length;
            let random = Math.floor(Math.random() * count);
            timeRandom = timeAv[random];
            timeRandomText = timeRandom.textContent;
            cy.log(typeof timeRandomText)
            cy.log(typeof timeRandomText)
            cy.get(timeRandom)
                // .click();
        })
    })
})