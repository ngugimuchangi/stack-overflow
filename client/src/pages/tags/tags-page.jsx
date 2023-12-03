import { useLoaderData } from 'react-router-dom';
import Tag from '../../components/tag/tag';

import './tags-page.css';
export default function TagsPage() {
  const tags = useLoaderData();
  const tagList = tags.map((tag) => <Tag key={tag._id} tag={tag} />);

  return (
    <div>
      <div className='tag-details'>
        <h2>{`${tags.length} Tags`}</h2>
        <h2>All Tags</h2>
      </div>
      <div className='tag-list'>{tagList}</div>
    </div>
  );
}
