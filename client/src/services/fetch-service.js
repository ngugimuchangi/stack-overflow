class FetchService {
  #baseHeaders = {
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*',
  };

  /**
   * Wrapper around the fetch API to fetch data from the server.
   *
   * @param {string} url - The URL to fetch data from.
   * @param {string} method - The HTTP method to use.
   * @param {Object} headers - The headers to use.
   * @param {Object} body - The body to send.
   * @param {Object} credentials - The credentials to use.
   *
   * @returns {Promise<Object>} The data from the response.
   */
  async fetchData(url, method, headers, body, credentials) {
    const options = {
      method,
      headers: {
        ...this.#baseHeaders,
        ...headers,
      },
      body,
      ...credentials,
    };
    try {
      const response = await fetch(url, options);
      if (response.status === 204) return;
      if (!response.ok) throw new Error({ status: response.statusText, res: response.json() });
      return response.json();
    } catch (err) {
      throw err;
    }
  }

  /**
   * Get base headers for fetch requests.
   */
  get baseHeaders() {
    return this.#baseHeaders;
  }
}

export default new FetchService();
