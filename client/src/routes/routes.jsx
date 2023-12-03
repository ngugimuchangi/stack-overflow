import { createBrowserRouter } from 'react-router-dom';
import HomePage from '../pages/home/home-page';
import BaseLayout from '../layouts/base-layout/base-layout';
import QuestionPage from '../pages/question/question-page';
import NotFoundPage from '../pages/not-found/not-found-page';
import LoginPage from '../pages/login/login-page';
import NewQuestionPage from '../pages/ask-question/new-question-page';
import SignupPage from '../pages/signup/signup-page';
import UnauthorizedPage from '../pages/unauthorized/unauthorized-page';
import TagsPage from '../pages/tags/tags-page';

const router = createBrowserRouter([
  {
    path: '/',
    element: <BaseLayout />,
    children: [
      {
        path: '',
        element: <HomePage />,
      },
      {
        path: 'new-question',
        element: <NewQuestionPage />,
      },
      {
        path: 'questions/:questionId',
        element: <QuestionPage />,
      },
      {
        path: '/tags',
        element: <TagsPage />,
      },
    ],
  },
  {
    path: '/login',
    element: <LoginPage />,
  },
  {
    path: '/signup',
    element: <SignupPage />,
  },
  {
    path: '/unauthorized',
    element: <UnauthorizedPage />,
  },
  {
    path: '*',
    element: <NotFoundPage />,
  },
]);
export default router;
