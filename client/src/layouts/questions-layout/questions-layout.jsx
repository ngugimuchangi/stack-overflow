import { useContext } from 'react';
import { QuestionsContext } from '../../contexts/questions-context';
import QuestionSummary from '../../components/question-summary/question-summary';
import './questions-layout.css';

/**
 * QuestionsLayout component that serves as the layout for the questions page.
 *
 * @returns {JSX.Element} The QuestionsLayout component.
 */
export default function QuestionsLayout() {
  const { questions } = useContext(QuestionsContext);

  const questionEls = questions.questions.map((question) => (
    <QuestionSummary key={question._id} question={question} />
  ));

  return (
    <div className='questions-layout'>
      <div className='questions-layout-content'>{questionEls}</div>
    </div>
  );
}
