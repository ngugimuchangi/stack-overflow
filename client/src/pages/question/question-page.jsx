import { useState, useEffect } from 'react';
import { useLoaderData, useNavigate } from 'react-router-dom';
import Button from '../../components/button/button';
import Question from '../../components/question/question';
import AnswerForm from '../../components/forms/answer/answer-form';
import authService from '../../services/auth-service';
import answersService from '../../services/answers-service';
import Answer from '../../components/answer/answer';
import './question-page.css';

export default function QuestionsPage() {
  const question = useLoaderData();
  const [questionState, setQuestionState] = useState(question);

  const [isAnswering, setIsAnswering] = useState(false);
  const [answers, setAnswers] = useState([]);

  const answerEls = answers.map((answer, i) => (
    <Answer key={answer._id} index={i} answer={answer} updateAnswers={setAnswers} />
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
      <Question question={questionState} />
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
          updateQuestion={setQuestionState}
        />
      )}
    </>
  );
}
