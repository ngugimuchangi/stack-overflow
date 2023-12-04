import Button from '../../button/button';
import './question-form.css';
import { useNavigate } from 'react-router-dom';
import questionsService from '../../../services/questions-service';

import React, { useState } from 'react';

/**
 * NewQuestionForm component for submitting a new question.
 *
 * @returns {JSX.Element} The NewQuestionForm component.
 */
export default function NewQuestionForm() {
  const [title, setTitle] = useState('');
  const [text, setText] = useState('');
  const [summary, setSummary] = useState('');
  const [tags, setTags] = useState('');
  const navigate = useNavigate();

  /**
   * Handles the form submission event.
   *
   * @param {Event} event - The form submission event.
   */
  const handleSubmit = async (event) => {
    event.preventDefault();
    const question = await questionsService.createQuestion({
      title,
      text,
      summary,
      tags: tags.split(',').map((tag) => tag.trim()),
    });
    alert('Question posted successfully!');
    navigate(`/questions/${question._id}`);
  };

  return (
    <form className='question-form' onSubmit={handleSubmit}>
      <label>Question Title:</label>
      <input type='text' value={title} onChange={(e) => setTitle(e.target.value)} required />
      <label>Question Summary:</label>
      <textarea
        className='text-area-summary'
        value={summary}
        onChange={(e) => setSummary(e.target.value)}
        required
      />
      <label>Question Text:</label>
      <textarea
        className='text-area'
        value={text}
        onChange={(e) => setText(e.target.value)}
        required
      />
      <label>Tags:</label>
      <input type='text' value={tags} onChange={(e) => setTags(e.target.value)} required />
      <Button text='Post Question' classes='action-btn' type='submit' />
    </form>
  );
}
