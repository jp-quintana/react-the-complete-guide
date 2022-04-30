import React from 'react';

import HeaderCartButton from '../HeaderCartButton/HeaderCartButton';

import mealsImage from '../../../assets/meals.jpg';
import classes from './Header.module.css';

const Header = props => {
  return(
    <>
      <header className={classes.header}>
        <h1 className="">ReactMeals</h1>
        <HeaderCartButton onClick={props.onShowCart}/>
      </header>
      <div className={classes['main-image']}>
        <img src={mealsImage} alt="A table full of food" className=""/>
      </div>
    </>
  )
}

export default Header
