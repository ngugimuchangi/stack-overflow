import './feedback-card.css';
export default function FeedbackCard({ classes }) {
  return (
    <>
      <div className='feedback-container'>
        <div className='feedback-text'>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer nec odio. Praesent
          libero. Sed cursus ante dapibus diam. Sed nisi. Nulla quis sem at nibh elementum
          imperdiet. Duis sagittis ipsum. Aenean commodo ligula eget dolor.
        </div>
        <div className='user-details'>
          <div className='user-name'>Joji John</div>
          <div className='feedback-date'>asked 20 hours ago</div>
        </div>
      </div>
    </>
  );
}
