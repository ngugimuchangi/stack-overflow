import { useState } from 'react';
import Tag from '../../components/tag/tag';
import tagsServices from '../../services/tags-services';

import './tags-page.css';
export default function TagsPage() {
  const [tags, setTags] = useState(tagsServices.getTags.bind(tagsServices));
  const tagList = tags.map((tag, index) => <Tag key={index} {...tag} />);

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
