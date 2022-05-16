import { createSlice } from '@reduxjs/toolkit'

import { uiActions } from './ui'

const cartInitialState = {
  items: [],
  totalQuantity: 0,
  totalAmount: 0
}

const cartSlice = createSlice({
  name: 'cart',
  initialState: cartInitialState,
  reducers: {
    addItemToCart(state, action) {
      const addedItem = action.payload;
      const existingItem = state.items.find(item => item.id === addedItem.id)
      state.totalQuantity++

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

      if (existingItem.quantity === 1) {
        // const index = state.items.indexOf(existingItem)
        // state.items.splice(index, 1)
        state.items = state.items.filter(item => item.id !== id)
      } else {
        existingItem.quantity--
        existingItem.totalPrice = existingItem.totalPrice + existingItem.price
      }
    }
  }
});

export const sendCartData = (cart) => {
  return async (dispatch) => {
    dispatch(uiActions.showNotification({
      status: 'pending',
      title: 'Sending...',
      message: 'Sending cart data!'
    }))

    const sendRequest = async () => {
      const response = await fetch('https://react-cg-http-3a5c1-default-rtdb.firebaseio.com/cart.json', {
        method: 'PUT',
        body: JSON.stringify(cart)
      })

      if (!response.ok) {
        throw new Error('Sent cart data failed!')
      }
    }

    try {
      await sendRequest()

      dispatch(uiActions.showNotification({
        status: 'success',
        title: 'Success!',
        message: 'Sent cart data successfully!'
      }))
    } catch (error) {
      sendCartData().catch(error => {
        dispatch(uiActions.showNotification({
          status: 'error',
          title: 'Error!',
          message: error
        }))
      })
    }
  }
}

export const cartActions = cartSlice.actions
export default cartSlice;
