import { useState } from 'react';
import Button from '../../button/button';
import './action-form.css';

export default function ActionForm({
  onSubmit,
  initialText = '',
  buttonText = 'Submit',
  onCancel,
}) {
  const [text, setText] = useState(initialText);

  const handleSubmit = (event) => {
    event.preventDefault();
    onSubmit(text);
    setText('');
  };

  return (
    <form className='action-form' onSubmit={handleSubmit}>
      <textarea
        className='action-textarea'
        value={text}
        onChange={(event) => setText(event.target.value)}
        required
        maxLength={140}
        rows={10}
        cols={10}
      />
      <div className='form-btn'>
        <Button text='Cancel' classes='action-btn cancel-btn' onClick={onCancel} />
        <Button text={buttonText} type='submit' classes='action-btn' />
      </div>
    </form>
  );
}
