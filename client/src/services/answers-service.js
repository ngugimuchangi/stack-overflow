import globalService from './global-service';
import { APIs } from '../common/api';
import authService from './auth-service';
import fetchService from './fetch-service';

class AnswerService {
  async getAnswers(questionId) {
    const answersURL =
      globalService.serverUrl + APIs.questionsAPI + `/${questionId}` + APIs.answersAPI;
    const method = 'GET';
    const headers = authService.getAuthHeader();
    try {
      const answers = await fetchService.fetchData(answersURL, method, headers);
      return answers;
    } catch (err) {
      throw err;
    }
  }

  async createAnswer(questionId, answer) {
    const answersURL =
      globalService.serverUrl + APIs.questionsAPI + `/${questionId}` + APIs.answersAPI;
    const method = 'POST';
    const headers = authService.getAuthHeader();
    const body = JSON.stringify(answer);

    try {
      const answers = await fetchService.fetchData(answersURL, method, headers, body);
      return answers;
    } catch (err) {
      throw err;
    }
  }

  async updateAnswer(questionId, answerId, body) {
    const answersURL =
      globalService.serverUrl +
      APIs.questionsAPI +
      `/${questionId}` +
      APIs.answersAPI +
      `/${answerId}`;
    const method = 'PATCH';
    const headers = authService.getAuthHeader();
    const reqBody = JSON.stringify(body);

    try {
      const answer = await fetchService.fetchData(answersURL, method, headers, reqBody);
      return answer;
    } catch (err) {
      throw err;
    }
  }

  async deleteAnswer(questionId, answerId) {
    const answersURL =
      globalService.serverUrl +
      APIs.questionsAPI +
      `/${questionId}` +
      APIs.answersAPI +
      `/${answerId}`;
    const method = 'DELETE';
    const headers = authService.getAuthHeader();

    try {
      await fetchService.fetchData(answersURL, method, headers);
    } catch (err) {
      throw err;
    }
  }
}

export default new AnswerService();
