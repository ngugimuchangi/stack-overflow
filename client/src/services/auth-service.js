import { APIs } from '../common/api';
import globalService from './global-service';
import fetchService from './fetch-service';

class AuthService {
  #currentUser = null;
  #token = null;

  constructor() {
    const token = localStorage.getItem('token');
    const exp = localStorage.getItem('exp');
    if (token || (exp && exp > Date.now())) this.setToken(token);
    else this.clearToken();
  }
  /**
   * Gets the current user.
   *
   * @returns {Object} The current user.
   */
  getCurrentUser() {
    return this.#currentUser;
  }

  /**
   * Checks if a user is logged in.
   *
   * @returns {boolean} True if the user is logged in, false otherwise.
   */
  isLoggedIn() {
    const user = this.#currentUser;
    if (!user) return false;
    return user.exp > Date.now();
  }

  /**
   * Authenticates a user.
   *
   * @param {string} email - The user's email.
   * @param {string} password - The user's password.
   * @returns {Promise<void>} A promise that resolves when the authentication is complete.
   */
  async login(email, password) {
    const loginURL = globalService.serverUrl + APIs.authAPI.login;
    const method = 'POST';
    const body = JSON.stringify({ email, password });

    try {
      const response = await fetchService.fetchData(loginURL, method, null, body);
      this.setToken(response.token);
    } catch (err) {
      throw err;
    }
  }

  /**
   * Logs out a user.
   *
   * @returns {Promise<void>} A promise that resolves when the logout is complete.
   */
  async logout() {
    const logoutURL = globalService.serverUrl + APIs.authAPI.logout;
    const method = 'GET';
    const headers = this.getAuthHeader();

    try {
      await fetchService.fetchData(logoutURL, method, headers);
      this.clearToken();
    } catch (err) {
      throw err;
    }
  }

  /**
   * Sets the user's token.
   *
   * @param {string} token - The user's token.
   */
  setToken(token) {
    const payload = this.decodeToken(token);

    this.#token = token;
    this.#currentUser = payload;
    localStorage.setItem('token', token);
    localStorage.setItem('exp', payload.exp);
  }

  /**
   * Clears the user's token.
   */
  clearToken() {
    this.#token = null;
    this.#currentUser = null;
    localStorage.removeItem('token');
    localStorage.removeItem('exp');
  }

  /**
   * Gets the user's token.
   *
   * @returns {string} The user's token.
   */
  getToken() {
    return this.#token;
  }

  /**
   * Decodes the user's token.
   *
   * @param {string} token - The user's token.
   * @returns {Object} The decoded token.
   */
  decodeToken(token) {
    const parts = token.split('.');
    if (parts.length !== 3) throw new Error('JWT must have 3 parts');
    const payload = JSON.parse(atob(parts[1]));
    return payload;
  }

  /**
   * Gets the authorization header.
   *
   * @returns {Object} The authorization header.
   */
  getAuthHeader() {
    const token = this.getToken();
    return { Authorization: `Bearer ${token}` };
  }
}

export default new AuthService();
