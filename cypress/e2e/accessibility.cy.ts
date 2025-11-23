describe('Accessibility Features', () => {
  beforeEach(() => {
    cy.mockEnergyMixAPI();
    cy.visit('/');
  });

  describe('Font Size Controls', () => {
    it('should display all font size options', () => {
      cy.contains('Font:').should('be.visible');
      cy.get('button[aria-label="Small font"]').should('be.visible');
      cy.get('button[aria-label="Medium font"]').should('be.visible');
      cy.get('button[aria-label="Large font"]').should('be.visible');
    });

    it('should have medium font selected by default', () => {
      cy.get('button[aria-label="Medium font"]').should('have.attr', 'aria-pressed', 'true');
    });

    it('should switch to small font', () => {
      cy.setFontSize('small');
      
      cy.get('button[aria-label="Small font"]').should('have.attr', 'aria-pressed', 'true');
      cy.get('button[aria-label="Medium font"]').should('have.attr', 'aria-pressed', 'false');
      cy.get('button[aria-label="Large font"]').should('have.attr', 'aria-pressed', 'false');
    });

    it('should switch to large font', () => {
      cy.setFontSize('large');
      
      cy.get('button[aria-label="Large font"]').should('have.attr', 'aria-pressed', 'true');
      cy.get('button[aria-label="Medium font"]').should('have.attr', 'aria-pressed', 'false');
      cy.get('button[aria-label="Small font"]').should('have.attr', 'aria-pressed', 'false');
    });

    it('should persist font size preference in localStorage', () => {
      cy.setFontSize('large');

      cy.reload();

      cy.get('button[aria-label="Large font"]').should('have.attr', 'aria-pressed', 'true');
    });

    it('should change font size across all components', () => {
      cy.waitForEnergyMix();

      cy.contains('Energy Mix Forecast').invoke('css', 'font-size').then((mediumSize) => {
        const mediumSizeValue = String(mediumSize);

        cy.setFontSize('large');

        cy.contains('Energy Mix Forecast').invoke('css', 'font-size').should((largeSize) => {
          const largeSizeValue = String(largeSize);
          expect(parseFloat(largeSizeValue)).to.be.greaterThan(parseFloat(mediumSizeValue));
        });
      });
    });

    it('should apply font size to form elements', () => {
      cy.get('input[id="charging-hours"]').invoke('css', 'font-size').then((mediumSize) => {
        const mediumSizeValue = String(mediumSize);
        
        cy.setFontSize('large');
        
        cy.get('input[id="charging-hours"]').invoke('css', 'font-size').should((largeSize) => {
          const largeSizeValue = String(largeSize);
          expect(parseFloat(largeSizeValue)).to.be.greaterThan(parseFloat(mediumSizeValue));
        });
      });
    });
  });

  describe('Theme Toggle', () => {
    it('should display theme toggle options', () => {
      cy.contains('Theme:').should('be.visible');
      cy.get('button[aria-label="Light theme"]').should('be.visible');
      cy.get('button[aria-label="Dark theme"]').should('be.visible');
    });

    it('should have dark theme selected by default', () => {
      cy.get('button[aria-label="Dark theme"]').should('have.attr', 'aria-pressed', 'true');
      cy.get('html').should('have.class', 'dark');
    });

    it('should switch to dark theme', () => {
      cy.setTheme('dark');
      
      cy.get('button[aria-label="Dark theme"]').should('have.attr', 'aria-pressed', 'true');
      cy.get('button[aria-label="Light theme"]').should('have.attr', 'aria-pressed', 'false');
      cy.get('html').should('have.class', 'dark');
    });

    it('should switch back to light theme', () => {
      cy.setTheme('dark');
      cy.get('html').should('have.class', 'dark');
      
      cy.setTheme('light');
      cy.get('html').should('not.have.class', 'dark');
      cy.get('button[aria-label="Light theme"]').should('have.attr', 'aria-pressed', 'true');
    });

    it('should persist theme preference in localStorage', () => {
      cy.setTheme('light');
      cy.get('html').should('not.have.class', 'dark');

      cy.reload();

      cy.get('html').should('not.have.class', 'dark');
      cy.get('button[aria-label="Light theme"]').should('have.attr', 'aria-pressed', 'true');
    });

    it('should apply dark theme styles', () => {
      cy.setTheme('dark');
      cy.get('div[id="root"]').children().should('have.class', 'dark:bg-gray-900');
    });
  });

  describe('Combined Accessibility Features', () => {
    it('should work correctly with both large font and dark theme', () => {
      cy.setFontSize('large');
      cy.setTheme('light');
      
      cy.get('button[aria-label="Large font"]').should('have.attr', 'aria-pressed', 'true');
      cy.get('button[aria-label="Light theme"]').should('have.attr', 'aria-pressed', 'true');
      cy.get('html').should('not.have.class', 'dark');
    });

    it('should maintain preferences after form submission', () => {
      cy.mockOptimalChargingAPI();
      
      cy.setFontSize('large');
      cy.setTheme('light');
      
      cy.submitOptimalChargingForm(3);
      cy.wait('@getOptimalCharging');

      cy.get('button[aria-label="Large font"]').should('have.attr', 'aria-pressed', 'true');
      cy.get('button[aria-label="Light theme"]').should('have.attr', 'aria-pressed', 'true');
      cy.get('html').should('not.have.class', 'dark');
    });
  });

});
