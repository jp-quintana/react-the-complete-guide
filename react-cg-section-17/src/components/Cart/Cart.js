import React, { useState, useContext } from 'react';

import Modal from '../UI/Modal/Modal'
import CartItem from './CartItem/CartItem'
import Checkout from './Checkout';

import CartContext from '../../store/cart-context'

import classes from './Cart.module.css'

const Cart = props => {
  const [isCheckingOut, setIsCheckingOut] = useState(false)
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

  return(
    <Modal onClose={props.onHideCart}>
      {cartItems}
      <div className={classes.total}>
        <span className="">Total Amount</span>
        <span className="">{totalAmount}</span>
      </div>
      {isCheckingOut && <Checkout onClose={props.onHideCart}/>}
      {!isCheckingOut && modalActions}
    </Modal>
  )
}

export default Cart
