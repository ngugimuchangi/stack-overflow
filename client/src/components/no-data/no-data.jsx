import './no-data.css';

/**
 * NoData component for displaying a message when no data is found.
 *
 * @param {Object} props - The properties passed to the component.
 * @param {string} props.message - The message to be displayed. Defaults to 'No Data Found'.
 *
 * @returns {JSX.Element} The NoData component.
 */
export default function NoData({ message }) {
  return (
    <div className='no-data'>
      <div className='no-data-message'> &#9432;&nbsp; {message || 'No Data Found'}</div>
    </div>
  );
}
