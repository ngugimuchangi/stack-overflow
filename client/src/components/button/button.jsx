import './button.css';

/**
 * Button component for rendering a button with custom text, classes, and click handler.
 *
 * @param {Object} props - The properties passed to the component.
 * @param {string} props.type - The type of button to render.
 * @param {string} props.text - The text to be displayed on the button.
 * @param {string} props.classes - The CSS classes to be applied to the button.
 * @param {Function} props.onClick - The function to be called when the button is clicked.
 *
 * @returns {JSX.Element} The Button component.
 */
export default function Button({ type, text, classes, onClick }) {
  const btClasses = classes ? `btn ${classes}` : 'btn';
  return (
    <button type={type || 'button'} className={btClasses} onClick={onClick}>
      {text}
    </button>
  );
}
