import { createFileRoute } from "@tanstack/react-router";
import {
  isTokenExpired,
  refreshSessionToken,
} from "../../utils/session.manager";
import { useState } from "react";
import { shuffleArray, TriviaDBResponse } from "@/utils/subject.details";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { wrap } from "popmotion";
import { AnimatePresence, motion } from "framer-motion";

const variants = {
  enter: (direction: number) => {
    return {
      zIndex: 0,
      x: direction > 0 ? 1000 : -1000,
      opacity: 0,
    };
  },
  center: {
    zIndex: 1,
    x: 0,
    opacity: 1,
  },
  exit: (direction: number) => {
    return {
      zIndex: 0,
      x: direction < 0 ? 1000 : -1000,
      opacity: 0,
    };
  },
};

export const Route = createFileRoute("/subjects/$subject")({
  validateSearch: (search) =>
    search as {
      difficulty: string;
      type: string;
      amount: number;
    },
  loaderDeps: ({ search: { difficulty, type, amount } }) => ({
    difficulty,
    type,
    amount,
  }),
  loader: async ({ params, deps: { difficulty, amount, type } }) => {
    console.info(`Fetching questions for subjectId ${params.subject}`);
    let token;
    if (isTokenExpired()) {
      token = await refreshSessionToken();
    }

    let tokenData = JSON.parse(localStorage.getItem("sessionTokenData") as any);
    token = tokenData.token;
    return fetch(
      `https://opentdb.com/api.php?amount=${amount}&category=${params.subject}&difficulty=${difficulty}&type=${type}&token=${token}`
    ).then((r) => r.json());
  },
  component: Quiz,
});

function Quiz() {
  const questions = Route.useLoaderData<TriviaDBResponse>();
  const data = questions.results;
  console.log(questions);

  const [[page, direction], setPage] = useState([0, 0]);
  const qIndex = wrap(0, data.length, page);
  let choices = [
    ...data[qIndex].incorrect_answers,
    data[qIndex].correct_answer,
  ];

  choices = shuffleArray(choices);
  const paginate = (newDirection: number) => {
    setPage([page + newDirection, newDirection]);
  };
  return (
    <div className={`flex w-full h-full relative`}>
      <p
        className={`absolute top-[50px] left-[50%] text-[20px] font-bold underline text-secondary2 translate-x-[-50%]`}
      >
        {data[qIndex].category}
      </p>
      <AnimatePresence initial={false} custom={direction}>
        <motion.div
          custom={direction}
          variants={variants}
          initial="enter"
          animate="center"
          exit={"exit"}
          key={page}
          transition={{
            x: { type: "spring", stiffness: 300, damping: 30 },
            opacity: { duration: 0.5 },
          }}
          className={`flex w-full p-4 h-full absolute top-[200px] left-0 space-x-4`}
        >
          <div
            className={`rounded-full text-white bg-secondary2 font-bold flex justify-center items-center text-[17px] w-[30px] h-[30px]`}
          >
            {qIndex + 1}
          </div>
          <div className={`flex flex-grow flex-col h-[80px] space-y-2`}>
            <div
              className={`flex-1 text-[16px]`}
              dangerouslySetInnerHTML={{ __html: data[qIndex].question }}
            ></div>
            <div className={`flex-1`}>
              <ToggleGroup
                type="single"
                className={`space-x-2 justify-start lg:w-[700px] md:w-[500px] w-[300px] flex-wrap gap-y-2`}
              >
                {choices.map((choice, i) => (
                  <ToggleGroupItem
                    value={choice}
                    key={i}
                    dangerouslySetInnerHTML={{ __html: choice }}
                    className={`border border-neutral-700 data-[state=on]:bg-secondary2 data-[state=on]:border-0`}
                  ></ToggleGroupItem>
                ))}
              </ToggleGroup>
            </div>
          </div>
        </motion.div>
      </AnimatePresence>
      <div
        className={`flex z-10 float-end w-[130px] h-[35px] absolute top-[340px] right-[40px] items-center space-x-2`}
      >
        <motion.button
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.9 }}
          type="button"
          onClick={() => paginate(-1)}
          className={`flex-1 border rounded-[6px] h-full border-neutral-600`}
        >
          Prev
        </motion.button>
        <motion.button
          type="button"
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.9 }}
          onClick={() => paginate(1)}
          className={`flex-1 border rounded-[6px] h-full border-neutral-600`}
        >
          Next
        </motion.button>
      </div>
    </div>
  );
}

export default Quiz;
