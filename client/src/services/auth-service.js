import { APIs } from '../common/api';

class AuthService {
  #currentUser = null;

  get currentUser() {
    return this.#currentUser;
  }

  login(email, password) {}

  logout() {}
}

export default new AuthService();
