import React, { useState, useEffect } from 'react';
import Banner from './Banner';
import Menu from './Menu';
import Question from './Question';

const Homepage = () => {
  const [newestQuestions, setNewestQuestions] = useState([]);

  useEffect(() => {
    fetch('/newest-questions')
      .then((response) => response.json())
      .then((data) => setNewestQuestions(data));
  }, []);

  const handleNewestButtonClick = () => {
    // Open the newest questions page using AJAX
    fetch('/newest-questions')
      .then((response) => response.json())
      .then((data) => {
        setNewestQuestions(data);
      });
  };

  const handleActiveButtonClick = () => {
    // Open the active questions page
    window.location.href = '/active';
  };

  const handleUnansweredButtonClick = () => {
    // Open the unanswered questions page
    window.location.href = '/unanswered';
  };

  return (
    <div className="homepage">
      <Banner />
      <div className="main-body">
        <Menu activeLink="questions" />
        <div className="questions-section">
          <div className="main-section">
            <h2>All Questions</h2>
            <button>Ask Question</button>
          </div>
          <div className="buttons">
            <button onClick={handleNewestButtonClick}>Newest</button>
            <button onClick={handleActiveButtonClick}>Active</button>
            <button onClick={handleUnansweredButtonClick}>Unanswered</button>
          </div>
          {newestQuestions.map((question) => (
            <Question key={question.id} question={question} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Homepage;
