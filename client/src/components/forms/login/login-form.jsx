import React, { useState } from 'react';
import Button from '../../button/button';
import authService from '../../../services/auth-service';
import { Link } from 'react-router-dom';
import './login-form.css';

/**
 * Login component for user authentication.
 *
 * @returns {JSX.Element} The Login component.
 */
export default function LoginForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  /**
   * Handles the form submission event.
   *
   * @param {Event} event - The form submission event.
   */
  const handleSubmit = (event) => {
    event.preventDefault();
    // TODO: Implement the logic for user authentication
    console.log(`Email: ${email}, Password: ${password}`);
  };

  return (
    <form className='login-form' onSubmit={handleSubmit}>
      <label>
        Email:
        <input type='email' value={email} onChange={(e) => setEmail(e.target.value)} required />
      </label>
      <label>
        Password:
        <input
          type='password'
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
      </label>
      <div className='login-signup-container'>
        <Button type='submit' text='Login' classes='underline-btn' />
        <span>or</span>
        <Link to='/signup'>
          <Button text='Signup' classes='underline-btn' />
        </Link>
      </div>
    </form>
  );
}
