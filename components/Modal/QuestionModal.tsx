import React, { useContext, useState } from "react";
import { GameContext } from "../../context";
import {motion} from 'framer-motion'
type Props = {
  question: string;
  closeModal: React.MouseEventHandler<HTMLButtonElement>;
  value: number | string;
  id: string | number;
  category_id: string | number;
  answer: string;
};

const QuestionModal: React.FC<Props> = ({ question, closeModal, value, id, category_id, answer }) => {
  const { answered, setAnswered } = useContext(GameContext);
  const [showAnswer, setShowAnswer] = useState<boolean>(false);

  const handleAnsweredQuestion = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    const tempAnswered = [...answered];
    if (!tempAnswered.find((i) => i === +id)) {
      tempAnswered.push(+id);
    }
    setAnswered(tempAnswered);
    setShowAnswer(true);
  };

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        delayChildren: 0.5,
      },
    },
  };



  return (
    <motion.div
      className="fixed overflow-hidden top-0 left-0 z-10 h-screen w-screen bg-blend-luminosity bg-black/80 grid place-items-center"
      variants={container}
      animate="show"
      initial={{ opacity: 0 }}
      exit={{ opacity: 0 }}>
      <div className="bg-primary w-3/4 h-3/4 grid place-items-center relative">
        <div>
          <p className="text-[#f9a74a] text-center text-4xl mb-4">{value}</p>
          <h1 className={`max-w-6xl text-center  text-4xl leading-loose ${showAnswer ? 'text-white/60' : 'text-white'} transition-opacity`}>
            {question}
          </h1>
          {showAnswer ? (
            <p className="text-center text-white mt-4 text-4xl">Answer: {answer}</p>
          ) : null}
        </div>

        <div className="absolute left-0 right-0 bottom-8 text-center text-white flex flex-col items-center">
          <button onClick={handleAnsweredQuestion} className="px-4 py-2 border rounded hover:bg-white hover:text-primary transition-all">Show Answer</button>
          <button className="block text-center w-fit text-white/80 mt-4" onClick={closeModal}>
            Close
          </button>
        </div>
      </div>
    </motion.div>
  );
};

export default QuestionModal;
