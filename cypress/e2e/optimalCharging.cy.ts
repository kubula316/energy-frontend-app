describe('Optimal Charging Calculator', () => {
  beforeEach(() => {
    cy.mockEnergyMixAPI();
    cy.visit('/');
  });

  describe('Initial state', () => {
    it('should display the calculator header correctly', () => {
      cy.contains('h2', 'Optimal Charging Calculator').should('be.visible');
      cy.contains('Find the best time to charge your electric vehicle').should('be.visible');
    });

    it('should display the form with default values', () => {
      cy.get('input[id="charging-hours"]').should('be.visible');
      cy.get('input[id="charging-hours"]').should('have.value', '3');
      cy.contains('button', 'Find optimal time').should('be.visible');
      cy.contains('button', 'Find optimal time').should('be.enabled');
    });

    it('should display helper text', () => {
      cy.contains('Enter a number of hours from 1 to 6').should('be.visible');
    });

    it('should display footer information', () => {
      cy.contains('Charge your car when renewable energy share is highest').should('be.visible');
    });
  });

  describe('Form validation', () => {
    it('should accept valid input (1-6 hours)', () => {
      [1, 2, 3, 4, 5, 6].forEach(hours => {
        cy.get('input[id="charging-hours"]').clear().type(hours.toString());
        cy.contains('button', 'Find optimal time').should('be.enabled');
      });
    });

    it('should handle invalid input - too small', () => {
      cy.get('input[id="charging-hours"]').clear().type('0');
      cy.contains('button', 'Find optimal time').should('be.disabled');
    });

    it('should handle invalid input - too large', () => {
      cy.get('input[id="charging-hours"]').clear().type('7');
      cy.contains('button', 'Find optimal time').should('be.disabled');
    });

    it('should handle invalid input - negative number', () => {
      cy.get('input[id="charging-hours"]').clear().type('-1');
      cy.contains('button', 'Find optimal time').should('be.disabled');
    });

    it('should handle invalid input - empty field', () => {
      cy.get('input[id="charging-hours"]').clear();
      cy.contains('button', 'Find optimal time').should('be.disabled');
    });

    it('should handle invalid input - non-numeric', () => {
      cy.get('input[id="charging-hours"]').clear().type('abc');
      cy.contains('button', 'Find optimal time').should('be.disabled');
    });
  });

  describe('Successful submission', () => {
    beforeEach(() => {
      cy.mockOptimalChargingAPI();
    });

    it('should submit form and display results', () => {
      cy.submitOptimalChargingForm(3);
      cy.wait('@getOptimalCharging');

      cy.contains('Optimal Charging Time').should('be.visible');
      cy.contains('Start charging').should('be.visible');
      cy.contains('End charging').should('be.visible');
    });

    it('should display loading spinner during submission', () => {
      cy.intercept('GET', '**/energy/optimal-charging*', (req) => {
        req.reply((res) => {
          res.delay = 1000;
          res.send({ fixture: 'optimalCharging.json' });
        });
      }).as('getOptimalCharging');

      cy.submitOptimalChargingForm(3);
      
      cy.contains('Analyzing energy forecasts...').should('be.visible');
      cy.get('[role="status"]').should('be.visible');
      
      cy.wait('@getOptimalCharging');
      cy.contains('Analyzing energy forecasts...').should('not.exist');
    });

    it('should display clean energy percentage in results', () => {
      cy.submitOptimalChargingForm(3);
      cy.wait('@getOptimalCharging');
      
      cy.contains('75.8%').should('be.visible');
    });

    it('should hide form after successful submission', () => {
      cy.submitOptimalChargingForm(3);
      cy.wait('@getOptimalCharging');
      
      // Form should not be visible
      cy.get('input[id="charging-hours"]').should('not.exist');
      cy.contains('button', 'Find optimal time').should('not.exist');
    });

    it('should display "Calculate again" button after results', () => {
      cy.submitOptimalChargingForm(3);
      cy.wait('@getOptimalCharging');
      
      cy.contains('button', 'Calculate again').should('be.visible');
    });

    it('should reset form when clicking "Calculate again"', () => {
      cy.submitOptimalChargingForm(3);
      cy.wait('@getOptimalCharging');
      
      cy.contains('button', 'Calculate again').click();

      cy.get('input[id="charging-hours"]').should('be.visible');
      cy.contains('button', 'Find optimal time').should('be.visible');

      cy.contains('Optimal Charging Time').should('not.exist');
    });
  });

  describe('Error handling', () => {
    it('should display error message on server error (500)', () => {
      cy.intercept('GET', '**/energy/optimal-charging*', {
        statusCode: 500,
        body: { message: 'Internal Server Error' }
      }).as('serverError');

      cy.submitOptimalChargingForm(3);
      cy.wait('@serverError');
      
      cy.contains('Server Error').should('be.visible');

      cy.get('input[id="charging-hours"]').should('be.visible');
    });

    it('should display error on network failure', () => {
      cy.intercept('GET', '**/energy/optimal-charging*', {
        forceNetworkError: true
      }).as('networkError');

      cy.submitOptimalChargingForm(3);
      cy.wait('@networkError');
      
      cy.contains('Connection Error').should('be.visible');
    });

    it('should allow form resubmission after error', () => {
      cy.intercept('GET', '**/energy/optimal-charging*', {
        statusCode: 500
      }).as('getOptimalChargingError');

      cy.submitOptimalChargingForm(3);
      cy.wait('@getOptimalChargingError');

      cy.contains('Server Error').should('be.visible');

      cy.intercept('GET', '**/energy/optimal-charging*', {
        fixture: 'optimalCharging.json'
      }).as('getOptimalChargingSuccess');

      cy.submitOptimalChargingForm(4);
      cy.wait('@getOptimalChargingSuccess');

      cy.contains('Optimal Charging Time').should('be.visible');
    });
  });
});
