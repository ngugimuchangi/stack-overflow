import React, { useState, useEffect } from 'react';
import Banner from './Banner';
import Menu from './Menu';
import Question from './Question';
import questionService from '../services/questions';
function Homepage() {
  const [questions, setQuestions] = useState([]);

  useEffect(() => {}, []);

  const handleNewestButtonClick = () => [];
  const handleActiveButtonClick = () => [];
  const handleUnansweredButtonClick = () => [];

  return (
    <div className='homepage'>
      <Banner />
      <div className='main-body'>
        <Menu activeLink='questions' />
        <div className='questions-section'>
          <div className='main-section'>
            <h2>All Questions</h2>
            <button>Ask Question</button>
          </div>
          <div className='buttons'>
            <button onClick={handleNewestButtonClick}>Newest</button>
            <button onClick={handleActiveButtonClick}>Active</button>
            <button onClick={handleUnansweredButtonClick}>Unanswered</button>
          </div>
          {questions.map((question) => (
            <Question key={question.id} question={question} />
          ))}
        </div>
      </div>
    </div>
  );
}

export default Homepage;
