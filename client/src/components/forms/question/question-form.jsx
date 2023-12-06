import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '../../button/button';
import questionsService from '../../../services/questions-service';
import './question-form.css';

/**
 * NewQuestionForm component for submitting a new question.
 *
 * @param {Object} props - The properties passed to the component.
 * @param {Object} props.question - The question object.
 * @param {string} props.status - The status of the question.
 * @param {Function} props.cancelEdit - The function to cancel editing.
 * @param {Function} props.afterUpdateQuestion - The function to update the question.
 *
 * @returns {JSX.Element} The NewQuestionForm component.
 */
export default function QuestionForm({
  question,
  status = 'new',
  cancelEdit,
  afterUpdateQuestion,
}) {
  const [title, setTitle] = useState(question?.title || '');
  const [text, setText] = useState(question?.text || '');
  const [summary, setSummary] = useState(question?.summary || '');
  const [tags, setTags] = useState('');
  const navigate = useNavigate();

  /**
   * Handles the form submission event.
   *
   * @param {Event} event - The form submission event.
   */
  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      if (status === 'new') {
        const question = await questionsService.createQuestion({
          title,
          text,
          summary,
          tags: tags.split(',').map((tag) => tag.trim()),
        });
        alert('Question posted successfully!');
        navigate(`/questions/${question._id}`);
      } else {
        const updatedQuestion = await questionsService.updateQuestion(question._id, {
          action: 'update',
          text,
          summary,
          title,
        });
        afterUpdateQuestion(updatedQuestion);
      }
    } catch (err) {
      console.error(err);
      alert('Oops! Something went wrong. Please try again.');
    }
  };

  return (
    <form className='question-form' onSubmit={handleSubmit}>
      <label>Question Title:</label>
      <input
        type='text'
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        required
        maxLength={50}
      />
      <label>Question Summary:</label>
      <textarea
        className='text-area text-area-summary'
        value={summary}
        onChange={(e) => setSummary(e.target.value)}
        required
        maxLength={140}
        col={10}
        rows={10}
      />
      <label>Question Text:</label>
      <textarea
        className='text-area'
        value={text}
        onChange={(e) => setText(e.target.value)}
        maxLength={200}
        col={10}
        rows={15}
        required
      />
      {status === 'new' && (
        <>
          <label>Tags:</label>
          <input type='text' value={tags} onChange={(e) => setTags(e.target.value)} required />
        </>
      )}
      {status !== 'new' && <Button text='Cancel' classes='action-btn' onClick={cancelEdit} />}
      <Button
        text={status === 'new' ? 'Post Question' : 'Update Question'}
        classes='action-btn'
        type='submit'
      />
    </form>
  );
}
