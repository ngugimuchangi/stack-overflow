import './question.css';
import globalService from '../../services/global-service';

function Question({ question }) {
  const askedTime = globalService.getDisplayTime(question.createdAt);
  return (
    <div className='question-view'>
      <div className='answer-count-title-ask-question'>
        <div className='answer-count'> {`${question.answers} Answers`} </div>
        <div className='question-title'>{question.title} </div>
      </div>
      <div className='question-details'>
        <div className='views'> {`${question.views} views`} </div>
        <div className='question-text'>{question.text}</div>
        <div className='question-asked-by'>
          <div className='question-user-name'>{question.user.username}</div>
          <div className='question-time'>{`asked ${askedTime}`}</div>
        </div>
      </div>
    </div>
  );
}

export default Question;
