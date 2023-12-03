import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import './question-summary.css';
import globalService from '../../services/global-service';

export default function QuestionSummary({ question }) {
  const [time, setTime] = useState(() => globalService.getDisplayTime(question.createdAt));

  useEffect(() => {
    const interval = setInterval(() => {
      setTime(globalService.getDisplayTime(question.createdAt));
    }, 60000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className='question-summary'>
      <aside className='stats' style={{ color: 'GrayText' }}>
        <p>{`${question.answers} answers`}</p>
        <p>{`${question.views} views`}</p>
      </aside>
      <div className='content'>
        <div className='text'>
          <div>
            <Link to={`/questions/${question._id}`}>
              <h3 className='title'>{question.title}</h3>
            </Link>
            <p>
              {question.summary.length > 150
                ? `${question.summary.slice(0, 150)}...`
                : question.summary}
            </p>
          </div>
          <p className='asker-details'>
            <span style={{ color: 'red', marginRight: '0.5rem' }}>{question.user.username}</span>
            <span style={{ color: 'GrayText' }}>{`asked ${time}`}</span>
          </p>
        </div>
        <div className='tags'>
          {question.tags.map((tag, index) => (
            <div key={index}>{tag}</div>
          ))}
        </div>
      </div>
    </div>
  );
}
