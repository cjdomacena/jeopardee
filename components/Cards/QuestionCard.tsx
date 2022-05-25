import { AnimatePresence } from "framer-motion";
import React, { useContext, useState } from "react";
import { GameContext } from "../../context";
import QuestionModal from "../Modal/QuestionModal";

type Props = {
  value: string;
  question: string;
  id: string | number;
  category_id: string | number;
  answer: string,
};

const QuestionCard: React.FC<Props> = ({ value, question, id, category_id, answer}) => {
  const [modal, setModal] = useState<boolean>(false);
  const {answered} = useContext(GameContext)
  return (
    <>
      <button
        className={`min-h-[100px] grid place-items-center  text-[#f9a74a] font-black text-4xl bg-primary ${
          answered.find((i) => i === id) ? "opacity-50" : "opacity-100"
        }`}
        onClick={() => setModal(true)}>
        {value}
      </button>
      <AnimatePresence>
        {modal ? (
          <QuestionModal
            id={id}
            question={question}
            closeModal={() => setModal(false)}
            value={value}
            category_id={category_id}
            answer={answer}
          />
        ) : null}
      </AnimatePresence>
    </>
  );
};

export default QuestionCard;
