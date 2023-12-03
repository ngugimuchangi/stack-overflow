import { useState } from 'react';
import Button from '../../components/button/button';
import Question from '../../components/question/question';
import FeedbackCard from '../../components/feedback-card/feedback-card';
import AnswerForm from '../../components/forms/answer/answer-form';
import './question-page.css';

export default function QuestionsPage() {
  const [isAnswering, setIsAnswering] = useState(false);
  const answers = [];
  for (let i = 0; i < 10; i++) {
    answers.push(<FeedbackCard key={i} />);
  }

  return (
    <>
      <Question />
      {answers}
      <Button
        text={isAnswering ? 'Cancel' : 'Answer Question'}
        classes='action-btn answer-question-btn'
        onClick={() => setIsAnswering((prev) => !prev)}
      />
      {isAnswering && <AnswerForm />}
    </>
  );
}
