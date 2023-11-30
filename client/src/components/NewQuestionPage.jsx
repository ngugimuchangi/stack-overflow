// NewQuestionPage.js

import React, { useState } from 'react';

const NewQuestionPage = () => {
  const [questionTitle, setQuestionTitle] = useState('');
  const [questionText, setQuestionText] = useState('');
  const [hyperlink, setHyperlink] = useState('');
  const [tags, setTags] = useState('');
  const [username, setUsername] = useState('');

  const handlePostQuestion = () => {
    // Add your logic to handle posting the question
  };

  return (
    <div className="new-question-page">
      <h2>Ask a New Question</h2>
      <form>
        <div>
          <label htmlFor="questionTitle">Question Title:</label>
          <input
            type="text"
            id="questionTitle"
            value={questionTitle}
            onChange={(e) => setQuestionTitle(e.target.value)}
          />
          {/* Add error message for invalid input */}
        </div>

        <div>
          <label htmlFor="questionText">Question Text:</label>
          <textarea
            id="questionText"
            value={questionText}
            onChange={(e) => setQuestionText(e.target.value)}
          />
          {/* Add error message for invalid input */}
        </div>

        <div>
          <label htmlFor="hyperlink">Hyperlink (Optional):</label>
          <input
            type="text"
            id="hyperlink"
            value={hyperlink}
            onChange={(e) => setHyperlink(e.target.value)}
          />
          {/* Add error message for invalid input */}
        </div>

        <div>
          <label htmlFor="tags">Tags:</label>
          <input
            type="text"
            id="tags"
            value={tags}
            onChange={(e) => setTags(e.target.value)}
          />
          {/* Add error message for invalid input */}
        </div>

        <div>
          <label htmlFor="username">Your Username:</label>
          <input
            type="text"
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          {/* Add error message for invalid input */}
        </div>

        <button type="button" onClick={handlePostQuestion}>
          Post Question
        </button>
      </form>
    </div>
  );
};

export default NewQuestionPage;
