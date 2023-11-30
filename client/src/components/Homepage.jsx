import React from 'react';
import Banner from './Banner';
import Menu from './Menu';
import Question from './Question';

const Homepage = () => {
  const handleNewestButtonClick = () => {
    // Open the newest questions page
    window.location.href = './NewQuestionPage.jsx';
  };

  const handleActiveButtonClick = () => {
    // Open the active questions page
    window.location.href = '/ActiveQuestionPage.jsx';
  };

  const handleUnansweredButtonClick = () => {
    // Open the unanswered questions page
    window.location.href = '/unansweredQuestionPage.jsx';
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
          {/* <div className="questions-list">
            {questions.map((question) => (
              <Question key={question.id} question={question} />
            ))}
          </div> */}
        </div>
      </div>
    </div>
  );
};

export default Homepage;
