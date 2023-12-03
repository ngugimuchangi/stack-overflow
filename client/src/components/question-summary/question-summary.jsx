import { Link } from 'react-router-dom';
import './question-summary.css';

export default function QuestionSummary() {
  return (
    <div className='question-summary'>
      <aside className='stats' style={{ color: 'GrayText' }}>
        <p>2 answers</p>
        <p>121 views</p>
      </aside>
      <div className='content'>
        <div className='text'>
          <Link to='/questions/1'>
            <h3 className='title'>Programmatically navigated using React Router</h3>
          </Link>
          <p className='asker-details'>
            <span style={{ color: 'red', marginRight: '0.5rem' }}>Joji John</span>
            <span style={{ color: 'GrayText' }}>asked 15 minutes ago</span>
          </p>
        </div>
        <div className='tags'>
          <div>react-router</div>
          <div>react-router-dom</div>
        </div>
      </div>
    </div>
  );
}
