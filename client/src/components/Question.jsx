
import React from 'react';

const Question = ({ question }) => {
  // Implement the date formatting logic here

  return (
    <div className="question">
      <div className="question-info">
        <span>{/* No. of answers */}</span>
        <span>{/* No. of views */}</span>
      </div>
      <div className="question-details">
        <h2>{question.title}</h2>
        <p>{/* Question metadata */}</p>
      </div>
    </div>
  );
};

export default Question;
