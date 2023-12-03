import { createContext } from 'react';

export const QuestionsContext = createContext();

const QuestionsContextProvider = ({ questions, setQuestions, children }) => {
  const value = { questions, setQuestions };
  return <QuestionsContext.Provider value={value}>{children}</QuestionsContext.Provider>;
};

export default QuestionsContextProvider;
