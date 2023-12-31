import { APIs } from '../common/api';
import globalService from './global-service';
import fetchService from './fetch-service';
import authService from './auth-service';
class UserService {
  /**
   * Signs up a user new user.
   *
   * @param {string} username - The user's username.
   * @param {string} email - The user's email.
   * @param {string} password - The user's password.
   * @returns {Promise<void>} A promise that resolves when the signup is complete.
   */
  async signup(username, email, password) {
    const signupURL = globalService.serverUrl + APIs.authAPI.signup;
    const method = 'POST';
    const body = JSON.stringify({ username, email, password });

    try {
      await fetchService.fetchData(signupURL, method, null, body);
    } catch (err) {
      throw err;
    }
  }

  async getProfile() {
    const userURL = globalService.serverUrl + APIs.userAPI + '/me';
    const method = 'GET';
    const headers = authService.getAuthHeader();

    try {
      const user = await fetchService.fetchData(userURL, method, headers);
      return user;
    } catch (err) {
      throw err;
    }
  }

  async deleteAccount() {
    const user = await authService.getCurrentUser();
    const userURL = globalService.serverUrl + APIs.userAPI + `/${user.id}`;
    const method = 'DELETE';
    const headers = authService.getAuthHeader();
    try {
      await fetchService.fetchData(userURL, method, headers);
    } catch (err) {
      throw err;
    }
  }
}

export default new UserService();
