import { useRef, useState } from 'react';

const SimpleInput = (props) => {
  const nameInputRef = useRef();
  const [enteredName, setEnteredName] = useState('');

  const nameInputChangeHandler = event => {
    setEnteredName(event.target.value);
  };

  const forumSubmissionHandler = event => {
    event.preventDefault();

    console.log(enteredName);
    const enteredValue = nameInputRef.current.value;
  };

  return (
    <form>
      <div onSubmit={forumSubmissionHandler} className='form-control'>
        <label htmlFor='name'>Your Name</label>
        <input ref={nameInputRef} onChange={nameInputChangeHandler} type='text' id='name' />
      </div>
      <div className="form-actions">
        <button>Submit</button>
      </div>
    </form>
  );
};

export default SimpleInput;
