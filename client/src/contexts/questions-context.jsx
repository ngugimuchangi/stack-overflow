import { createContext } from 'react';

export const QuestionsContext = createContext();

/**
 * Provides the questions context.
 * @param {object} props The props.
 * @param {object} props.questions The questions.
 * @param {function} props.setQuestions The function to set the questions.
 * @param {object} props.children The children.
 * @returns {JSX.Element} The questions context provider.
 */
export default function QuestionsContextProvider({ questions, setQuestions, children }) {
  const value = { questions, setQuestions };
  return <QuestionsContext.Provider value={value}>{children}</QuestionsContext.Provider>;
}
