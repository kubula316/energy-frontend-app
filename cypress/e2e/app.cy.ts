describe('Application General Tests', () => {
  beforeEach(() => {
    cy.mockEnergyMixAPI();
    cy.visit('/');
  });

  describe('Initial page load', () => {
    it('should load the application successfully', () => {
      cy.get('main').should('be.visible');
    });

    it('should display the page title', () => {
      cy.title().should('not.be.empty');
    });

    it('should display all main sections', () => {
      cy.contains('Font:').should('be.visible');
      cy.contains('Theme:').should('be.visible');
      cy.contains('Energy Mix Forecast').should('be.visible');
      cy.contains('Optimal Charging Calculator').should('be.visible');
    });
  });

  describe('Layout and Structure', () => {
    it('should display accessibility controls in header', () => {
      cy.get('header').within(() => {
        cy.contains('Font:').should('be.visible');
        cy.contains('Theme:').should('be.visible');
      });
    });

    it('should display panels in correct order', () => {
      cy.get('main > div').first().should('contain', 'Energy Mix Forecast');
      cy.get('main > div').last().should('contain', 'Optimal Charging Calculator');
    });
  });

  describe('Multiple API calls', () => {
    it('should handle both APIs loading simultaneously', () => {
      cy.mockEnergyMixAPI();
      cy.mockOptimalChargingAPI();

      cy.visit('/');
      cy.waitForEnergyMix();

      cy.submitOptimalChargingForm(3);
      cy.wait('@getOptimalCharging');

      cy.contains('Energy Mix Forecast').should('be.visible');
      cy.contains('Optimal Charging Time').should('be.visible');
    });

    it('should handle energy mix error while charging works', () => {
      cy.intercept('GET', '**/energy/mix', { statusCode: 500 });
      cy.mockOptimalChargingAPI();

      cy.visit('/');

      cy.contains('Server Error').should('be.visible');

      cy.submitOptimalChargingForm(3);
      cy.wait('@getOptimalCharging');
      cy.contains('Optimal Charging Time').should('be.visible');
    });
  });

  describe('Edge Cases', () => {
    it('should handle very slow network', () => {
      cy.intercept('GET', '**/energy/mix', (req) => {
        req.reply((res) => {
          res.delay = 5000;
          res.send({ fixture: 'energyMix.json' });
        });
      }).as('slowNetwork');

      cy.visit('/');

      cy.contains('Loading energy mix data...').should('be.visible');
      
      cy.wait('@slowNetwork');

      cy.contains('Energy Mix Forecast').should('be.visible');
    });

    it('should handle rapid theme switching', () => {
      cy.setTheme('dark');
      cy.setTheme('light');
      cy.setTheme('dark');
      cy.setTheme('light');

      cy.get('html').should('not.have.class', 'dark');
      cy.get('button[aria-label="Light theme"]').should('have.attr', 'aria-pressed', 'true');
    });

    it('should handle rapid font size switching', () => {
      cy.setFontSize('small');
      cy.setFontSize('large');
      cy.setFontSize('medium');
      cy.setFontSize('large');

      cy.get('button[aria-label="Large font"]').should('have.attr', 'aria-pressed', 'true');
    });
  });
});
