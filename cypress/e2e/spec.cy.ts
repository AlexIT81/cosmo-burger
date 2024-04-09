import '@4tw/cypress-drag-drop';


describe('tests', () => {
  const ingredientSelector = '[data-testid=ingredient-card]';
  const constructorElementSelector = 'div[class^=constructor-element]';

  beforeEach(() => {
    cy.viewport(1300, 900);
    cy.visit('/');
    cy.intercept('GET', 'ingredients', { fixture: 'ingredients.json' });
  });

  it('тестирование модалки ингредиента', () => {
    cy.get(ingredientSelector).first().click();
    cy.get('[data-testid=ingredient-title]').should('have.text', 'Краторная булка N-200i');
    cy.get('[data-testid=modal-close-btn]').click();
  });

  it('тестирование оформления заказа', () => {
    let email = 'test@test.test';
    let password = '12345678';
    cy.login(email, password);

    cy.visit('/');
    cy.get('[data-testid=bun-container]').as('bun-container');
    cy.get('[data-testid=fillings-container]').as('fillings-container');
    cy.get(ingredientSelector).first().drag('@bun-container');
    cy.get(ingredientSelector).eq(3).drag('@fillings-container');
    cy.get(ingredientSelector).eq(6).drag('@fillings-container');
    cy.get(constructorElementSelector).first().contains('Краторная булка N-200i (верх)').should('exist');
    cy.get(constructorElementSelector).last().contains('Краторная булка N-200i (низ)').should('exist');
    cy.get(constructorElementSelector).eq(1).contains('Соус традиционный галактический').should('exist');
    cy.get(constructorElementSelector).eq(2).contains('Говяжий метеорит (отбивная)').should('exist');
    cy.get('[data-testid=button-order-submit]').click();
    cy.intercept('POST', 'api/orders', { fixture: 'order.json' });
    cy.get('h1[class^=order-details_title]').contains('37866').should('exist');
    cy.get('[data-testid=modal-close-btn]').click();

    cy.clearLocalStorage();
    cy.clearCookie('accessToken');
  });
});
