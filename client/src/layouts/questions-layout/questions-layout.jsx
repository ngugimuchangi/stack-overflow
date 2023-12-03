import QuestionSummary from '../../components/question-summary/question-summary';
import './questions-layout.css';

export default function QuestionsLayout() {
  const questions = [];
  for (let i = 0; i < 10; i++) {
    questions.push(<QuestionSummary key={i} />);
  }
  return (
    <div className='questions-layout'>
      <div className='questions-layout-content'>{questions}</div>
    </div>
  );
}
