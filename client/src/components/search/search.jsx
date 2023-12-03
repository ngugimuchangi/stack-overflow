import { useState } from 'react';
import questionService from '../../services/questions-service';

/**
 * Search component for searching all questions.
 *
 * @returns {JSX.Element} The Search component.
 */
export default function Search() {
  const [searchTerm, setSearchTerm] = useState('');

  /**
   * Fetches all questions from the question service and logs them.
   */
  function getQuestions() {
    const questions = questionService.getQuestions();
    console.log(questions);
  }
  return (
    <form className='search-form' onSubmit={getQuestions}>
      <input
        type='search'
        placeholder='Search...'
        onChange={(e) => setSearchTerm(e.target.value)}
      ></input>
    </form>
  );
}
