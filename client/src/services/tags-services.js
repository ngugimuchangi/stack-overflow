class TagsService {
  #testTags = [
    {
      id: 1,
      name: 'javascript',
      questions: 10,
    },

    {
      id: 2,
      name: 'java',
      questions: 100,
    },

    {
      id: 3,
      name: 'python',
      questions: 79,
    },

    {
      id: 4,
      name: 'angular',
      questions: 36,
    },

    {
      id: 5,
      name: 'express',
      questions: 84,
    },

    {
      id: 6,
      name: 'django',
      questions: 62,
    },

    {
      id: 7,
      name: 'flask',
      questions: 105,
    },
  ];

  getTags() {
    return this.#testTags;
  }
}

export default new TagsService();
