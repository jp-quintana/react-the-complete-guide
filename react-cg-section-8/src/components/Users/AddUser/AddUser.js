import React, { useState } from 'react';

import Card from '../../UI/Card/Card'
import Button from '../../UI/Button/Button.js'
import ErrorModal from '../../UI/ErrorModal/ErrorModal.js'


import styles from './AddUser.module.css'

const AddUser = props => {

  const [enteredUsername, setEnteredUsername] = useState('')
  const [enteredAge, setEnteredAge] = useState('')
  const [error, setError] = useState()

  const onAddUserHandler = e => {
    e.preventDefault()

    if (enteredUsername.trim().length === 0 || enteredAge.trim().length === 0) {
      setError({
        title: 'Invalid input',
        message: 'Please enter a valid name and age (non-empty values).'
      });
      return;
    }

    if (+enteredAge < 1) {
      setError({
        title: 'Invalid age',
        message: 'Please enter a valid age (>0).'
      });
      return;
    }

    props.onAddUser(enteredUsername, enteredAge)
    setEnteredUsername('');
    setEnteredAge('');
  }

  const usernameChangeHandler = e => {
    setEnteredUsername(e.target.value)
  }

  const ageChangeHandler = e => {
    setEnteredAge(e.target.value)
  }

  const errorHandler = () => {
    setError(null);
  }


  return (
    <div>
      {error && <ErrorModal title={error.title} message={error.message} onConfirm={errorHandler} />}
      <Card className={styles.input}>
        <form onSubmit={onAddUserHandler}>
          <label htmlFor="username">Username</label>
          <input onChange={usernameChangeHandler} value={enteredUsername} id="username" type="text"/>
          <label htmlFor="age">Age (Years)</label>
          <input onChange={ageChangeHandler} value={enteredAge} id="age" type="number"/>
          <Button type="submit">Add User</Button>
        </form>
      </Card>
    </div>
  )
}

export default AddUser;
