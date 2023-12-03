import { Link } from 'react-router-dom';
import './tag.css';

export default function Tag({ tag }) {
  return (
    <div className='tag-card'>
      <Link to={`/?t=${tag.name}`}>
        <h4>{tag.name}</h4>
      </Link>
      <p>{tag.questionCount} questions</p>
    </div>
  );
}
