import '@4tw/cypress-drag-drop';

describe('tests', () => {
  beforeEach(() => {
    cy.viewport(1300, 900);
    cy.visit('/');
    cy.intercept('GET', 'ingredients', { fixture: 'ingredients.json' });
  });

  it('тестирование модалки ингредиента', () => {
    cy.get('[data-testid=ingredient-card]').first().click();
    cy.get('[data-testid=ingredient-title]').should('have.text', 'Краторная булка N-200i');
    cy.get('[data-testid=modal-close-btn]').click();
  });

  it('тестирование оформления заказа', () => {
    let email = 'test@test.test';
    let password = '12345678';
    cy.visit('/login');
    cy.get('[data-testid=email-input]').type(`${email}`);
    cy.get('[data-testid=password-input]').type(`${password}`);
    cy.get('button').click();
    cy.intercept('POST', '/api/auth/login', { fixture: 'login.json' });
    cy.intercept('GET', '/api/auth/user', { fixture: 'user.json' });

    window.localStorage.setItem('refreshToken', JSON.stringify('test-refreshToken'));
    cy.setCookie('accessToken', 'test-accessToken');

    cy.visit('/');
    cy.get('[data-testid=bun-container]').as('bun-container');
    cy.get('[data-testid=fillings-container]').as('fillings-container');
    cy.get('[data-testid=ingredient-card]').first().drag('@bun-container');
    cy.get('[data-testid=ingredient-card]').eq(3).drag('@fillings-container');
    cy.get('[data-testid=ingredient-card]').eq(6).drag('@fillings-container');
    cy.get('div[class^=constructor-element]').first().contains('Краторная булка N-200i (верх)').should('exist');
    cy.get('div[class^=constructor-element]').last().contains('Краторная булка N-200i (низ)').should('exist');
    cy.get('div[class^=constructor-element]').eq(1).contains('Соус традиционный галактический').should('exist');
    cy.get('div[class^=constructor-element]').eq(2).contains('Говяжий метеорит (отбивная)').should('exist');
    cy.get('[data-testid=button-order-submit]').click();
    cy.intercept('POST', 'orders', { fixture: 'order.json' });
    cy.get('h1[class^=order-details_title]').contains('37866').should('exist');
    cy.get('[data-testid=modal-close-btn]').click();

    cy.clearLocalStorage();
    cy.clearCookie('accessToken');
  });
});
