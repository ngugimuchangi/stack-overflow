import { Link } from 'react-router-dom';
import './tag.css';

export default function Tag({ id, name, questions }) {
  return (
    <div className='tag-card'>
      <Link to={`/?t=${id}`}>
        <h4>{name}</h4>
      </Link>
      <p>{questions} questions</p>
    </div>
  );
}
