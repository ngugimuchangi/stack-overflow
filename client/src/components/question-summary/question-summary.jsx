import { Link } from 'react-router-dom';
import './question-summary.css';
import moment from 'moment';

export default function QuestionSummary({ question }) {
  const time = moment(question.createdAt);
  const minutes = moment().diff(time, 'minutes');
  const hours = moment().diff(time, 'hours');
  const days = moment().diff(time, 'days');
  const months = moment().diff(time, 'months');
  const years = moment().diff(time, 'years');

  const displayTime = () => {
    if (minutes < 60) {
      return `${minutes} minutes ago`;
    } else if (hours < 24) {
      return `${hours} hours ago`;
    } else if (days < 30) {
      return `${days} days ago`;
    } else if (months < 12) {
      return `${months} months ago`;
    } else {
      return `${years} years ago`;
    }
  };
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
            <span style={{ color: 'GrayText' }}>{`asked ${displayTime()}`}</span>
          </p>
        </div>
        <div className='tags'>
          {question.tags.map((tag) => (
            <div>{tag}</div>
          ))}
        </div>
      </div>
    </div>
  );
}
