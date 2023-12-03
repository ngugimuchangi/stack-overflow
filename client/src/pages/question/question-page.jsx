import { useState, useEffect } from 'react';
import { useLoaderData } from 'react-router-dom';
import Button from '../../components/button/button';
import Question from '../../components/question/question';
import FeedbackCard from '../../components/feedback-card/feedback-card';
import AnswerForm from '../../components/forms/answer/answer-form';
import './question-page.css';
import authService from '../../services/auth-service';
import answersService from '../../services/answers-service';

export default function QuestionsPage() {
  const question = useLoaderData();
  const [isAnswering, setIsAnswering] = useState(false);
  const [answers, setAnswers] = useState([]);

  const answerEls = answers.map((answer) => (
    <FeedbackCard key={answer._id} text={'Answered'} info={answer} />
  ));

  useEffect(() => {
    answersService
      .getAnswers(question._id)
      .then((answers) => {
        setAnswers(answers);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [question._id]);

  return (
    <>
      <Question question={question} />
      {answerEls}
      {authService.isLoggedIn() && (
        <Button
          text={isAnswering ? 'Cancel' : 'Answer Question'}
          classes='action-btn answer-question-btn'
          onClick={() => setIsAnswering((prev) => !prev)}
        />
      )}
      {isAnswering && (
        <AnswerForm
          questionId={question._id}
          setAnswers={setAnswers}
          setIsAnswering={setIsAnswering}
        />
      )}
    </>
  );
}
