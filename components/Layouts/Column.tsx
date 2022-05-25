import React, { useContext } from "react";
import { GameContext } from "../../context";
import CategoryCard from "../Cards/CategoryCard";
import QuestionCard from "../Cards/QuestionCard";

type Props = {
  clues_count: number;
  id: number;
  title: string;
  clues: Clue[];
};

type Clue = {
  airdate: string | undefined | null;
  answer: string;
  category_id: number | string;
  id: number;
  value: number | string;
  question: string;
  game_id: string | number | null;
  invalid_count: null | undefined | string | number;
};

const Column: React.FC<Props> = ({ clues, title, id }) => {
  const { questions } = useContext(GameContext);
  const sort_clues = cleanClues(clues);

  function cleanClues(clues: Clue[]) {
    // Replace values with null -> 1000 from api
    let updatedClues = clues.map((i: Clue) => {
      if (i.value === null) {
        i.value = 1000;
      }
      return i;
    });

    // Sort clues
    updatedClues = updatedClues.sort((a: Clue, b: Clue) => +a.value - +b.value);

    let results = [];
    let value = 0;
    let multiplier = 1;

    // Check if first value is 100 and set multiplier to 2
    if (updatedClues[0].value === 100) {
      multiplier = 2;
    }

    for (let i = 0; i < updatedClues.length; i++) {
      if (results.length === 5) {
        break;
      } else {
        if (updatedClues[i].value > value) {
          const tempVal = { ...updatedClues[i] };
          tempVal.value = +tempVal.value * multiplier;
          results.push(tempVal);
          value = +updatedClues[i].value;
        }
      }
    }
    return results.slice(0, 5);
  }

  

  return (
    <div className="grid grid-rows-6 grid-cols-1 h-full gap-2">
      <CategoryCard title={title} />
      {sort_clues.map((s) => (
        <QuestionCard
          key={s.id}
          value={`$${s.value}`}
          question={s.question}
          id={s.id}
          category_id={s.category_id}
        />
      ))}
    </div>
  );
};

export default Column;
