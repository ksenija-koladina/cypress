/// <reference types="cypress" />

describe('Locating Elements', () => {

    it('Add to cart works fine', () => {
        cy.visit("https://demo.nopcommerce.com") //Opens the URL

        cy.get("#small-searchterms").type("Apple MacBook Pro 13-inch");     //Search box

        cy.get(" #small-search-box-form > button ").click()     //Click the Search button

        cy.get(".product-box-add-to-cart-button[type='button']").click()

        cy.get('[data-val-required="The Qty field is required."]').clear().type("2") //Quantity

        cy.get('#add-to-cart-button-4').click()        //Click add to cart button after providing the quantity

        cy.wait(5000)
        cy.get('#topcartlink > a > span.cart-label').click()        //Shopping cart click
        cy.wait(3000)

        cy.get('.product-unit-price').contains( '$1,800.00')  //validation point

    })
})
