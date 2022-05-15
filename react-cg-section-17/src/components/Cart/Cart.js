import React, { useState, useContext } from 'react';

import Modal from '../UI/Modal/Modal'
import CartItem from './CartItem/CartItem'
import Checkout from './Checkout';

import CartContext from '../../store/cart-context'

import classes from './Cart.module.css'

const Cart = props => {
  const [isCheckingOut, setIsCheckingOut] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [didSubmit, setDidSubmit] = useState(false)


  const cartContext = useContext(CartContext);

  const totalAmount = `$${cartContext.totalAmount.toFixed(2)}`;
  const hasItems = cartContext.items.length > 0;

  const cartItemAddHandler = item => {
    cartContext.addItem({...item, amount: 1})
  }

  const cartItemRemoveHandler = id => {
    cartContext.removeItem(id)
  }

  const orderHandler = () => {
    setIsCheckingOut(true)
  }

  const submitOrderHandler = async userData => {
    setIsSubmitting(true);
    await fetch('https://react-cg-http-3a5c1-default-rtdb.firebaseio.com/orders.json', {
      method: 'POST',
      body: JSON.stringify({
        user:userData,
        orderedItems: cartContext.items
      })
    })
    setIsSubmitting(false);
    setDidSubmit(true);
    cartContext.clearCart()
  }

  const cartItems = (
    <ul className={classes['cart-items']}>
      {cartContext.items.map(item => (
        <CartItem
          key={item.id}
          name={item.name}
          amount={item.amount}
          price={item.price}
          onAdd={cartItemAddHandler.bind(null, item)}
          onRemove={cartItemRemoveHandler.bind(null, item.id)}
        />
      ))}
    </ul>
  )

  const modalActions = (
    <div className={classes.actions}>
      <button className={classes['button--alt']} onClick={props.onHideCart}>
        Close
      </button>
      {hasItems && (
        <button className={classes.button} onClick={orderHandler}>
          Order
        </button>
      )}
    </div>
  )

  const cartModalContent = (
    <>
      {cartItems}
      <div className={classes.total}>
        <span className="">Total Amount</span>
        <span className="">{totalAmount}</span>
      </div>
      {isCheckingOut && <Checkout onSubmit={submitOrderHandler} onClose={props.onHideCart}/>}
      {!isCheckingOut && modalActions}
    </>
  )

  const isSubmittingModalContent = <p>Sending order data...</p>

  const didSubmitModalContent = (
      <>
        <p>Succesfully sent the order!</p>
        <div className={classes.actions}>
          <button className={classes.button} onClick={props.onHideCart}>
            Close
          </button>
        </div>
      </>
  )

  return(
    <Modal onClose={props.onHideCart}>
      {!isSubmitting && !didSubmit && cartModalContent}
      {isSubmitting && isSubmittingModalContent}
      {!isSubmitting && didSubmit && didSubmitModalContent}
    </Modal>
  )
}

export default Cart
