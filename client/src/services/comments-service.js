import globalService from './global';
import { APIs } from '../common/api';

class CommentsService {
  async getComments(questionId, answerId) {
    const response = await axios.get('/api/comments');
    return response.data;
  }

  async createComment(questionId, answerId, comment) {}
}
