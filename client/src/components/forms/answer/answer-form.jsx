import Button from '../../button/button';
import answerService from '../../../services/answers-service';
import './answer-form.css';

/**
 * AnswerForm component for submitting an answer.
 *
 * @returns {JSX.Element} The AnswerForm component.
 */
export default function AnswerForm() {
  /**
   * Handles the form submission event.
   *
   * @param {Event} event - The form submission event.
   */
  const handleSubmit = (event) => {
    event.preventDefault();
    // TODO: Implement the logic for submitting an answer
  };

  return (
    <form className='answer-form' onSubmit={handleSubmit}>
      <label>Answer Text*</label>
      <textarea
        id='answer'
        className='answer-input'
        placeholder='Enter your answer here'
        required
      ></textarea>
      <div className='answer-form-actions'>
        <Button classes='action-btn answer-form-btn' text='Post Your Answer' />
        <p className='warning'>* indicates mandatory fields</p>
      </div>
    </form>
  );
}
