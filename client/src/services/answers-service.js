import globalService from './global-service';
import { APIs } from '../common/api';

class AnswerService {
  getAnswers(questionId) {}

  getAnswer(questionId, answerId) {}

  voteOnAnswer(questionId, answerId, action) {}

  createAnswer(questionId, answer) {}

  updateAnswer(questionId, answerId) {}

  deleteAnswer(questionId, answerId) {}
}

export default new AnswerService();
