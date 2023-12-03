import './question.css';

function Question() {
  return (
    <div className='question-view'>
      <div className='answer-count-title-ask-question'>
        <div className='answer-count'> 2 Answers </div>
        <div className='question-title'> Programmatically navigate using React router </div>
      </div>
      <div className='question-details'>
        <div className='views'> 11 views </div>
        <div className='question-text'>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer nec odio. Praesent
          libero. Sed cursus ante dapibus diam. Sed nisi. Nulla quis sem at nibh elementum
          imperdiet. Duis sagittis ipsum. Aenean commodo ligula eget dolor.
        </div>
        <div className='question-asked-by'>
          <div className='question-user-name'>Joji John</div>
          <div className='question-time'>asked 20 hours ago</div>
        </div>
      </div>
    </div>
  );
}

export default Question;
