import globalService from './global-service';
import authService from './auth-service';
import { APIs } from '../common/api';
import fetchService from './fetch-service';

class QuestionService {
  /*
   * Gets all questions.
   * @param {string} query - query string to filter questions.
   * @returns {Promise<Array>} - array of questions.
   */
  async getAllQuestions(query) {
    const questionsURL = globalService.serverUrl + APIs.questionsAPI + (query ? `?${query}` : '');
    const method = 'GET';

    try {
      const questions = await fetchService.fetchData(questionsURL, method);
      return questions;
    } catch (err) {
      throw err;
    }
  }

  async getQuestion(questionId) {
    const questionsURL = globalService.serverUrl + APIs.questionsAPI + `/${questionId}`;
    const method = 'GET';

    try {
      let question = await fetchService.fetchData(questionsURL, method);
      if (
        question &&
        (!authService.getCurrentUser() || question.user._id !== authService.getCurrentUser().id)
      ) {
        question = await fetchService.fetchData(questionsURL + '/views', 'PATCH');
      }
      return question;
    } catch (err) {
      throw err;
    }
  }

  async getCurrentUserQuestions() {
    const questionsURL = globalService.serverUrl + APIs.questionsAPI + '/me';
    const method = 'GET';
    const headers = authService.getAuthHeader();

    try {
      const questions = await fetchService.fetchData(questionsURL, method, headers);
      return questions;
    } catch (err) {
      throw err;
    }
  }

  async createQuestion(question) {
    const questionsURL = globalService.serverUrl + APIs.questionsAPI;
    const method = 'POST';
    const headers = authService.getAuthHeader();
    const body = JSON.stringify(question);

    try {
      const questions = await fetchService.fetchData(questionsURL, method, headers, body);
      return questions;
    } catch (err) {
      throw err;
    }
  }

  async updateQuestion(questionId, body) {
    const questionsURL = globalService.serverUrl + APIs.questionsAPI + `/${questionId}`;
    const method = 'PATCH';
    const headers = authService.getAuthHeader();
    const reqBody = JSON.stringify(body);

    try {
      const question = await fetchService.fetchData(questionsURL, method, headers, reqBody);
      return question;
    } catch (err) {
      throw err;
    }
  }

  async deleteQuestion(questionId) {
    const questionsURL = globalService.serverUrl + APIs.questionsAPI + `/${questionId}`;
    const method = 'DELETE';
    const headers = authService.getAuthHeader();

    try {
      await fetchService.fetchData(questionsURL, method, headers);
    } catch (err) {
      throw err;
    }
  }
}

export default new QuestionService();
