import globalService from './global-service';
import authService from './auth-service';
import { APIs } from '../common/api';
import fetchService from './fetch-service';
class QuestionService {
  /*
   * Gets all questions.
   *
   * @returns {Promise<Array>}
   */
  async getAllQuestions(query) {
    const questionsURL = globalService.serverUrl + APIs.questionsAPI + (query ? `?${query}` : '');
    const method = 'GET';
    const headers = authService.getAuthHeader();

    try {
      const questions = await fetchService.fetchData(questionsURL, method, headers);
      return questions;
    } catch (err) {
      throw err;
    }
  }

  async getQuestion(questionId) {}

  async createQuestion(question) {}

  async updateQuestion(questionId) {}

  async deleteQuestion(questionId) {}

  async voteOnQuestion(questionId, action) {}
}

export default new QuestionService();
