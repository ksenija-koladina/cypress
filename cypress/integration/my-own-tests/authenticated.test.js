/// <reference types="cypress" />

const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6Imlvc2RldiIsIl9pZCI6IjViNzM2N2JiYzdjNDU1MTA5ZTFmNzI4YyIsIm5hbWUiOiJpb3NkZXYiLCJpYXQiOjE2MTk1MjYyNjIsImV4cCI6MTYyMjExODI2Mn0.Wezm5WVtwiUUjR7liPfkzEmxpU5eSHyWL4FfCF2kCHw'

describe('Basic Authenticated Desktop Tests', () =>{

    before(() =>{
        cy.then(() => {
            window.localStorage.setItem('__auth__token', token)
        })
    })
    //bootstrapping external things

    beforeEach(() =>{
        cy.viewport(1280, 720)
        cy.visit('https://codedamn.com')
    })

    it('Should load playground correctly', () => {
        cy.visit('https://codedamn.com/playground/html')

        cy.log('Checking for sidebar')
        cy.contains('Trying to connect').should('exist')

        cy.log('Checking toast button')
        cy.contains('Upgrade to Pro').should('contain.text', 'Upgrade to Pro')

        cy.contains('Trying to establish connection').should('exist')

        cy.log('Playground is initializing')

        cy.contains('You have reached', {timeout: 10 * 1000}).should('exist')


        //cy.contains('Setting up the challenge').should('exist')
        //cy.contains('Setting up the challenge').should('not.exist')
        //cy.get('div')
        //cy.debug()
    })

    it('New file features works', () => {
        cy.visit('https://codedamn.com/playground/html')

        const fileName = Math.random()

        cy.get('[data-testid=xterm]')
            .type('{ctrl}{c}')
            .type(`touch testscript.${fileName}.js{enter}`)

        cy.contains(`testscript.${fileName}.js`).should('exist')

    })

    it.only('New file features works', () => {
        cy.visit('https://codedamn.com/playground/html')

        const fileName = Math.random()

        cy.get('[data-testid=xterm]')
            .type('{ctrl}{c}')
            .type(`touch testscript.${fileName}.js{enter}`)

        cy.contains(`testscript.${fileName}.js`).rightclick()
        cy.contains('Rename File').click()

        cy.get('[data-testid=renamefilefolder]').type(`new_.${fileName}.js`)

        cy.get('[data-testid=renamebtn').click()

        cy.contains(`testscript.${fileName}.js`).should('not.exist')

        cy.contains(`new_.${fileName}.js`).should('exist')

    })
})