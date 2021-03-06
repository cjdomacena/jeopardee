import React, { useContext, useEffect, useId, useState } from "react";
import Board from "../components/Layouts/Board";
import Column from "../components/Layouts/Column";
import Gear from "../components/Settings/Gear";
import { GameContext } from "../context";
type Props = {
  data?: any;
};
export type TCategories = {
  clues_count: number;
  id: number;
  title: string;
  clues: [];
};

const Game: React.FC<Props> = () => {
  const { questions, setQuestions } = useContext(GameContext);

   async function getCategories() {
    const randomInt = Math.floor(Math.random() * 15) + 1;
    let results = [];
    try {
      const req = await fetch(`https://jservice.io/api/categories?count=6&offset=${randomInt}`);
      const res = await req.json();
      results = res;
    } catch (e: any) {
      alert(e.message || e.error.error || e.error | e);
    }
    return results;
  }

  async function getQuestions() {
    const categories = await getCategories();
    try {
      const results = await Promise.all(
        categories.map(async (category: TCategories) => {
          const req = await fetch(`https://jservice.io/api/category?id=${category.id}`);
          const res = await req.json();
          return res;
        }),
      );
      if (results) {
        setQuestions(results);
      }
    } catch (e: any) {
      alert(e.message || e.error.error || e.error | e);
    }
  }


  useEffect(() => {
    if (
      localStorage.getItem("jeopardee-categories") === "null" ||
      localStorage.getItem("jeopardee-categories") === null
    ) {
      getQuestions();
    } else {
      const item = JSON.parse(localStorage.getItem("jeopardee-categories") || "");
      setQuestions(item);
    }

    return () => {
      if (
        localStorage.getItem("jeopardee-categories") === "null" ||
        localStorage.getItem("jeopardee-categories") === null
      ) {
        localStorage.removeItem("jeopardee-categories");
      }
    };
  }, []);
  

  useEffect(() => {
    if (
      localStorage.getItem("jeopardee-categories") === "null" ||
      localStorage.getItem("jeopardee-categories") === null
    ) {
      localStorage.setItem("jeopardee-categories", JSON.stringify(questions));
    }
  }, [questions]);

  return (
    <main className="w-full h-screen gap-2 p-4 font-bold bg-black">
      <Gear />
      <Board>
        {questions
          ? questions.map((category: TCategories) => (
              <Column
                key={category.id}
                clues_count={category.clues_count}
                id={category.id}
                title={category.title}
                clues={category.clues}
              />
            ))
          : null}
      </Board>
    </main>
  );
};

export default Game;


