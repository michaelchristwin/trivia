import { createFileRoute, useRouter } from "@tanstack/react-router";
import {
  isTokenExpired,
  refreshSessionToken,
} from "../../utils/session.manager";
import { useEffect, useMemo, useState } from "react";
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
  const router = useRouter();
  useEffect(() => {
    (async () => {
      if (questions.response_code === 4) {
        await refreshSessionToken();
        router.navigate({
          to: router.state.location.pathname,
          replace: true,
        });
        console.log("Effect ran");
      }
    })();
  }, [questions]);
  if (questions.response_code === 0) {
    const data = questions.results;
    console.log(questions);

    const [[page, direction], setPage] = useState([0, 0]);
    const [selectedOption, setSelectedOption] = useState<string | null>(null);
    const [isCorrect, setIsCorrect] = useState<boolean | null>(null);
    const [score, setScore] = useState(0);
    const [areOptionsDisabled, setAreOptionsDisabled] = useState(false);
    const qIndex = wrap(0, data.length, page);
    const shuffledChoices = useMemo(() => {
      const choices = [
        ...data[qIndex].incorrect_answers,
        data[qIndex].correct_answer,
      ];
      return shuffleArray(choices);
    }, [qIndex]);

    const paginate = (newDirection: number) => {
      setPage([page + newDirection, newDirection]);
    };
    const checkAnswer = (value: string) => {
      const _isCorrect = value === data[qIndex].correct_answer;
      setIsCorrect(_isCorrect);
      setAreOptionsDisabled(true);
      if (_isCorrect) {
        setScore((prevScore) => prevScore + 1);
      }
    };
    const nextQ = () => {
      paginate(1);
      setSelectedOption(null);
      setAreOptionsDisabled(false);
      setIsCorrect(null);
    };
    const optionsClasses = (choice: string) => {
      if (areOptionsDisabled) {
        if (choice === data[qIndex].correct_answer) {
          return "data-[state=on]:border-green-500 data-[state=on]:text-green-500 data-[state=on]:border-2 data-[state=on]:font-bold";
        } else {
          return `data-[state=on]:border-red-500 data-[state=on]:text-red-500 data-[state=on]:border-2`;
        }
      } else {
        return `data-[state=on]:border-secondary2 data-[state=on]:text-secondary2`;
      }
    };
    return (
      <div className={`block p-[10px] w-full h-screen`}>
        <p
          className={`text-[20px] block mx-auto w-fit mt-[60px] font-bold underline text-secondary2`}
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
            className={`flex w-full p-4 h-[35%] space-x-4 mt-[30px]`}
          >
            <div className={`w-[70px] flex justify-center`}>
              <div
                className={`rounded-full text-white bg-secondary2 font-bold flex justify-center items-center text-[17px] w-[30px] h-[30px]`}
              >
                {qIndex + 1}
              </div>
            </div>
            <div className={`flex flex-grow flex-col h-[80px] space-y-2`}>
              <div
                className={`flex-1 flex-wrap text-[16px]`}
                dangerouslySetInnerHTML={{ __html: data[qIndex].question }}
              ></div>
              <div className={`flex-1`}>
                <ToggleGroup
                  type="single"
                  onValueChange={(v) => setSelectedOption(v)}
                  className={`space-x-2 justify-start lg:w-[700px] md:w-[500px] w-[300px] flex-wrap gap-y-2`}
                >
                  {shuffledChoices.map((choice, i) => (
                    <ToggleGroupItem
                      value={choice}
                      disabled={areOptionsDisabled}
                      key={i}
                      dangerouslySetInnerHTML={{ __html: choice }}
                      className={`border border-neutral-700 ${optionsClasses(choice)}`}
                    ></ToggleGroupItem>
                  ))}
                </ToggleGroup>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
        <div
          className={`flex z-10 float-end w-[130px] h-[35px] items-center space-x-2 mx-5`}
        >
          {/* <motion.button
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.9 }}
          type="button"
          onClick={() => paginate(-1)}
          className={`flex-1 border rounded-[6px] h-full border-neutral-600`}
        >
          Prev
        </motion.button> */}
          {areOptionsDisabled && (
            <motion.button
              type="button"
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.9 }}
              onClick={nextQ}
              className={`flex-1 border rounded-[6px] h-full border-neutral-600`}
            >
              Next
            </motion.button>
          )}
          {!areOptionsDisabled && (
            <motion.button
              type="button"
              disabled={!selectedOption}
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => checkAnswer(selectedOption ? selectedOption : "")}
              className={`flex-1 disabled:text-slate-500 disabled:bg-slate-500/50 bg-secondary2 text-white rounded-[6px] h-full`}
            >
              Check
            </motion.button>
          )}
        </div>
      </div>
    );
  } else if (questions.response_code === 4) {
    return (
      <div>
        <p>Hello</p>
      </div>
    );
  }
}

export default Quiz;
