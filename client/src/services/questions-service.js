import globalService from './global-service';
import { APIs } from '../common/api';

class QuestionService {
  #serverUrl = globalService.serverUrl;

  async getQuestions() {
    const getQuestionsAPI = APIs.getQuestionsAPI;
    return [1, 2, 3];
  }

  async getQuestion(questionId) {}

  async createQuestion(question) {}

  async updateQuestion(questionId) {}

  async deleteQuestion(questionId) {}

  async voteOnQuestion(questionId, action) {}
}

export default new QuestionService();
