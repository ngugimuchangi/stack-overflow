import QuestionForm from '../../components/forms/question/question-form';
import './new-question-page.css';

export default function NewQuestionPage() {
  return (
    <div className='new-question-page'>
      <h1>Ask a Question</h1>
      <QuestionForm />
    </div>
  );
}
