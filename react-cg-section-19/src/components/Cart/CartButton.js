import { useSelector, useDispatch } from 'react-redux'

import { uiActions } from '../../store/ui'

import classes from './CartButton.module.css';

const CartButton = (props) => {
  const dispatch = useDispatch()
  const cartQuantity = useSelector(state => state.cart.totalQuantity)

  const toggleCartHandler = () => {
    dispatch(uiActions.toggleCart())
  }

  return (
    <button onClick={toggleCartHandler} className={classes.button}>
      <span>My Cart</span>
      <span className={classes.badge}>{cartQuantity}</span>
    </button>
  );
};

export default CartButton;
