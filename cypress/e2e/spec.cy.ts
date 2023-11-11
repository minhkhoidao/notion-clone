describe('Fundamental Test', () => {
  it('Contains correct header text', () => {
    cy.visit('/');
    cy.get("[data-test='heading-test']").should(
      'contain.text',
      'Your Ideas, Documents, & Plants. Unified. Welcome to',
    );
  });
  it('Contains correct header text', () => {
    cy.visit('http://localhost:3000/documents');
    cy.get("[data-test='command-item-3pt9p1qmkg7xqf4a096t18369k3kmxg']").should(
      'not.to.visible',
    );
  });
});
