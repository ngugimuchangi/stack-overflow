import React, { useState } from 'react';
import Button from '../../button/button';
import userServices from '../../../services/user-service';
import { Link, useNavigate } from 'react-router-dom';
import './signup-form.css';

/**
 * Signup component for creating a new user.
 *
 * @returns {JSX.Element} The Signup component.
 */
export default function SignupForm() {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  /**
   * Handles the form submission event.
   *
   * @param {Event} event - The form submission event.
   */
  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!username || !email || !password) return;
    try {
      await userServices.signup(username, email, password);
      navigate('/login');
    } catch (err) {
      setError('Username or email already exists');
      const timeoutId = setTimeout(() => {
        setError(''), 5000;
        clearTimeout(timeoutId);
      });
    }
  };

  return (
    <form className='signup-form' onSubmit={handleSubmit}>
      <div className={error ? 'error' : ''}>{error}</div>
      <label>
        Username:
        <input
          type='text'
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />
      </label>
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
        <Button type='submit' text='SignUp' classes='underline-btn login-signup-btn' />
        <span>or</span>
        <Link to='/login'>
          <Button text='Login' classes='underline-btn login-signup-btn' />
        </Link>
      </div>
    </form>
  );
}
