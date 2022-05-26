import React, { useContext, useEffect, useState } from "react";
import { VscGear } from "react-icons/vsc";
import { AnimatePresence, motion } from "framer-motion";
import { GameContext } from "../../context";
import { TCategories } from "../../pages/game";
import Link from "next/link";
type Props = {};

const Gear = (props: Props) => {
  const [clicked, isClicked] = useState<boolean>(false);
  const { setAnswered, setQuestions } = useContext(GameContext);
  const [loading, setLoading] = useState<boolean>(false);
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        delayChildren: 0.3,
      },
    },
  };
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
        localStorage.setItem("jeopardee-categories", JSON.stringify(results));
      }
    } catch (e: any) {
      alert(e.message || e.error.error || e.error | e);
    }
  }

  const handleReset = () => {
    setAnswered([]);
    isClicked(false);
  };

  const handleGenerateCategories = async () => {
    localStorage.removeItem("jeopardee-categories");
	setLoading(true); 
	try {
		await getQuestions();
	} catch(error) {
		alert(error)
	} finally {
		setAnswered([])
		setLoading(false);
		isClicked(false);
	}
  };
  return (
    <div className="w-fit h-fit fixed right-3 top-3 text-white">
      <button
        className="h-fit w-fit bg-neutral-700/80 p-3 rounded"
        onClick={() => isClicked((prev) => !prev)}>
        <VscGear className="w-6 h-6" />
      </button>
      <AnimatePresence>
        {clicked ? (
          <motion.div
            className=" w-64 border rounded border-white/10 bg-neutral-700 p-1 absolute right-0 mt-1 flex flex-col items-start"
            variants={container}
            initial="hidden"
            animate="show"
            exit="hidden">
            <Link href="/">
              <button
                type="button"
                className="p-2 w-full text-left hover:bg-neutral-800 transition-colors rounded"
                >
                Home
              </button>
            </Link>
            <button
              type="button"
              className="p-2 w-full text-left hover:bg-neutral-800 transition-colors rounded"
              onClick={handleReset}>
              Reset
            </button>
            <button
              type="button"
              className="p-2 hover:bg-neutral-800 w-full text-left transition-colors rounded"
              onClick={handleGenerateCategories}>
              {loading ? "Fetching..." : "Generate new categories"}
            </button>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </div>
  );
};

export default Gear;
