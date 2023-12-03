export const userAPI = '/users';

export const authAPI = {
  login: '/auth/login',
  logout: '/auth/logout',
};

const getQuestionsAPI = '/questions';

const answersAPI = '/answers';

const commentsAPI = '/comments';

const tagsAPI = '/tags';

const votesAPI = '/votes';

export const APIs = {
  userAPI,
  authAPI,
  getQuestionsAPI,
  answersAPI,
  commentsAPI,
  tagsAPI,
  votesAPI,
};

const env = {
  API: { userAPI, authAPI, getQuestionsAPI, answersAPI, commentsAPI, tagsAPI, votesAPI },
};

export default env;
