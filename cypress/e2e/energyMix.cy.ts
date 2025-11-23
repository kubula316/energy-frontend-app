describe('Energy Mix Panel', () => {
  beforeEach(() => {
    cy.visit('/');
  });

  describe('Successful data loading', () => {
    beforeEach(() => {
      cy.mockEnergyMixAPI();
    });

    it('should display 3 daily energy mix charts', () => {
      cy.waitForEnergyMix();

      cy.get('[data-testid="daily-chart"]').should('have.length', 3);
    });

    it('should display correct data in charts', () => {
      cy.waitForEnergyMix();

      cy.get('[data-testid="daily-chart"]').first().within(() => {
        cy.contains('Solar').should('be.visible');
        cy.contains('12.5%').should('be.visible');
      });
    });

    it('should display clean energy badges', () => {
      cy.waitForEnergyMix();

      cy.contains('69.2%').should('be.visible');
      cy.contains('67.4%').should('be.visible');
      cy.contains('70.3%').should('be.visible');
    });

    it('should display footer information', () => {
      cy.waitForEnergyMix();
      
      cy.contains('Data shows the average energy mix throughout the day').should('be.visible');
    });
  });

  describe('Loading state', () => {
    it('should display loading spinner while fetching data', () => {
      cy.intercept('GET', '**/energy/mix', (req) => {
        req.reply((res) => {
          res.delay = 1000; // Delay response
          res.send({ fixture: 'energyMix.json' });
        });
      }).as('getEnergyMix');

      cy.visit('/');
      
      cy.contains('Loading energy mix data...').should('be.visible');
      cy.get('[role="status"]').should('be.visible');
      
      cy.wait('@getEnergyMix');
      cy.contains('Loading energy mix data...').should('not.exist');
    });
  });

  describe('Error handling', () => {
    it('should display error message when API returns 500', () => {
      cy.intercept('GET', '**/energy/mix', {
        statusCode: 500,
        body: { message: 'Internal Server Error' }
      }).as('getEnergyMixError');

      cy.visit('/');
      cy.wait('@getEnergyMixError');
      
      cy.contains('Server Error').should('be.visible');
      cy.contains('Try again').should('be.visible');
    });

    it('should display error message when API returns 404', () => {
      cy.intercept('GET', '**/energy/mix', {
        statusCode: 404,
        body: { message: 'Not Found' }
      }).as('getEnergyMix404');

      cy.visit('/');
      cy.wait('@getEnergyMix404');
      
      cy.contains('Not Found').should('be.visible');
    });

    it('should allow retry after error', () => {
      cy.intercept('GET', '**/energy/mix', {
        statusCode: 500,
        body: { message: 'Server Error' }
      }).as('getEnergyMixError');

      cy.visit('/');
      cy.wait('@getEnergyMixError');

      cy.contains('Server Error').should('be.visible');
      cy.contains('button', 'Try again').should('be.visible');

      cy.intercept('GET', '**/energy/mix', {
        fixture: 'energyMix.json'
      }).as('getEnergyMixSuccess');

      cy.contains('button', 'Try again').click();
      cy.wait('@getEnergyMixSuccess');

      cy.contains('Energy Mix Forecast').should('be.visible');
      cy.get('[data-testid="daily-chart"]').should('have.length', 3);
    });
  });

  describe('Empty data handling', () => {
    it('should display "No data" message when API returns empty array', () => {
      cy.intercept('GET', '**/energy/mix', {
        statusCode: 200,
        body: []
      }).as('emptyData');

      cy.visit('/');
      cy.wait('@emptyData');
      
      cy.contains('No data to display').should('be.visible');
    });
  });
});
