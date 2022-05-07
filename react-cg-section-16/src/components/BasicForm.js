import useInput2 from '../hooks/use-input-2'

const BasicForm = (props) => {
  const {
    value: enteredName,
    valueIsValid: nameIsValid,
    hasError: nameInputIsInvalid,
    valueChangeHandler: nameChangeHandler,
    inputBlurHandler: nameBlurHandler,
    reset: nameReset
  } = useInput2(value => value.trim() !== '')

  const {
    value: enteredLastName,
    valueIsValid: lastNameIsValid,
    hasError: lastNameInputIsInvalid,
    valueChangeHandler: lastNameChangeHandler,
    inputBlurHandler: lastNameBlurHandler,
    reset: lastNameReset
  } = useInput2(value => value.trim() !== '')

  const {
    value: enteredEmail,
    valueIsValid: emailIsValid,
    hasError: emailInputIsInvalid,
    valueChangeHandler: emailChangeHandler,
    inputBlurHandler: emailBlurHandler,
    reset: emailReset
  } = useInput2(value => value.trim().match(/^(?=.{1,81}$)[\w\.-]+@[\w\.-]+\.\w{2,4}$/))
  // const [enteredName, setEnteredName] = useState('');
  // const [nameIsTouched, setNameIsTouched] = useState(false);
  //
  // const nameIsValid = enteredName.trim() !== '';
  // const nameInputIsInvalid = !nameIsValid && nameIsTouched;
  //
  // let formIsValid = false;
  //
  // if (enteredName) {
  //   formIsValid = true;
  // }
  //
  // const nameChangeHandler = event => {
  //   setEnteredName(event.target.value);
  // }
  //
  // const nameBlurHandler = () => {
  //   setNameIsTouched(true);
  // }

  let formIsValid = false;

  if (nameIsValid && lastNameIsValid && emailIsValid) {
    formIsValid = true;
  }

  const formSubmissionHandler = event => {
    event.preventDefault();

    if (nameInputIsInvalid || lastNameInputIsInvalid || emailInputIsInvalid) {
      return;
    }
    
    nameReset()
    lastNameReset()
    emailReset()

  }

  const nameInputClasses = nameInputIsInvalid ? 'form-control invalid' : 'form-control';
  const lastNameInputClasses = lastNameInputIsInvalid ? 'form-control invalid' : 'form-control';
  const emailInputClasses = emailInputIsInvalid ? 'form-control invalid' : 'form-control';


  return (
    <form onSubmit={formSubmissionHandler}>
      <div className='control-group'>
        <div className={nameInputClasses}>
          <label htmlFor='name'>First Name</label>
          <input
            value={enteredName}
            onChange={nameChangeHandler}
            onBlur={nameBlurHandler}
            type='text'
            id='name'
          />
          {nameInputIsInvalid && <p className="error-text">Name must not be empty.</p>}
        </div>
        <div className={lastNameInputClasses}>
          <label htmlFor='last-name'>Last Name</label>
          <input
            value={enteredLastName}
            onChange={lastNameChangeHandler}
            onBlur={lastNameBlurHandler}
            type='text'
            id='name'
          />
          {lastNameInputIsInvalid && <p className="error-text">Last name must not be empty.</p>}
        </div>
        <div className={emailInputClasses}>
          <label htmlFor='email'>E-Mail Address</label>
          <input
            value={enteredEmail}
            onChange={emailChangeHandler}
            onBlur={emailBlurHandler}
            type='text'
            id='name'
          />
          {emailInputIsInvalid && <p className="error-text">E-Mail must not be empty.</p>}
        </div>
      </div>
      <div className='form-actions'>
        <button disabled={!formIsValid}>Submit</button>
      </div>
    </form>
  );
};

export default BasicForm;
