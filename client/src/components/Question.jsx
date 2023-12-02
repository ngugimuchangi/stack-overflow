import React from 'react';

function Question({ question }) {
  // TODO: Implement the logic for displaying the question metadata
  return (
    <div className='question'>
      <div className='question-info'>
        <span>{question.answers.length} answers</span>
        <span>{question.views} views</span>
      </div>
      <div className='question-details'>
        <h2>{question.title}</h2>
        <p>
          {question.user} asked {question.date}
        </p>
      </div>
    </div>
  );
}

export default Question;
