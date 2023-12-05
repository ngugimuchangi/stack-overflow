import { useState } from 'react';
import FeedbackCard from '../feedback-card/feedback-card';
import Button from '../button/button';
import ActionForm from '../forms/action/action-form';
import answersService from '../../services/answers-service';
import authService from '../../services/auth-service';
import './answer.css';

export default function Answer({ answer, updateAnswers }) {
  const [isEditing, setIsEditing] = useState(false);
  const isAnswerOwner = authService.getCurrentUser()?.id === answer.ansBy._id;
  const currentUser = authService.getCurrentUser();

  async function voteAnswer(vote) {
    const { questionId, _id: answerId } = answer;
    try {
      if (authService.getCurrentUser().reputation < 50)
        return alert('You need 50 reputation to vote');
      const updatedAnswer = await answersService.updateAnswer(questionId, answerId, vote);
      updateAnswers((prev) =>
        prev.map((answer) => (answer._id === updatedAnswer._id ? updatedAnswer : answer))
      );
    } catch (err) {
      alert('You need at least 50 reputation to vote');
    }
  }

  async function editAnswer(text) {
    const { questionId, _id: answerId } = answer;
    try {
      const updatedAnswer = await answersService.updateAnswer(questionId, answerId, {
        text,
        action: 'update',
      });
      updateAnswers((prev) =>
        prev.map((answer) => (answer._id === updatedAnswer._id ? updatedAnswer : answer))
      );
    } catch (err) {
      console.log(err);
    }
    setIsEditing(false);
  }

  async function deleteAnswer() {
    const { questionId, _id: answerId } = answer;
    try {
      await answersService.deleteAnswer(questionId, answerId);
      updateAnswers((prev) => prev.filter((answer) => answer._id !== answerId));
    } catch (err) {
      console.log(err);
    }
  }

  function cancelEdit() {
    setIsEditing(false);
  }

  return (
    <div className='answer'>
      <FeedbackCard text={'Answered'} info={answer} user={answer.ansBy}>
        <div className='answer-vote'>
          <p>{`${answer.votes} Votes`}</p>
          {authService.isLoggedIn() && (
            <>
              <div className='vote-btn'>
                <Button
                  classes={`upvote-btn ${currentUser?.reputation < 50 ? 'btn-disabled' : ''}`}
                  text='&uarr; Upvote'
                  onClick={() => voteAnswer({ action: 'upvote' })}
                />
                <Button
                  classes={`downvote-btn ${currentUser?.reputation < 50 ? 'btn-disabled' : ''}`}
                  text='&darr; Downvote'
                  onClick={() => voteAnswer({ action: 'downvote' })}
                />
              </div>
              <div className='edit-delete-btn'>
                <Button
                  text='Edit'
                  classes={'edit-btn' + (isAnswerOwner ? '' : ' btn-disabled')}
                  onClick={() => setIsEditing(true)}
                />
                <Button
                  text='Delete'
                  classes={'delete-btn' + (isAnswerOwner ? '' : ' btn-disabled')}
                  onClick={() => deleteAnswer(answer._id)}
                />
              </div>
            </>
          )}
        </div>
        {isEditing && (
          <ActionForm
            buttonText='Update'
            initialText={answer.text}
            onSubmit={editAnswer}
            onCancel={cancelEdit}
          />
        )}
      </FeedbackCard>
    </div>
  );
}
