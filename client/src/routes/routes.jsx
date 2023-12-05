import { createBrowserRouter, redirect } from 'react-router-dom';
import HomePage from '../pages/home/home-page';
import BaseLayout from '../layouts/base-layout/base-layout';
import QuestionPage from '../pages/question/question-page';
import NotFoundPage from '../pages/not-found/not-found-page';
import LoginPage from '../pages/login/login-page';
import NewQuestionPage from '../pages/ask-question/new-question-page';
import SignupPage from '../pages/signup/signup-page';
import UnauthorizedPage from '../pages/unauthorized/unauthorized-page';
import TagsPage from '../pages/tags/tags-page';
import AuthLayout from '../layouts/auth-layout/auth-layout';
import ProfilePage from '../pages/profile/profile-page';
import questionsService from '../services/questions-service';
import tagsService from '../services/tags-service';
import authService from '../services/auth-service';
import userService from '../services/user-service';

const router = createBrowserRouter([
  {
    path: '/',
    element: <BaseLayout />,
    children: [
      {
        path: '',
        element: <HomePage />,
        loader: async ({ request }) => {
          const url = new URL(request.url);
          const query = url.searchParams.toString();

          try {
            const questions = await questionsService.getAllQuestions(query);
            return questions;
          } catch (err) {
            return [];
          }
        },
      },
      {
        path: 'new-question',
        element: <NewQuestionPage />,
        loader: () => !authService.isLoggedIn() && redirect('/unauthorized'),
      },
      {
        path: 'questions/:questionId',
        element: <QuestionPage />,
        loader: async ({ params }) => {
          try {
            const question = await questionsService.getQuestion(params.questionId);
            return question;
          } catch (err) {
            console.log(err);
            return {};
          }
        },
      },
      {
        path: 'tags',
        element: <TagsPage />,
        loader: async () => {
          try {
            const tags = await tagsService.getTags();
            return tags;
          } catch (err) {
            return [];
          }
        },
      },
      {
        path: 'profile',
        element: <ProfilePage />,
        loader: async () => {
          if (!authService.isLoggedIn()) return redirect('/unauthorized');
          try {
            const user = await userService.getProfile();
            const questions = await questionsService.getCurrentUserQuestions();
            const tags = await tagsService.getTUsersTags();
            return { user, questions, tags };
          } catch (err) {
            return {};
          }
        },
      },
    ],
  },
  {
    path: '/',
    element: <AuthLayout />,
    children: [
      {
        path: 'login',
        element: <LoginPage />,
      },
      {
        path: 'signup',
        element: <SignupPage />,
      },
    ],
  },
  {
    path: '/',
    children: [
      {
        path: 'unauthorized',
        element: <UnauthorizedPage />,
      },
      {
        path: '*',
        element: <NotFoundPage />,
      },
    ],
  },
]);
export default router;
