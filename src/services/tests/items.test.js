import { itemsSlice } from "../recipe/items";

const testItem = {
  _id: '1',
  name: "Test ingridient 1",
  __v: 0
};

const testItem2 = {
  _id: '2',
  name: "Test ingridient 2",
  __v: 1
};
const testItem3 = {
  _id: '3',
  name: "Test ingridient 3",
  __v: 2
};

const initStore = {
  items: [],
//   itemsRequest: false,
//   itemsFailed: false,
//   itemsSuccess: false
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
      itemsPendingStatus: 'success'
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
      itemsPendingStatus: 'failed'
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

  it('should increase the qty by 1 of item with id 123', () => {
    expect(itemsSlice.reducer({
      ...initStore,
      items: [
        testItem,
        testItem2,
        testItem3
      ]
    }, increaseQuantityValue('123')))
    .toEqual({
      ...initStore,
      items: [
        {
          ...testItem,
          __v : 1
        },
        testItem2,
        testItem3
      ]
    })
  })

  it('should decrease the qty by 1 of item with id 123', () => {
    expect(itemsSlice.reducer({
      ...initStore,
      items: [
        testItem,
        testItem2,
        testItem3
      ]
    }, decreaseQuantityValue('234')))
    .toEqual({
      ...initStore,
      items: [
        testItem,
        {
          ...testItem2,
          __v : 2
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
          __v : 0
        },
        {
          ...testItem2,
          __v : 0
        },
        {
          ...testItem3,
          __v : 0
        }
      ]
    })
  })
})
