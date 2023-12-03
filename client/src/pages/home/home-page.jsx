import { useState, useEffect } from 'react';
import Button from '../../components/button/button';
import QuestionsLayout from '../../layouts/questions-layout/questions-layout';
import './home-page.css';

export default function HomePage() {
  const [questions, setQuestions] = useState([]);

  return (
    <div className='home'>
      <div className='search-ask-question'>
        <div className='search-res-text'>
          {' '}
          {!questions.length ? 'Search Results: 2  questions' : ''}{' '}
        </div>
      </div>
      <div className='search-filters-questions'>
        <div className='search-filters'>
          <Button text='Newest' classes='underline-btn' />
          <Button text='Active' classes='underline-btn' />
          <Button text='Unanswered' classes='underline-btn' />
        </div>
      </div>
      <QuestionsLayout />
    </div>
  );
}
