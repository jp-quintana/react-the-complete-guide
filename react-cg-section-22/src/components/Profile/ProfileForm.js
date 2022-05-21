import { useContext, useRef } from 'react'
import { useHistory } from 'react-router-dom'

import AuthContext from '../../store/auth-context'

import classes from './ProfileForm.module.css';

const ProfileForm = () => {
  const authContext = useContext(AuthContext);
  const history = useHistory();

  const newPasswordInputRef = useRef('')

  const submitHandler = event => {
    event.preventDefault()

    const enteredNewPassword = newPasswordInputRef.current.value

    // add validation

    fetch(
      'https://identitytoolkit.googleapis.com/v1/accounts:update?key=AIzaSyAi46qAu6NI2z6WfMp6nDUyoOcG6yblFfc',
      {
        method: 'POST',
        body: JSON.stringify({
          idToken: authContext.token,
          password: enteredNewPassword,
          returnSecureToken: true
        }),
        headers: {
          'Content-Type': 'application/json'
        }
      }
    ).then(res => {
      if (res.ok) {
        return res.json()
      } else {
        return res.json().then(data => {
          let errorMessage = 'Authentication failed!';
          // if (data && data.error && data.error.message) {
          //   errorMessage = data.error.message
          // }
          throw new Error(errorMessage)
          // optional: show an error modal
        });
      }
    }).then(data => {
      authContext.login(data.idToken)
      history.replace('/')
    }).catch(error => {
      alert(error.message)
    })

  }

  return (
    <form onSubmit={submitHandler} className={classes.form}>
      <div className={classes.control}>
        <label htmlFor='new-password'>New Password</label>
        <input ref={newPasswordInputRef} type='password' id='new-password' />
      </div>
      <div className={classes.action}>
        <button>Change Password</button>
      </div>
    </form>
  );
}

export default ProfileForm;
