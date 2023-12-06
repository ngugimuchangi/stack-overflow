import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

/**
 * Search component for searching all questions.
 *
 * @returns {JSX.Element} The Search component.
 */
export default function Search() {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');

  /**
   * Fetches all questions from the question service and logs them.
   */
  async function search(event) {
    event.preventDefault();
    if (!searchTerm) return;
    navigate(`/?q=${searchTerm}`);
  }
  return (
    <form className='search-form' onSubmit={search}>
      <input
        type='search'
        placeholder='Search...'
        onChange={(e) => setSearchTerm(e.target.value)}
      ></input>
    </form>
  );
}
