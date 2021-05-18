/// <reference types="cypress" />

//import htmlString = JQuery.htmlString;

describe('Test Suite', () => {

    before( () => {
        cy.viewport(1280, 720)
        cy.visit('https://preprod.yopa.co.uk/')
    })

    it('Booking Free Valuation work good', () => {

        cy.contains('Award winning estate agents').should('exist')
        cy.contains('Okay, got it').click()

        cy.get('#hero-home-postcode-input').type('CR0 6UW')
        cy.get('.home-hero__form-var > .input-group > .input-group-btn > .y-btn')
            .as('postcodeButton')
            .click()
        cy.url().should('include', '/property-valuation/address-select')
        cy.contains('Select Your Address').should('exist')

        //Address

        let count:number
        let random:number
        cy.document().then(($doc) => {
            const flats = $doc.querySelectorAll('[data-street="Lebanon Road"]') as NodeListOf<any>
            count = flats.length;
            random = Math.floor(Math.random() * count);
            cy.get(flats[random])
                .click();


            //Date and time

            cy.url().should('include', 'property-valuation/appointment-select')

            if (cy.get('.available-day').should('not.exist')) {
                cy.get('#next-week').click()
            }
            //Date
            cy.document().then(($doc) => {
                let days = $doc.querySelectorAll('div.available-day') as NodeListOf<any>
                count = days.length;
                random = Math.floor(Math.random() * count);
                let daysRandom = days[random]
                let daysRandomText = daysRandom.textContent;
                cy.get(days[random])
                    .click()

                //Time
                let timeAv:any
                if (cy.get('.timeslot > .available').should('exist')) {
                    timeAv = $doc.querySelectorAll(".timeslot .available") as NodeListOf<any>
                }
                count = timeAv.length;
                random = Math.floor(Math.random() * count)
                let timeRandom = timeAv[random]
                let timeRandomText = timeRandom.textContent;
                cy.get(timeAv[random])
                    .click({force:true});
                // })

                //Contact Details

                cy.url().should('include', 'property-valuation/contact-details')

                //RANDOM WORDS GENERATOR

                const randomWords = require('random-words');

                function randomText() {
                    let namePassEmail:string = randomWords({exactly: 1, maxLength: 8, formatter: (word: string) => {
                            return word.slice(0, 1).toUpperCase().concat(word.slice(1));
                        }
                    })
                    return namePassEmail;
                }

                const fullName = `${randomText()} ${randomText()}`;
                const emailLogin = `${randomText()}.${randomText()}@email.com`;

                //RANDOM PHONE NUMBER GENERATOR

                let text = "";
                const PhoneNumber = require('awesome-phonenumber');

                function numberF(a: number) {
                    for (let i = 0; i < a; i++)
                        text += Math.floor(Math.random() * 9);
                    return text;
                }

                const passLogin = `${randomText()}${randomText()}${numberF(4)}`
                const pn = new PhoneNumber(numberF(10), 'LV');


                // CONTACT DETAILS FORM

                cy.get('[id="val_vend_full_name"]')
                    .type(fullName)
                cy.get('[id="val_vend_email"]')
                    .type(emailLogin)
                cy.get('[id="val_vend_phone"]')
                    .type(pn.getNumber('international'))

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

                // PASSWORD INPUT

                cy.get('input[yp-e2e-id=input-password]').type(passLogin)

                cy.get('button[yp-e2e-id=reset-password-button]')
                    .click()

                //Login page

                cy.get('input[yp-e2e-id=login-email-input]').type(emailLogin)
                cy.get('input[yp-e2e-id=login-password-input]').type(passLogin)
                cy.get('button[yp-e2e-id=login-button]').click()

                cy.wait(10000)

                // Closing Welcome Back window

                if (cy.get('#ngdialog1 > div.ngdialog-content').should('exist')) {
                    cy.get('[yp-e2e-id=verify-account-goto-yopahub-button]').click()
                }

                // Click to Properties

                cy.get('[yp-e2e-id=properties]').click()

                // Date an Time checking

                let dayTextVar
                switch (daysRandomText) {
                    case "1":
                        dayTextVar = `${daysRandomText}st`
                        break;
                    case "21":
                        dayTextVar = `${daysRandomText}st`
                        break;
                    case "31":
                        dayTextVar = `${daysRandomText}st`
                        break;
                    case "2":
                        dayTextVar = `${daysRandomText}nd`
                        break;
                    case "22":
                        dayTextVar = `${daysRandomText}nd`
                        break;
                    case "3":
                        dayTextVar = `${daysRandomText}rd`
                        break;
                    case "23":
                        dayTextVar = `${daysRandomText}rd`
                        break;
                    default:
                        dayTextVar = `${daysRandomText}th`
                        break;
                }

                cy.get('.date').should('contain', dayTextVar).and('contain', timeRandomText)
            })

        })

    })

})
