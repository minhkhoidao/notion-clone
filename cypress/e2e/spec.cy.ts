describe('template spec', () => {
  it('passes', () => {
    cy.visit('http://localhost:3000/');
    cy.get("[data-test='heading-test']").should(
      'not.contain',
      ' Your Ideas, Documents, & Plants. Unified. Welcome to',
    );
  });
});
