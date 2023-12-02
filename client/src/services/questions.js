import globalService from './global';
import { API } from '../environment/environment';

class QuestionService {
  #serverUrl = globalService.serverUrl;

  async getQuestions() {
    const getQuestionsAPI = API.getQuestionsAPI;
    const response = await fetch(getQuestionsAPI);
    const data = await response.json();
    return data;
  }
}

export default new QuestionService();
