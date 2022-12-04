describe('Game Page', () => {
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
    });

    it(`Should show 2 'swapi-card' components`, () => {
        // Intercept requests on /game route
        cy.intercept('https://swapi.tech/api/people').as('people');
        cy.intercept('https://swapi.tech/api/people/*').as('person-one');
        cy.intercept('https://swapi.tech/api/people/*').as('person-two');

        // Wait until all requests completes
        cy.waitUntil(() => ['@people', '@person-one', '@person-two'], { timeout: 15000 });

        cy.get('swapi-card').should('have.length', 2);
    });

    it(`Should show 'swapi-loading-state' component if requests are pending`, () => {
        // Intercept requests on /game route
        cy.intercept('https://swapi.tech/api/people').as('people');
        cy.intercept('https://swapi.tech/api/people/*').as('person-one');
        cy.intercept('https://swapi.tech/api/people/*').as('person-two');

        // Wait until all requests completes
        cy.waitUntil(() => ['@people', '@person-one', '@person-two'], { timeout: 15000 });

        cy.get('swapi-loading-state').should('have.length', 1);
    });

    it(`Should show 'swapi-error-state' component if error occurs`, () => {
        // Intercept requests on /game route
        cy.intercept('https://swapi.tech/api/people', { statusCode: 404, failOnStatusCode: true }).as('people');
        cy.intercept('https://swapi.tech/api/people/*', { statusCode: 404, failOnStatusCode: true }).as('person-one');
        cy.intercept('https://swapi.tech/api/people/*', { statusCode: 404, failOnStatusCode: true }).as('person-two');

        // Wait until all requests completes
        cy.waitUntil(() => ['@people', '@person-one', '@person-two'], { timeout: 15000 });

        cy.get('swapi-error-state').should('have.length', 1);
    });

    it(`Should show 'Results' popup after game page is loaded`, () => {
        // Intercept requests on /game route
        cy.intercept('https://swapi.tech/api/people').as('people');
        cy.intercept('https://swapi.tech/api/people/*').as('person-one');
        cy.intercept('https://swapi.tech/api/people/*').as('person-two');

        // Wait until all requests completes
        cy.waitUntil(() => ['@people', '@person-one', '@person-two'], { timeout: 15000 });

        // Click on 'Show results' button
        cy.get('swapi-wide-button').click();

        // Show 'Results' popup
        cy.get('swapi-results-popup').should('have.length', 1);
    });

    it(`Should navigate to home page after clicking the logo`, () => {
        // Intercept requests on /game route
        cy.intercept('https://swapi.tech/api/people').as('people');
        cy.intercept('https://swapi.tech/api/people/*').as('person-one');
        cy.intercept('https://swapi.tech/api/people/*').as('person-two');

        // Wait until all requests completes
        cy.waitUntil(() => ['@people', '@person-one', '@person-two'], { timeout: 15000 });

        // Click on logo
        cy.get('img.logo').click();

        // Navigate to home page
        cy.location('pathname').should('eq', '/');
    });
});
