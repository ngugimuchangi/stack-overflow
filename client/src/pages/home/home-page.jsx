import { useState } from 'react';
import { useLoaderData } from 'react-router-dom';
import Button from '../../components/button/button';
import QuestionsLayout from '../../layouts/questions-layout/questions-layout';
import NoData from '../../components/no-data/no-data';
import QuestionsContextProvider from '../../contexts/questions-context';
import questionsService from '../../services/questions-service';
import './home-page.css';

export default function HomePage() {
  const data = useLoaderData();
  const [questions, setQuestions] = useState(data);
  const [activeSearch, setActiveSearch] = useState('all');
  const [activePage, setActivePage] = useState(0);

  return (
    <QuestionsContextProvider questions={questions} setQuestions={setQuestions}>
      <div className='home'>
        <div className='search-ask-question'>
          <div className='search-res-text'> {`Search Results: ${questions.length} question`}</div>
        </div>
        <div className='search-filters-questions'>
          <div className='search-filters'>
            <Button
              text='Newest'
              classes='underline-btn'
              onClick={async () => {
                setQuestions(await questionsService.getAllQuestions());
                setActiveSearch('all');
                setActivePage(0);
              }}
            />
            <Button
              text='Active'
              classes='underline-btn'
              onClick={async () => {
                setQuestions(await questionsService.getAllQuestions('s=active'));
                setActiveSearch('active');
                setActivePage(0);
              }}
            />
            <Button
              text='Answered'
              classes='underline-btn'
              onClick={async () => {
                setQuestions(await questionsService.getAllQuestions('s=answered'));
                setActiveSearch('answered');
                setActivePage(0);
              }}
            />
          </div>
        </div>
        {!questions.length ? <NoData message='No Questions Found' /> : <QuestionsLayout />}
        <div className='nav-btn-container'>
          <Button
            text='prev'
            classes={'nav-btn action-btn' + (activePage === 0 ? ' btn-disabled' : '')}
            onClick={async () => {
              const query =
                `p=${activePage - 1}` + (activeSearch === 'all' ? '' : `&s=${activeSearch}`);
              setQuestions(await questionsService.getAllQuestions(query));
              setActivePage(activePage - 1);
            }}
          />
          <Button
            text='next'
            classes={'nav-btn action-btn' + (questions.length === 0 ? ' btn-disabled' : '')}
            onClick={async () => {
              const query =
                `p=${activePage + 1}` + (activeSearch === 'all' ? '' : `&s=${activeSearch}`);
              setQuestions(await questionsService.getAllQuestions(query));
              setActivePage(activePage + 1);
            }}
          />
        </div>
      </div>
    </QuestionsContextProvider>
  );
}
