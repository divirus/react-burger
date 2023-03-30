import { feedSlice } from "../feed";

const testOrder = {
  _id: 1,
  name: "Test order",
  updatedAt: "2023-03-28T20:10:35.495Z"
};

const testOrder2 = {
  _id: 2,
  name: "Test order 2",
  updatedAt: "2023-03-29T20:15:35.495Z"
};

const testOrder3 = {
  _id: 3,
  name: "Test order 3",
  updatedAt: "2023-03-30T20:20:35.495Z"
};

const testTotal = 100;
const testTotalToday = 10;

const initStore = {
  orders: [],
  feedRequest: false,
  feedFailed: false,
  feedSuccess: false,
  ordersTotal: 0,
  ordersTotalToday: 0
}

const {
  request,
  failed,
  success,
  setOrdersData
} = feedSlice.actions

describe('tests for feedSlice', () => {

  it('should return the initial state', () => {
    expect(feedSlice.reducer(undefined, {}))
    .toEqual(initStore)
  })

  it('should set the request state', () => {
    expect(feedSlice.reducer({
      ...initStore,
      feedSuccess: true
    }, request()))
    .toEqual({
      ...initStore,
      feedRequest: true
    })
  })

  it('should set the failed state', () => {
    expect(feedSlice.reducer({
      ...initStore,
      feedRequest: true
    }, failed()))
    .toEqual({
      ...initStore,
      feedFailed: true
    })
  })

  it('should set the success state', () => {
    expect(feedSlice.reducer({
      ...initStore,
      feedRequest: true
    }, success()))
    .toEqual({
      ...initStore,
      feedSuccess: true
    })
  })

  it('should sort orders by time and set its data to the state', () => {
    expect(feedSlice.reducer({
      ...initStore
    }, setOrdersData({
      orders: [
        testOrder3,
        testOrder2,
        testOrder
      ],
      total: testTotal,
      totalToday: testTotalToday
    })))
    .toEqual({
      ...initStore,
      orders: [
        testOrder,
        testOrder2,
        testOrder3
      ],
      ordersTotal: testTotal,
      ordersTotalToday: testTotalToday
    })
  })
})
