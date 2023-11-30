// Homepage.js

import React from 'react';
import Banner from './Banner';
import Menu from './Menu';
import Question from './Question';

const Homepage = () => {
  // Sample data, replace with actual data fetched from the server
//   const questions = [...];

  return (
    <div className="homepage">
      <Banner />
       <div className="main-body">
        <Menu activeLink="questions" />
        <div className="questions-section">
          <h2>All Questions</h2>
          <button>Ask Question</button>
          {}
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
