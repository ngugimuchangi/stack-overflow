class GlobalService {
  #serverDomain = 'http://localhost:8000';

  get serverUrl() {
    return this.#serverDomain;
  }
}

const globalService = new GlobalService();
export default globalService;
