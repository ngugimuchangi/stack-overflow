import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '../button/button';
import globalService from '../../services/global-service';
import authService from '../../services/auth-service';
import questionsService from '../../services/questions-service';
import './question.css';

function Question({ question }) {
  const [questionState, setQuestionState] = useState(question);
  const [isEditing, setIsEditing] = useState(false);
  const askedTime = globalService.getDisplayTime(questionState.createdAt);
  const isQuestionOwner = authService.getCurrentUser()?.id === questionState.user._id;
  const currentUser = authService.getCurrentUser();
  const navigate = useNavigate();

  function handleEditQuestion(newText) {
    questionsService
      .updateQuestion(question._id, { action: 'update', text: newText })
      .then((updatedQuestion) => setQuestionState(updatedQuestion))
      .catch(() => alert('Oops! Something went wrong. Please try again.'));
  }

  function handleVoteQuestion(action) {
    questionsService
      .updateQuestion(question._id, action)
      .then((updatedQuestion) => setQuestionState(updatedQuestion))
      .catch(() => alert('You need  at least 50 reputation to vote'));
  }

  function cancelEdit() {
    setIsEditing(false);
  }

  function handleDeleteQuestion() {
    questionsService
      .deleteQuestion(question._id)
      .then(() => navigate('/'))
      .catch(() => alert('Oops! Something went wrong. Please try again.'));
  }

  return (
    <div className='question-view'>
      <div className='answer-count-title-ask-question'>
        <div className='answer-count'> {`${questionState.answers} Answers`} </div>
        <div className='question-title'>{questionState.title} </div>
      </div>
      <div className='question-details'>
        <div className='views'> {`${questionState.views} views`} </div>
        <div className='question-text'>{questionState.text}</div>
        <div className='question-asked-by'>
          <div className='question-user-name'>{questionState.user.username}</div>
          <div className='question-time'>{`asked ${askedTime}`}</div>
        </div>
      </div>
      <div className='answer-vote'>
        <p>{`${questionState.votes} Votes`}</p>
        {authService.isLoggedIn() && (
          <>
            <div className='vote-btn'>
              <Button
                classes={`upvote-btn ${currentUser?.reputation < 50 ? 'btn-disabled' : ''}`}
                text='&uarr; Upvote'
                onClick={() => handleVoteQuestion({ action: 'upvote' })}
              />
              <Button
                classes={`downvote-btn ${currentUser?.reputation < 50 ? 'btn-disabled' : ''}`}
                text='&darr; Downvote'
                onClick={() => handleVoteQuestion({ action: 'downvote' })}
              />
            </div>
            <div className='edit-delete-btn'>
              <Button
                text='Edit'
                classes={'edit-btn' + (isQuestionOwner ? '' : ' btn-disabled')}
                onClick={() => setIsEditing(true)}
              />
              <Button
                text='Delete'
                classes={'delete-btn' + (isQuestionOwner ? '' : ' btn-disabled')}
                onClick={() => handleDeleteQuestion(questionState._id)}
              />
            </div>
          </>
        )}
      </div>
      {isEditing && (
        <ActionForm
          buttonText='Update'
          initialText={questionState.text}
          onSubmit={handleEditQuestion}
          onCancel={cancelEdit}
        />
      )}
    </div>
  );
}

export default Question;
