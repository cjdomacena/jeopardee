import React, { useContext } from "react";
import { GameContext } from "../../context";

type Props = {
  question: string;
  closeModal: React.MouseEventHandler<HTMLButtonElement>;
  value: number | string;
  id: string | number;
  category_id: string | number;
};

const QuestionModal: React.FC<Props> = ({ question, closeModal, value, id, category_id }) => {
  const { answered, setAnswered } = useContext(GameContext);

  const handleAnsweredQuestion = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    const tempAnswered = [...answered];
    if (!tempAnswered.find((i) => i === +id)) {
      tempAnswered.push(+id);
    }
    setAnswered(tempAnswered);
    closeModal(e);
  };

  return (
    <div className="fixed overflow-hidden top-0 left-0 z-10 h-screen w-screen bg-blend-luminosity bg-black/80 grid place-items-center">
      <div className="bg-primary w-3/4 h-3/4 grid place-items-center relative">
        <div>
          <p className="text-[#f9a74a] text-center text-4xl mb-4">{value}</p>
          <h1 className="max-w-6xl text-center text-white text-4xl leading-loose">{question}</h1>
        </div>

        <div className="absolute left-0 right-0 bottom-8 text-center text-white flex flex-col items-center">
          <button onClick={handleAnsweredQuestion}>Show Answer</button>
          <button className="block text-center w-fit text-white/80 mt-4" onClick={closeModal}>
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default QuestionModal;
