describe('Home Page', () => {
    beforeEach(() => {
        // Visit home page
        cy.visit('/');
    });

    it('Should have 3 sections', () => {
        cy.get('section.section').should('have.length', 3);
    });

    it(`Should fill the form for 'Resource.PEOPLE', 'Attribute.MASS' and 'Player.PLAYER_ONE'`, () => {
        // Fill form
        cy.get('swapi-resource').contains('People').click();
        cy.get('mat-select').click();
        cy.get('mat-option').contains('Mass').click();
        cy.get('swapi-resource').contains('You').click();

        // Play button
        cy.get('swapi-wide-button.button').should('not.have.attr', 'disabled');
    });

    it(`Should fill the form for 'Resource.STARSHIPS', 'Attribute.LENGTH' and 'Player.PLAYER_TWO'`, () => {
        // Fill form
        cy.get('swapi-resource').contains('Starships').click();
        cy.get('mat-select').click();
        cy.get('mat-option').contains('Length').click();
        cy.get('swapi-resource').contains('You (2)').click();

        // Play button
        cy.get('swapi-wide-button.button').should('not.have.attr', 'disabled');
    });

    it(`Should fill the form for 'Resource.STARSHIPS', 'Attribute.COST_IN_CREDITS' and 'Player.PLAYER_TWO' and change player and resource`, () => {
        // Fill form
        cy.get('swapi-resource').contains('Starships').click();
        cy.get('mat-select').click();
        cy.get('mat-option').contains('Cost in credits').click();
        cy.get('swapi-resource').contains('You (2)').click();

        // Change player and resource
        cy.get('swapi-resource').contains('You').click();
        cy.get('swapi-resource').contains('People').click();

        // Play button
        cy.get('swapi-wide-button.button').should('not.have.attr', 'disabled');
    });

    it(`Should fill the form, click 'Play' button and get redirect to 'game' page`, () => {
        // Fill form
        cy.get('swapi-resource').contains('Starships').click();
        cy.get('mat-select').click();
        cy.get('mat-option').contains('Cost in credits').click();
        cy.get('swapi-resource').contains('You (2)').click();

        // Play button
        cy.get('swapi-wide-button.button').click();
        cy.location('pathname').should('eq', '/game');

        // Intercept requests on /game route
        cy.intercept('https://swapi.tech/api/starships').as('starships');
        cy.intercept('https://swapi.tech/api/starships/*').as('starship-one');
        cy.intercept('https://swapi.tech/api/starships/*').as('starship-two');
    });
});
