import Button from '../../button/button';
import answerService from '../../../services/answers-service';
import questionsService from '../../../services/questions-service';
import './answer-form.css';
import { useState } from 'react';

/**
 * AnswerForm component for submitting an answer.
 *
 * @returns {JSX.Element} The AnswerForm component.
 */
export default function AnswerForm({ questionId, setIsAnswering, setAnswers, updateQuestion }) {
  const [answer, setAnswer] = useState('');
  /**
   * Handles the form submission event.
   *
   * @param {Event} event - The form submission event.
   */
  const handleSubmit = async (event) => {
    event.preventDefault();
    await answerService.createAnswer(questionId, { text: answer });
    setAnswers(await answerService.getAnswers(questionId));
    setIsAnswering(false);
    updateQuestion(await questionsService.getQuestion(questionId));
  };

  return (
    <form className='answer-form' onSubmit={handleSubmit}>
      <label>Answer Text*</label>
      <textarea
        id='answer'
        className='answer-input'
        placeholder='Enter your answer here'
        required
        onChange={(e) => setAnswer(e.target.value)}
        maxLength={140}
      ></textarea>
      <div className='answer-form-actions'>
        <Button classes='action-btn answer-form-btn' text='Post Your Answer' type='submit' />
        <p className='warning'>* indicates mandatory fields</p>
      </div>
    </form>
  );
}
