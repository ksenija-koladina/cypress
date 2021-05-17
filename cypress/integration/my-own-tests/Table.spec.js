/// <reference types="cypress" />

describe('Testing', () => {

    it('Table Test', () => {

        cy.visit("http://testautomationpractice.blogspot.com/")

        cy.get('#cookieChoiceDismiss').click() //Close Cookie window

        //1) Check Value presence anywheere in the table

        cy.get('table[name=BookTable]')
            .contains('td', 'Learn Selenium')
            .should('be.visible')

        //2) Check Value presence in specific row & column

        cy.get('table[name=BookTable] > tbody > tr:nth-child(2) > td:nth-child(3)')
            .contains('Selenium')
            .should('be.visible')

        //3) Check Value presence based on condition by iterating row
        // Check the book name "Master in Java" whose author is Amod

        cy.get('table[name=BookTable] > tbody > tr td:nth-child(2)')
            .each(($e, index, $list) =>{

                const text = $e.text()
                if ( text.includes("Amod"))
                {
                    cy.get('table[name=BookTable] > tbody > tr td:nth-child(1)')
                        .eq(index)
                        .then((bName) => {
                        const bookName = bName.text()
                        expect(bookName).to.equal("Master In Java")
                    })
                }
            })

    })

})

















