import React from 'react';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom"
import Homepage from './components/Homepage';
import NewQuestionPage from './components/NewQuestionPage';
import ActiveQuestionPage from './components/ActiveQuestionPage';
import UnansweredQuestionPage from './components/UnansweredQuestionPage';
import "./App.css"


const App = () => {
  return (
    <>
    <Router>        
      <Routes>
      <Route path="/" exact element={<Homepage />} />
        <Route path="/newest" element={<NewQuestionPage />} />
        <Route path="/active" element={<ActiveQuestionPage />} />
        <Route path="/unanswered" element={<UnansweredQuestionPage/>} />
      </Routes>        
    </Router>
  </>
  );
};

export default App;
