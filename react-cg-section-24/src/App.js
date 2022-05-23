import React, { Component } from "react";
import Transition from 'react-transition-group/Transition'

import "./App.css";
import Modal from "./components/Modal/Modal";
import Backdrop from "./components/Backdrop/Backdrop";
import List from "./components/List/List";

class App extends Component {
  state = {
    ModalIsOpen: false,
    showBlock: false
  }

  showModal = () => {
    this.setState({ModalIsOpen: true})
  }

  closeModal = () => {
    this.setState({ModalIsOpen: false})
  }

  render() {
    return (
      <div className="App">
        <h1>React Animations</h1>
        <button className="Button" onClick={() => this.setState(prevState => ({showBlock: !prevState.showBlock}))}>Toggle</button>
        <br/>
        <Transition
          in={this.state.showBlock}
          timeout={300}
          mountOnEnter
          unmountOnExit
        >
          {state => (
            <div
              style={{
                backgroundColor: 'red',
                width: 100,
                height: 100,
                margin: 'auto',
                transition: 'opacity 1s ease-out',
                opacity: state === 'exited' ? 0 : 1
              }}
            />
          )}
          {/*this.state.showBlock ?*/}

          {/*</div> : null*/}
        </Transition>
        <Modal show={this.state.ModalIsOpen} closed={this.closeModal}/>
        {this.state.ModalIsOpen ? (
          <Backdrop show/>
        ) : null}

        <button className="Button" onClick={this.showModal}>Open Modal</button>
        <h3>Animating Lists</h3>
        <List />
      </div>
    );
  }
}

export default App;
