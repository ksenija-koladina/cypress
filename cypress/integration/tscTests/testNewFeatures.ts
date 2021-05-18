/// <reference types="cypress" />

describe('UI Elements', () => {

    it('random', () => {

        // var PhoneNumber = require( 'awesome-phonenumber' );
        //
        // function phoneF() {
        //     let phoneNumber = "";
        //     for (let i = 0; i < 9; i++)
        //         phoneNumber += Math.floor(Math.random() * 9);
        //     return phoneNumber;
        // }
        //
        // var pn = new PhoneNumber( phoneF(), 'LV' );
        // pn.isValid( );  // -> true
        // pn.isMobile( ); // -> true
        // pn.canBeInternationallyDialled( ); // -> true
        // pn.getNumber( );                   // -> '+46707123456'
        // pn.getNumber( 'e164' );            // -> '+46707123456' (default)
        // pn.getNumber( 'international' );   // -> '+46 70 712 34 56'
        // pn.getNumber( 'national' );        // -> '070-712 34 56'
        // pn.getNumber( 'rfc3966' );         // -> 'tel:+46-70-712-34-56'
        // pn.getNumber( 'significant' );     // -> '707123456'
        // pn.getRegionCode( );               // -> 'SE'
        // pn.getCountryCode( );              // -> 46
        //
        // cy.log(pn.getNumber( 'international' ));
        //
        // pn.toJSON( );                  // -> json blob, so that:
        // JSON.stringify( pn, null, 4 ); // -

        // let text:string;
        // function numberF(a: number) {
        //     text = "";
        //     for (let i = 0; i < a; i++)
        //         text += Math.floor(Math.random() * 9);
        //     return text;
        // }

        var randomWords = require('random-words');
        let namePassEmail: string;

        function randomText() {
            namePassEmail = randomWords({exactly: 1, maxLength: 8, formatter: (word: string) => {
                    return word.slice(0, 1).toUpperCase().concat(word.slice(1));
                }
            })
            return namePassEmail;
        }

        cy.log(`${randomText()} ${randomText()}`)
        cy.log(`${randomText()}.${randomText()}`)
        cy.log(`${randomText()}${randomText()}`)

        let text = "";
        function numberF(a: number) {
            for (let i = 0; i < a; i++)
                text += Math.floor(Math.random() * 9);
            return text;
        }

        cy.log(numberF(4))


//
// console.log(randomWords({ exactly: 2 }));
//
//
// console.log(randomWords({ exactly: 5, join: ' ' }))
//
//
// console.log(randomWords({ exactly: 5, join: '' }))
//
//
// console.log(randomWords({exactly: 5, maxLength: 4}))
//
//
// console.log(randomWords({exactly:5, wordsPerString:2}))
//
//
// console.log(randomWords({exactly:5, wordsPerString:2, separator:'-'}))
//
//
// console.log(randomWords({exactly:5, wordsPerString:2, formatter: (word)=> word.toUpperCase()}))
//
//
// console.log(randomWords({exactly:5, wordsPerString:2, formatter: (word, index)=> {
//         return index === 0 ? word.slice(0,1).toUpperCase().concat(word.slice(1)) : word;
//     }}))




    })


})



















