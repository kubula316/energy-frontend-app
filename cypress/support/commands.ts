/// <reference types="cypress" />

Cypress.Commands.add('mockEnergyMixAPI', (fixture = 'energyMix.json', statusCode = 200) => {
  cy.intercept('GET', '**/energy/mix', {
    statusCode,
    fixture
  }).as('getEnergyMix');
});

Cypress.Commands.add('mockOptimalChargingAPI', (fixture = 'optimalCharging.json', statusCode = 200) => {
  cy.intercept('GET', '**/energy/optimal-charging*', {
    statusCode,
    fixture
  }).as('getOptimalCharging');
});

// Custom command to set font size
Cypress.Commands.add('setFontSize', (size: 'small' | 'medium' | 'large') => {
  const labels = {
    small: 'Small font',
    medium: 'Medium font',
    large: 'Large font'
  };
  cy.get(`button[aria-label="${labels[size]}"]`).click();
});

// Custom command to set theme
Cypress.Commands.add('setTheme', (theme: 'light' | 'dark') => {
  const labels = {
    light: 'Light theme',
    dark: 'Dark theme'
  };
  cy.get(`button[aria-label="${labels[theme]}"]`).click();
});

Cypress.Commands.add('waitForEnergyMix', () => {
  cy.wait('@getEnergyMix');
});

Cypress.Commands.add('submitOptimalChargingForm', (hours: number) => {
  cy.get('input[id="charging-hours"]').clear().type(hours.toString());
  cy.contains('button', 'Find optimal time').click();
});

declare global {
  namespace Cypress {
    interface Chainable {
      mockEnergyMixAPI(fixture?: string, statusCode?: number): Chainable<void>;
      mockOptimalChargingAPI(fixture?: string, statusCode?: number): Chainable<void>;
      setFontSize(size: 'small' | 'medium' | 'large'): Chainable<void>;
      setTheme(theme: 'light' | 'dark'): Chainable<void>;
      waitForEnergyMix(): Chainable<void>;
      submitOptimalChargingForm(hours: number): Chainable<void>;
    }
  }
}

export {};
