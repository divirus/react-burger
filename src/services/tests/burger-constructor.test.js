import { burgerConstructorSlice } from "../recipe/burger-constructor";

const testBun = {
  _id: '1',
  name: "Test bun",
  price: 100
};

const testBun2 = {
  _id: '2',
  name: "Test bun_2",
  price: 200
};

const testIngredient = {
  _id: '3',
  name: "Test ingredient",
  price: 300
};

const testIngredient2 = {
  _id: '4',
  name: "Test ingredient_2",
  price: 400
};
const testIngredient3 = {
  _id: '5',
  name: "Test ingredient_3",
  price: 500
};

const initStore = {
  bun: {
    _id: '',
    name: '',
    type: '',
    proteins: 0,
    fat: 0,
    carbohydrates: 0,
    calories: 0,
    price: 0,
    image: '',
    image_mobile: '',
    image_large: '',
    __v: 0
  },
  ingredients: [],
  totalPrice: 0
}

const {
  addIngredient,
  moveIngredient,
  deleteIngredient,
  clearIngredients,
  setBun,
  calcTotalPrice
} = burgerConstructorSlice.actions

describe('tests for burgerConstructorSlice', () => {

  it('should return the initial state', () => {
    expect(burgerConstructorSlice.reducer(undefined, {}))
    .toEqual(initStore)
  })

  it('should add the middle item', () => {
    expect(burgerConstructorSlice.reducer(
      initStore,
      addIngredient(testIngredient)
    )) 
    .toEqual({
      ...initStore,
      ingredients: [testIngredient]
    })
  })

  it('should add another middle item', () => {
    expect(burgerConstructorSlice.reducer({
        ...initStore,
        ingredients: [
          testIngredient
        ]
      },
      addIngredient(testIngredient2)
    )) 
    .toEqual({
      ...initStore,
      ingredients: [
        testIngredient,
        testIngredient2
      ]
    })
  })

  it('should add third middle item', () => {
    expect(burgerConstructorSlice.reducer({
        ...initStore,
        ingredients: [
          testIngredient,
          testIngredient2
        ]
      },
      addIngredient(testIngredient3)
    )) 
    .toEqual({
      ...initStore,
      ingredients: [
        testIngredient,
        testIngredient2,
        testIngredient3
      ]
    })
  })

  it('should move first middle item to make it last', () => {
    expect(burgerConstructorSlice.reducer({
        ...initStore,
        ingredients: [
          testIngredient,
          testIngredient2,
          testIngredient3
        ]
      },
      moveIngredient(0, 2)
    )) 
    .toEqual({
      ...initStore,
      ingredients: [
        testIngredient,
        testIngredient2,
        testIngredient3
      ]
    })
  })

  it('should remove the second middle item', () => {
    expect(burgerConstructorSlice.reducer({
        ...initStore,
        ingredients: [
          testIngredient,
          testIngredient2,
          testIngredient3
        ]
      },
      deleteIngredient(1)
    )) 
    .toEqual({
      ...initStore,
      ingredients: [
        testIngredient,
        testIngredient3
      ]
    })
  })

  it('should clear all middle items', () => {
    expect(burgerConstructorSlice.reducer({
        ...initStore,
        ingredients: [
          testIngredient,          
          testIngredient2,
          testIngredient3
        ]
      },
      clearIngredients()
    )) 
    .toEqual(initStore)
  })

  it('should add the bun', () => {
    expect(burgerConstructorSlice.reducer(
      initStore,
      setBun(testBun)
    ))
    .toEqual({
      ...initStore,
      bun: testBun
    })
  })

  it('should replace the bun', () => {
    expect(burgerConstructorSlice.reducer({
        ...initStore,
        bun: testBun
      },
      setBun(testBun2)
    ))
    .toEqual({
      ...initStore,
      bun: testBun2
    })
  })

  it('should remove the bun', () => {
    expect(burgerConstructorSlice.reducer({
        ...initStore,
        bun: testBun
      },
      setBun({
        _id: '',
        name: '',
        type: '',
        proteins: 0,
        fat: 0,
        carbohydrates: 0,
        calories: 0,
        price: 0,
        image: '',
        image_mobile: '',
        image_large: '',
        __v: 0
      })
    ))
    .toEqual(initStore)
  })

  it('should calculate the total price', () => {
    expect(burgerConstructorSlice.reducer({
        ...initStore,
        bun: testBun,
        ingredients: [
          testIngredient,
          testIngredient2
        ]
      },
      calcTotalPrice()
    ))
    .toEqual({
      ...initStore,
      bun: testBun,
      ingredients: [
        testIngredient,
        testIngredient2
      ],
      // 2x the bun price
      totalPrice: 900
    })
  })
})
