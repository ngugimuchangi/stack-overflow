import Button from '../../button/button';
import './question-form.css';

import React, { useState } from 'react';

/**
 * NewQuestionForm component for submitting a new question.
 *
 * @returns {JSX.Element} The NewQuestionForm component.
 */
export default function NewQuestionForm() {
  const [title, setTitle] = useState('');
  const [text, setText] = useState('');
  const [tags, setTags] = useState('');

  /**
   * Handles the form submission event.
   *
   * @param {Event} event - The form submission event.
   */
  const handleSubmit = (event) => {
    event.preventDefault();
    // TODO: Implement the logic for submitting a new question
    console.log(`Title: ${title}, Text: ${text}, Tags: ${tags}`);
  };

  return (
    <form className='question-form' onSubmit={handleSubmit}>
      <label>Question Title:</label>
      <input type='text' value={title} onChange={(e) => setTitle(e.target.value)} required />
      <label></label>
      Question Text:
      <textarea
        className='text-area'
        value={text}
        onChange={(e) => setText(e.target.value)}
        required
      />
      <label>Tags:</label>
      <input type='text' value={tags} onChange={(e) => setTags(e.target.value)} required />
      <Button text='Submit' classes='action-btn' />
    </form>
  );
}
