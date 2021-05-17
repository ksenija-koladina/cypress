
describe('Test', () => {

    it('Test', () => {


        function emailF() {
            let emailText = "";
            let possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

            for (let i = 0; i < 10; i++)
                emailText += possible.charAt(Math.floor(Math.random() * possible.length));

            return emailText;
        }

        cy.log(`${emailF()}@email.com`)

    })
})

