describe('drag and drop in construtor works correctly', function() {
  beforeEach(function() {
    cy.visit('http://localhost:3000');
    cy.wait(2000);
  });

  it('should load ingredients data', function() {
    cy.get('[class^=ingredient-details-card_card__]')
      .first()
      .as('bun');

    cy.get('@bun')
      .should('exist');

    cy.get('@bun')
      .find('img')
      .should('be.visible')
      .and(($img) => {
        // eslint-disable-next-line jest/valid-expect
        expect($img[0].naturalWidth).to.be.greaterThan(0)
      })
  })

  it('should drag and drop bun to the constructor', function() {
    cy.get('#ingredients-block-1')
      .find('[class^=ingredient-details-card_card__]')
      .first()
      .as('bun')

    cy.get('[class^=burger-constructor_list__]')
      .children()
      .first()
      .as('topBun')

    cy.get('@bun').trigger('dragstart');
    cy.get('@topBun').trigger('drop');

    cy.get('@topBun')
      .find('.constructor-element__text')
      .should('contain', 'Краторная булка N-200i (верх)')
  });
  
  it('should drag and drop ingredients', function() {
    cy.get('#ingredients-block-2')
      .find('[class^=ingredient-details-card_card__]')
      .first()
      .as('sauce')

    cy.get('#ingredients-block-3')
      .find('[class^=ingredient-details-card_card__]')
      .first()
      .as('main')

    cy.get('#ingredients-block-3')
      .find('[class^=ingredient-details-card_card__]')
      .last()
      .as('main2')

    cy.get('[class^=burger-constructor_list__]')
      .children()
      .next()
      .first()
      .as('ingredientsList')

    // drop 1st ingredient
    cy.get('@sauce').trigger('dragstart');
    cy.get('@ingredientsList').trigger('drop');

    // drop 2nd ingredient
    cy.get('@main').trigger('dragstart');
    cy.get('@ingredientsList').trigger('drop');

    // drop 3rd ingredient
    cy.get('@main2').trigger('dragstart');
    cy.get('@ingredientsList').trigger('drop');

    // check the ingredients in the list
    cy.get('@ingredientsList')
      .find('.constructor-element__text')
      .should('contain', 'Соус Spicy-X')
      .should('contain', 'Филе Люминесцентного тетраодонтимформа')
      .should('contain', 'Сыр с астероидной плесенью')      
  });

  it('should remove first ingredient from constructor', function() {
    cy.get('#ingredients-block-2')
      .find('[class^=ingredient-details-card_card__]')
      .first()
      .as('sauce')

    cy.get('#ingredients-block-3')
      .find('[class^=ingredient-details-card_card__]')
      .first()
      .as('main')

    cy.get('[class^=burger-constructor_list__]')
      .children()
      .next()
      .first()
      .as('ingredientsList')

    // drop 1st ingredient
    cy.get('@sauce').trigger('dragstart');
    cy.get('@ingredientsList').trigger('drop');

    // drop 2nd ingredient
    cy.get('@main').trigger('dragstart');
    cy.get('@ingredientsList').trigger('drop');

    cy.get('[class^=draggable-element_draggable_list_item__]')
      .first()
      .as('ingredient')

    cy.get('[class^=burger-constructor_draggable_list__]')
      .first()
      .as('ingredientsList')

    cy.get('@ingredient')
      .find('.constructor-element__action')
      .click()

    // check for the deleted ingredients name in the list
    cy.get('@ingredientsList')
      .find('.constructor-element__text')
      .should('not.contain', 'Соус Spicy-X')
  });

  it("should drag and drop ingredients, login and place an order", function () {
    cy.get("button").contains("Личный кабинет").click();

    cy.get('input[type*="email"]').click().type("cypress@email.com");
    cy.get('input[type*="password"]').click().type("123456");
    cy.get("button").contains("Войти").click();
    cy.wait(2000);

    cy.get("button").contains("Конструктор").click();

    cy.get('#ingredients-block-1')
      .find('[class^=ingredient-details-card_card__]')
      .first()
      .as('bun')

    cy.get('[class^=burger-constructor_list__]')
      .children()
      .first()
      .as('topBun')

    cy.get('@bun').trigger('dragstart');
    cy.get('@topBun').trigger('drop');

    cy.get('@topBun')
      .find('.constructor-element__text')
      .should('contain', 'Краторная булка N-200i (верх)')

    cy.get('#ingredients-block-2')
      .find('[class^=ingredient-details-card_card__]')
      .first()
      .as('sauce')

    cy.get('#ingredients-block-3')
      .find('[class^=ingredient-details-card_card__]')
      .first()
      .as('main')

    cy.get('#ingredients-block-3')
      .find('[class^=ingredient-details-card_card__]')
      .last()
      .as('main2')

    cy.get('[class^=burger-constructor_list__]')
      .children()
      .next()
      .first()
      .as('ingredientsList')

    // drop 1st ingredient
    cy.get('@sauce').trigger('dragstart');
    cy.get('@ingredientsList').trigger('drop');

    // drop 2nd ingredient
    cy.get('@main').trigger('dragstart');
    cy.get('@ingredientsList').trigger('drop');

    // drop 3rd ingredient
    cy.get('@main2').trigger('dragstart');
    cy.get('@ingredientsList').trigger('drop');

    cy.get("button").contains("Оформить заказ").click();
    cy.wait(5000);
  });
}); 