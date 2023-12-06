import { useContext, useEffect, useState } from 'react';
import { useLoaderData } from 'react-router-dom';
import Button from '../../components/button/button';
import QuestionsLayout from '../../layouts/questions-layout/questions-layout';
import NoData from '../../components/no-data/no-data';
import { QuestionsContext } from '../../contexts/questions-context';
import questionsService from '../../services/questions-service';
import './home-page.css';

/**
 * HomePage component that serves as the home page for the application.
 *
 * @returns {JSX.Element} The HomePage component.
 */
export default function HomePage() {
  const MAX_QUESTIONS_PER_PAGE = 5;
  const data = useLoaderData();
  const { questions, setQuestions } = useContext(QuestionsContext);
  const [activeSearch, setActiveSearch] = useState('');
  const [activePage, setActivePage] = useState(0);

  useEffect(() => {
    setQuestions(data);
  }, [data]);

  return (
    <div className='home'>
      <div className='search-ask-question'>
        {activeSearch && (
          <div className='search-res-text'> {`Search Results: ${questions.count} question`}</div>
        )}
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
      {!questions.count ? <NoData message='No Questions Found' /> : <QuestionsLayout />}
      <div className='nav-btn-container'>
        <Button
          text='prev'
          classes={'nav-btn action-btn' + (activePage === 0 ? ' btn-disabled' : '')}
          onClick={async () => {
            const query =
              `p=${activePage - 1}` +
              (activeSearch === 'all' || activeSearch === '' ? '' : `&s=${activeSearch}`);
            setQuestions(await questionsService.getAllQuestions(query));
            setActivePage(activePage - 1);
          }}
        />
        <Button
          text='next'
          classes={
            'nav-btn action-btn' +
            (questions.count <= (activePage + 1) * MAX_QUESTIONS_PER_PAGE ? ' btn-disabled' : '')
          }
          onClick={async () => {
            const query =
              `p=${activePage + 1}` +
              (activeSearch === 'all' || activeSearch === '' ? '' : `&s=${activeSearch}`);
            setQuestions(await questionsService.getAllQuestions(query));
            setActivePage(activePage + 1);
          }}
        />
      </div>
    </div>
  );
}
