import burgerConstructorSlice from "../recipe/burger-constructor";

const testBun = {
  _id: 1,
  name: "Test bun",
  price: 100
};

const testBun2 = {
  _id: 2,
  name: "Test bun_2",
  price: 200
};

const testIngridient = {
  _id: 3,
  name: "Test ingridient",
  price: 300
};

const testIngridient2 = {
  _id: 4,
  name: "Test ingridient_2",
  price: 400
};
const testIngridient3 = {
  _id: 5,
  name: "Test ingridient_3",
  price: 500
};

const initStore = {
  bun: {},
  ingridients: [],
  totalPrice: 0
}

const {
  addIngridient,
  moveIngridient,
  deleteIngridient,
  clearIngridients,
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
      addIngridient(testIngridient)
    )) 
    .toEqual({
      ...initStore,
      Ingridients: [testIngridient]
    })
  })

  it('should add another middle item', () => {
    expect(burgerConstructorSlice.reducer({
        ...initStore,
        Ingridients: [
          testIngridient
        ]
      },
      addIngridient(testIngridient2)
    )) 
    .toEqual({
      ...initStore,
      Ingridients: [
        testIngridient,
        testIngridient2
      ]
    })
  })

  it('should add third middle item', () => {
    expect(burgerConstructorSlice.reducer({
        ...initStore,
        Ingridients: [
          testIngridient,
          testIngridient2
        ]
      },
      addIngridient(testIngridient3)
    )) 
    .toEqual({
      ...initStore,
      Ingridients: [
        testIngridient,
        testIngridient2,
        testIngridient3
      ]
    })
  })

  it('should move first middle item to make it last', () => {
    expect(burgerConstructorSlice.reducer({
        ...initStore,
        Ingridients: [
          testIngridient,
          testIngridient2,
          testIngridient3
        ]
      },
      moveIngridient(0, 2)
    )) 
    .toEqual({
      ...initStore,
      Ingridients: [
        testIngridient,
        testIngridient2,
        testIngridient3
      ]
    })
  })

  it('should remove the second middle item', () => {
    expect(burgerConstructorSlice.reducer({
        ...initStore,
        Ingridients: [
          testIngridient,
          testIngridient2,
          testIngridient3
        ]
      },
      deleteIngridient(1)
    )) 
    .toEqual({
      ...initStore,
      Ingridients: [
        testIngridient,
        testIngridient3
      ]
    })
  })

  it('should clear all middle items', () => {
    expect(burgerConstructorSlice.reducer({
        ...initStore,
        Ingridients: [
          testIngridient,          
          testIngridient2,
          testIngridient3
        ]
      },
      clearIngridients()
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
      setBun({})
    ))
    .toEqual(initStore)
  })

  it('should calculate the total price', () => {
    expect(burgerConstructorSlice.reducer({
        ...initStore,
        bun: testBun,
        Ingridients: [
          testIngridient,
          testIngridient2
        ]
      },
      calcTotalPrice()
    ))
    .toEqual({
      ...initStore,
      bun: testBun,
      Ingridients: [
        testIngridient,
        testIngridient2
      ],
      // 2x the bun price
      totalPrice: 900
    })
  })
})
