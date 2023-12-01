class GlobalService {
  #serverDomain = process.env.SERVER_URL || 'http://localhost:8000';

  get serverUrl() {
    return this.#serverDomain;
  }
}

export default new GlobalService();
