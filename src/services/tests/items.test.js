import { itemsSlice } from "../recipe/items";

const testItem = {
  _id: '1',
  name: "Test ingredient 1",
  value: 0
};

const testItem2 = {
  _id: '2',
  name: "Test ingredient 2",
  value: 3
};
const testItem3 = {
  _id: '3',
  name: "Test ingredient 3",
  value: 2
};

const initStore = {
  items: [],
  itemsPendingStatus: ''
}

const {
  request,
  failed,
  success,
  increaseQuantityValue,
  decreaseQuantityValue,
  clearValues
} = itemsSlice.actions

describe('tests for itemsSlice', () => {

  it('should return the initial state', () => {
    expect(itemsSlice.reducer(undefined, {}))
    .toEqual(initStore)
  })

  it('should set the request state', () => {
    expect(itemsSlice.reducer({
      ...initStore,
      itemsPendingStatus: 'loading'
    }, request()))
    .toEqual({
      ...initStore,
      itemsPendingStatus: 'loading'
    })
  })

  it('should set the failed state', () => {
    expect(itemsSlice.reducer({
      ...initStore,
      itemsPendingStatus: 'loading'
    }, failed()))
    .toEqual({
      ...initStore,
      itemsPendingStatus: 'error'
    })
  })

  it('should set the success state and set the items data', () => {
    expect(itemsSlice.reducer({
      ...initStore,
      itemsPendingStatus: 'loading'
    }, success([
      testItem,
      testItem2,
      testItem3
    ])))
    .toEqual({
      ...initStore,
      itemsPendingStatus: 'success',
      items: [
        testItem,
        testItem2,
        testItem3
      ]
    })
  })

  it('should increase the qty by 1 of item with id 1', () => {
    expect(itemsSlice.reducer({
      ...initStore,
      items: [
        testItem,
        testItem2,
        testItem3
      ]
    }, increaseQuantityValue('1')))
    .toEqual({
      ...initStore,
      items: [
        {
          ...testItem,
          value : 1
        },
        testItem2,
        testItem3
      ]
    })
  })

  it('should decrease the qty by 1 of item with id 2', () => {
    expect(itemsSlice.reducer({
      ...initStore,
      items: [
        testItem,
        testItem2,
        testItem3
      ]
    }, decreaseQuantityValue('2')))
    .toEqual({
      ...initStore,
      items: [
        testItem,
        {
          ...testItem2,
          value : 2
        },
        testItem3
      ]
    })
  })
  
  it('should clear qty of all items in store', () => {
    expect(itemsSlice.reducer({
      ...initStore,
      items: [
        testItem,
        testItem2,
        testItem3
      ]
    }, clearValues()))
    .toEqual({
      ...initStore,
      items: [
        {
          ...testItem,
          value : 0
        },
        {
          ...testItem2,
          value : 0
        },
        {
          ...testItem3,
          value : 0
        }
      ]
    })
  })
})
