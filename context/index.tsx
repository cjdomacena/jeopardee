import { createContext, Dispatch, SetStateAction, useState } from "react";
import { TCategories } from "../pages/game";

type GameProps = {
  questions: TCategories[] | null;
  setQuestions: Dispatch<SetStateAction<null | TCategories[]>>;
  answered: number[];
  setAnswered: Dispatch<SetStateAction<number[]>>;
};

export const GameContext = createContext({} as GameProps);

type Props = {
  children: JSX.Element | JSX.Element[];
};
export const GameProvider: React.FC<Props> = ({ children }) => {
  const [questions, setQuestions] = useState<TCategories[] | null>(null);
  const [answered, setAnswered] = useState([0]);
  return (
    <GameContext.Provider value={{ questions, setQuestions, answered, setAnswered }}>
      {children}
    </GameContext.Provider>
  );
};
