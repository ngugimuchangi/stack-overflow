import { Outlet, useNavigate, Link } from 'react-router-dom';
import { useState } from 'react';
import Banner from '../../components/banner/banner';
import SideMenu from '../../components/side-menu/side-menu';
import Button from '../../components/button/button';
import QuestionsContextProvider from '../../contexts/questions-context';
import authService from '../../services/auth-service';
import './base-layout.css';

/**
 * BaseLayout component that serves as the main layout for the application.
 *
 * It includes a banner, side menu, and main content area. The main content area includes
 * action buttons for login/logout and asking a new question, and an outlet for rendering
 * the main content.
 *
 * @returns {JSX.Element} The BaseLayout component.
 */
export default function BaseLayout() {
  const [questions, setQuestions] = useState([]);

  const navigate = useNavigate();
  /**
   * Logs the user out.
   */
  function logout() {
    authService.logout();
    navigate('/');
  }

  return (
    <QuestionsContextProvider questions={questions} setQuestions={setQuestions}>
      <div className='base-layout'>
        <Banner />
        <div className='base-layout-content'>
          <SideMenu />
          <div className='base-layout-main-content'>
            <div className='base-layout-action-btn-container'>
              {authService.isLoggedIn() ? (
                <div className='logged-in-user-actions base-layout-action-btn'>
                  <Link to='/profile' className='base-layout-action-btn'>
                    <Button text='Profile' classes='clear-btn' />
                  </Link>
                  <Button text='Logout' classes='logout-btn clear-btn' onClick={logout} />
                </div>
              ) : (
                <Link to='/login' className='base-layout-action-btn'>
                  <Button text='Login' classes='clear-btn' />
                </Link>
              )}
              <Link to='/new-question' className='base-layout-action-btn'>
                <Button text='Ask Question' classes='action-btn' />
              </Link>
            </div>
            <Outlet />
          </div>
        </div>
      </div>
    </QuestionsContextProvider>
  );
}
