import { useContext } from 'react';
import { QuestionsContext } from '../../contexts/questions-context';
import QuestionSummary from '../../components/question-summary/question-summary';
import './questions-layout.css';

export default function QuestionsLayout() {
  const { questions } = useContext(QuestionsContext);

  const questionEls = questions.map((question) => (
    <QuestionSummary key={question._id} question={question} />
  ));

  return (
    <div className='questions-layout'>
      <div className='questions-layout-content'>{questionEls}</div>
    </div>
  );
}
