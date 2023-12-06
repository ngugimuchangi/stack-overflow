import { APIs } from '../common/api';
import globalService from './global-service';
import fetchService from './fetch-service';
import authService from './auth-service';

class TagsService {
  async getTags() {
    const tagsURL = globalService.serverUrl + APIs.tagsAPI;
    const method = 'GET';

    try {
      const tags = fetchService.fetchData(tagsURL, method);
      return tags;
    } catch (err) {
      throw err;
    }
  }

  async getTUsersTags() {
    const tagsURL = globalService.serverUrl + APIs.tagsAPI + '/me';
    const method = 'GET';
    const headers = authService.getAuthHeader();

    try {
      const tags = fetchService.fetchData(tagsURL, method, headers);
      return tags;
    } catch (err) {
      throw err;
    }
  }

  async deleteTag(id) {
    const tagsURL = globalService.serverUrl + APIs.tagsAPI + `/${id}`;
    const method = 'DELETE';
    const headers = authService.getAuthHeader();

    try {
      const tags = fetchService.fetchData(tagsURL, method, headers);
      return tags;
    } catch (err) {
      throw err;
    }
  }
}

export default new TagsService();
