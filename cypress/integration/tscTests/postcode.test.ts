/// <reference types="cypress" />

//import htmlString = JQuery.htmlString;

describe('Test Suite', () =>{

    it('Booking Free Valuation work good', () =>{

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
            const flats = $doc.querySelectorAll('[data-street="Lebanon Road"]') as NodeListOf<any>
            let count: number = flats.length;
            let random: number = Math.floor(Math.random() * count);
            cy.get(flats[random])
               .click();
        })

        //Date and time

        cy.url().should('include', 'property-valuation/appointment-select')

        if(cy.get('.day-component.available-day').should('not.exist')){
        cy.get('#next-week').click()}

        //Date

        cy.document().then(($doc )=> {
            const days = $doc.querySelectorAll(".day-component.available-day") as NodeListOf<any>
            let count: number = days.length;
            let random: number = Math.floor(Math.random() * count);
            let daysRandom = days[random]
            let daysRandomText = daysRandom.textContent;
            cy.get(days[random])
               .click()

        cy.wait(3000)

        //Time

            const timeAv = $doc.querySelectorAll(".timeslot > .available") as NodeListOf<any>
            count = timeAv.length;
            random = Math.floor(Math.random() * count)
            let timeRandom = timeAv[random]
            cy.get(timeAv[random]).click();
            // })

            //Contact Details input form

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

            const emailLogin = `${emailF()}@email.com`

            cy.get('[id="val_vend_full_name"]')
                .type(`${fullNameF()} ${fullNameF()}`)
            cy.get('[id="val_vend_email"]')
                .type(emailLogin)
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

            // Password input form

            function randPassF() {
                let randText = "";
                let possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
                let possible2 = "abcdefghijklmnopqrstuvwxyz";


                for (let i = 0; i < 9; i++)
                    randText += possible2.charAt(Math.floor(Math.random() * possible2.length));
                    randText += possible.charAt(Math.floor(Math.random() * possible.length));
                    randText += Math.floor(Math.random() * 9);
                return randText;
            }

            const passwordLogin = randPassF();

            cy.get('input[yp-e2e-id=input-password]').type(passwordLogin)

            cy.get('button[yp-e2e-id=reset-password-button]')
                .click()

            //Login page

            cy.get('input[yp-e2e-id=login-email-input]').type(emailLogin)
            cy.get('input[yp-e2e-id=login-password-input]').type(passwordLogin)
            cy.get('button[yp-e2e-id=login-button]').click()

            cy.wait(10000)

            // Closing Welcome Back window

            if (cy.get('#ngdialog1 > div.ngdialog-content').should('exist')){
                cy.get('[yp-e2e-id=verify-account-goto-yopahub-button]').click()
            }

            // Click to Properties

            cy.get('[yp-e2e-id=properties]').click()


            // Laika pārbaude
            let dayTextVar
            if(daysRandomText === '1'){
                dayTextVar = `${daysRandomText}st June`
            }else if (daysRandomText === '2'){
                dayTextVar = `${days[random].textContent}nd June`
            }else if (daysRandomText === '3'){
                dayTextVar = `${days[random].textContent}rd June`
            }else{
                dayTextVar = `${days[random].textContent}th June`
            }

            cy.get('.date').should('contain', dayTextVar).and('contain', timeRandom.textContent)
            })

    })

})
