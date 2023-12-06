import globalService from './global-service';
import { APIs } from '../common/api';

class CommentsService {
  async getComments(questionId, answerId) {
    const response = await axios.get('/api/comments');
    return response.data;
  }

  async createComment(questionId, answerId, comment) {}
}

export default new CommentsService();
