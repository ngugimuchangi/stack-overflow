import { useState } from 'react';
import FeedbackCard from '../feedback-card/feedback-card';
import Button from '../button/button';
import TextEditForm from '../forms/text-edit/text-edit-form';
import answersService from '../../services/answers-service';
import authService from '../../services/auth-service';
import './answer.css';

/**
 * Answer component for displaying an answer.
 *
 * @param {Object} props - The properties passed to the component.
 * @param {Object} props.answer - The answer object.
 * @param {Function} props.updateAnswers - The function to update the answers.
 *
 * @returns {JSX.Element} The Answer component.
 */
export default function Answer({ answer, updateAnswers }) {
  const [isEditing, setIsEditing] = useState(false);
  const isAnswerOwner = authService.getCurrentUser()?.id === answer.ansBy._id;
  const currentUser = authService.getCurrentUser();

  /**
   * Handles the vote event.
   *
   * @param {Object} vote - The vote object.
   * @param {string} vote.action - The vote action.
   *
   * @returns {Promise<void>}
   */
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

  /**
   * Handles the edit event.
   *
   * @param {string} text - The text to edit.
   *
   * @returns {Promise<void>}
   */
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

  /**
   * Handles the delete event.
   *
   * @returns {Promise<void>}
   */
  async function deleteAnswer() {
    const { questionId, _id: answerId } = answer;
    try {
      await answersService.deleteAnswer(questionId, answerId);
      updateAnswers((prev) => prev.filter((answer) => answer._id !== answerId));
    } catch (err) {
      console.log(err);
    }
  }

  /**
   * Handles the cancel edit event.
   * @returns {void}
   */
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
                  classes={`upvote-btn ${
                    currentUser?.reputation < 50 || isAnswerOwner ? 'btn-disabled' : ''
                  }`}
                  text='&uarr; Upvote'
                  onClick={() => voteAnswer({ action: 'upvote' })}
                />
                <Button
                  classes={`downvote-btn ${
                    currentUser?.reputation < 50 || isAnswerOwner ? 'btn-disabled' : ''
                  }`}
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
          <TextEditForm
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
