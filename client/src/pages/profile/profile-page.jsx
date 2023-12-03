import React from 'react';

/**
 * UserProfile component for displaying user details, tags, and questions.
 *
 * @param {Object} props - The properties passed to the component.
 * @param {Object} props.user - The user object.
 * @param {Array} props.tags - The tags created by the user.
 * @param {Array} props.questions - The questions asked by the user.
 *
 * @returns {JSX.Element} The UserProfile component.
 */
export default function UserProfile({ user, tags, questions }) {
  return (
    <div>
      <h2>User Profile</h2>
      <h3>{user.name}</h3>
      <p>Email: {user.email}</p>

      <h4>Tags</h4>
      <ul>
        {tags.map((tag, index) => (
          <li key={index}>{tag}</li>
        ))}
      </ul>

      <h4>Questions</h4>
      <ul>
        {questions.map((question, index) => (
          <li key={index}>{question.title}</li>
        ))}
      </ul>
    </div>
  );
}
