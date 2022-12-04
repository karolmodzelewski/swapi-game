describe('Results popup', () => {
    beforeEach(() => {
        // Visit home page
        cy.visit('/');

        // Fill form
        cy.get('swapi-resource').contains('People').click();
        cy.get('mat-select').click();
        cy.get('mat-option').contains('Mass').click();
        cy.get('swapi-resource').contains('You').click();

        // Play button
        cy.get('swapi-wide-button.button').click();

        // Intercept requests on /game route
        cy.intercept('https://swapi.tech/api/people/*').as('person-one');
        cy.intercept('https://swapi.tech/api/people/*').as('person-two');

        // Wait until all requests completes
        cy.waitUntil(() => cy.wait(['@person-one', '@person-two'], { timeout: 15000 }));

        // Click on 'Show results' button
        cy.get('swapi-wide-button').click();
    });


    it(`Should show player's statistics`, () => {
        cy.get('.statistics .text').should('have.length', 3);
    });

    it(`Should play again after clicking the 'Play Again' button`, () => {
        // Should show popup
        cy.get('swapi-results-popup').should('have.length', 1);

        // Click on 'Play again' button
        cy.get('swapi-wide-button').contains('Play Again').click();

        // Should close popup
        cy.get('swapi-results-popup').should('have.length', 0);

        // Should show 'swapi-loading-state' component
        cy.get('swapi-loading-state').should('have.length', 1);
    });

    it(`Should navigate to home page after clicking the 'Home Page' button`, () => {
        // Click on 'Home Page' button
        cy.get('swapi-wide-button').contains('Home Page').click();

        // Navigate to home page
        cy.location('pathname').should('eq', '/');
    });
});
