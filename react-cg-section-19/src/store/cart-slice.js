import { createSlice } from '@reduxjs/toolkit'

const cartInitialState = {
  items: [],
  totalQuantity: 0,
  totalAmount: 0,
  changed: false
}

const cartSlice = createSlice({
  name: 'cart',
  initialState: cartInitialState,
  reducers: {
    replaceCart(state, action) {
      state.totalQuantity = action.payload.totalQuantity
      state.items = action.payload.items
    },
    addItemToCart(state, action) {
      const addedItem = action.payload;
      const existingItem = state.items.find(item => item.id === addedItem.id)
      state.totalQuantity++
      state.changed = true

      if (!existingItem) {
        state.items.push({
          id: addedItem.id,
          name: addedItem.title,
          price: addedItem.price,
          quantity: 1,
          totalPrice: addedItem.price
        })
      } else {
        existingItem.quantity++
        existingItem.totalPrice = existingItem.totalPrice + addedItem.price
      }
    },

    removeItemFromCart(state, action) {
      const id = action.payload;
      const existingItem = state.items.find(item => item.id === id)
      state.totalQuantity--
      state.changed = true

      if (existingItem.quantity === 1) {
        // const index = state.items.indexOf(existingItem)
        // state.items.splice(index, 1)
        state.items = state.items.filter(item => item.id !== id)
      } else {
        existingItem.quantity--
        existingItem.totalPrice = existingItem.totalPrice - existingItem.price
      }
    }
  }
});

export const cartActions = cartSlice.actions
export default cartSlice;
