export const userAPI = '/users';

export const authAPI = {
  login: '/auth/login',
  logout: '/auth/logout',
  signup: '/users',
};

const questionsAPI = '/questions';

const answersAPI = '/answers';

const commentsAPI = '/comments';

const tagsAPI = '/tags';

const votesAPI = '/votes';

export const APIs = {
  userAPI,
  authAPI,
  questionsAPI,
  answersAPI,
  commentsAPI,
  tagsAPI,
  votesAPI,
};

const env = {
  API: { userAPI, authAPI, questionsAPI, answersAPI, commentsAPI, tagsAPI, votesAPI },
};

export default env;
