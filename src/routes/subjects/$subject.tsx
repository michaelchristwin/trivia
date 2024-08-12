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
  const [index, setIndex] = useState(0);

  const data = questions.results;
  console.log(questions);
  let choices = [...data[index].incorrect_answers, data[index].correct_answer];
  console.log(choices);
  choices = shuffleArray(choices);

  const [[page, direction], setPage] = useState([0, 0]);
  const imageIndex = wrap(0, data.length, page);

  const paginate = (newDirection: number) => {
    setPage([page + newDirection, newDirection]);
  };
  return (
    <div className={`flex w-full h-full relative`}>
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
            opacity: { duration: 0.2 },
          }}
          className={`flex w-full p-4 h-full absolute top-[200px] left-0 space-x-4`}
        >
          <div
            className={`rounded-[8px] text-secondary2 border-2 font-bold border-secondary2 flex justify-center items-center text-[17px] w-[30px] h-[40px]`}
          >
            {index + 1}
          </div>
          <div className={`flex flex-grow flex-col h-[80px]`}>
            <div className={`flex-1 text-[16px]`}>{data[index].question}</div>
            <div className={`flex-1`}>
              <ToggleGroup type="single" className={`space-x-2 justify-start`}>
                {choices.map((choice, i) => (
                  <ToggleGroupItem
                    value={choice}
                    key={i}
                    className={`border border-neutral-700 data-[state=on]:bg-secondary2 data-[state=on]:border-0`}
                  >
                    {choice}
                  </ToggleGroupItem>
                ))}
              </ToggleGroup>
            </div>
          </div>
        </motion.div>
      </AnimatePresence>
      <div
        className={`flex float-end w-[130px] h-[35px] absolute top-[340px] right-[40px] items-center space-x-2`}
      >
        <button
          type="button"
          className={`flex-1 border rounded-[6px] h-full border-neutral-600`}
        >
          Prev
        </button>
        <button
          type="button"
          className={`flex-1 border rounded-[6px] h-full border-neutral-600`}
        >
          Next
        </button>
      </div>
    </div>
  );
}

export default Quiz;
