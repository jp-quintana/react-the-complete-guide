import { Component } from 'react'

import { useSelector, useDispatch, connect } from 'react-redux';

import { counterActions } from '../store/counter';
import classes from './Counter.module.css';

const Counter = () => {
  const dispatch = useDispatch()
  const counter = useSelector(state => {
    return state.counter.counter
  })
  const showCounter = useSelector(state => {
    return state.counter.showCounter
  })

  const incrementHandler = () => {
    dispatch(counterActions.increment())
  };

  const incrementByFiveHandler = () => {
    dispatch(counterActions.increase(5))
  };

  const decrementHandler = () => {
    dispatch(counterActions.decrement())
  };

  const toggleCounterHandler = () => {
    dispatch(counterActions.toggleCounter())
  };

  return (
    <main className={classes.counter}>
      <h1>Redux Counter</h1>
      {showCounter && <div className={classes.value}>{counter}</div>}
      <div>
        <button onClick={decrementHandler}>Decrement</button>
        <button onClick={incrementByFiveHandler}>Increment by 5</button>
        <button onClick={incrementHandler}>Increment</button>
      </div>
      <button onClick={toggleCounterHandler}>Toggle Counter</button>
    </main>
  );
};

export default Counter;

// class Counter extends Component {
//   incrementHandler() {
//     this.props.increment()
//   }
//
//   decrementHandler() {
//     this.props.decrement()
//   }
//
//   toggleCounterHandler() {
//
//   }
//
//   render() {
//     return (
//       <main className={classes.counter}>
//         <h1>Redux Counter</h1>
//         <div className={classes.value}>{this.props.counter}</div>
//         <div>
//           <button onClick={this.decrementHandler.bind(this)}>Decrement</button>
//           <button onClick={this.incrementHandler.bind(this)}>Increment</button>
//         </div>
//         <button onClick={this.toggleCounterHandler}>Toggle Counter</button>
//       </main>
//     );
//   }
// }
//
// const mapStateToProps = state => {
//   return {
//     counter: state.counter
//   }
// }
//
// const mapDispatchToProps = dispatch => {
//   return {
//     increment: () => dispatch({ type: 'increment' }),
//     decrement: () => dispatch({ type: 'decrement' })
//   }
// }
//
// export default connect(mapStateToProps, mapDispatchToProps)(Counter);
