import { createFileRoute, useRouter, useBlocker } from "@tanstack/react-router";
import { isTokenExpired, refreshSessionToken } from "@/utils/session.manager";
import { useEffect, useMemo, useState } from "react";
import { shuffleArray, TriviaDBResponse } from "@/utils/subject.details";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { AnimatePresence, motion } from "framer-motion";
import Done from "@/components/Done";

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
  const response = Route.useLoaderData<TriviaDBResponse>();
  const router = useRouter();
  const { amount, difficulty, type } = Route.useLoaderDeps();
  useEffect(() => {
    (async () => {
      if (response.response_code === 4) {
        await refreshSessionToken();
        router.navigate({
          to: router.state.location.pathname,
          replace: true,
          search: {
            type: type,
            difficulty: difficulty,
            amount: amount,
          },
        });
        console.log("Effect ran");
      }
    })();
  }, [response]);

  if (response.response_code === 0) {
    const data = response.results;

    console.log(response);

    const [[page, direction], setPage] = useState([0, 0]);
    const [selectedOption, setSelectedOption] = useState<string | null>(null);
    const [isCorrect, setIsCorrect] = useState<boolean | null>(null);
    const [score, setScore] = useState(0);
    const [areOptionsDisabled, setAreOptionsDisabled] = useState(false);
    const [isComplete, setIsComplete] = useState(false);
    const [qIndex, setQIndex] = useState(0);

    useBlocker({
      blockerFn: () => window.confirm("Are you sure you want to leave?"),
      condition: !isComplete,
    });

    const { question, category, correct_answer, incorrect_answers } =
      data[qIndex];

    const shuffledChoices = useMemo(() => {
      const choices = [...incorrect_answers, correct_answer];
      return shuffleArray(choices);
    }, [qIndex]);

    const paginate = (newDirection: number) => {
      if (qIndex + 1 !== data.length) {
        setQIndex((p) => p + newDirection);
        setPage([page + newDirection, newDirection]);
      }
    };
    const checkAnswer = (value: string) => {
      const _isCorrect = value === correct_answer;
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
        if (choice === correct_answer) {
          return "data-[state=on]:border-green-500 data-[state=on]:text-green-500 data-[state=on]:border-2 data-[state=on]:font-bold";
        } else {
          return `data-[state=on]:border-red-500 data-[state=on]:text-red-500 data-[state=on]:border-2`;
        }
      } else {
        return `data-[state=on]:border-secondary2 data-[state=on]:text-secondary2`;
      }
    };
    const handleCompleteClick = () => {
      setIsComplete(true);
    };
    return (
      <div className={`block p-[10px] w-full h-screen relative`}>
        {!isComplete && (
          <>
            <p
              className={`text-[20px] block mx-auto w-fit mt-[60px] font-bold underline text-secondary2`}
            >
              {category}
            </p>
            <AnimatePresence initial={false} custom={direction}>
              <div>
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
                  className={`flex w-full p-4 py-[40px] space-x-4 mt-[30px]`}
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
                      dangerouslySetInnerHTML={{ __html: question }}
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
              </div>
            </AnimatePresence>
            <div
              className={`flex z-10 float-end h-[35px] items-center space-x-2 mx-5`}
            >
              {!isCorrect && areOptionsDisabled && (
                <p className={`mr-4 italic text-neutral-400`}>
                  <b>Correct answer:</b> {correct_answer}
                </p>
              )}
              {areOptionsDisabled && qIndex + 1 !== data.length && (
                <motion.button
                  type="button"
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={nextQ}
                  className={`w-[130px] rounded-[6px] h-full bg-secondary2 text-white border-neutral-600`}
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
                  onClick={() =>
                    checkAnswer(selectedOption ? selectedOption : "")
                  }
                  className={`w-[130px] disabled:text-slate-500 disabled:bg-slate-500/50 bg-secondary2 text-white rounded-[6px] h-full`}
                >
                  Check
                </motion.button>
              )}
              {areOptionsDisabled && qIndex + 1 === data.length && (
                <motion.button
                  type="button"
                  disabled={!selectedOption}
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={handleCompleteClick}
                  className={`w-[130px] disabled:text-slate-500 disabled:bg-slate-500/50 bg-secondary2 text-white rounded-[6px] h-full`}
                >
                  Complete
                </motion.button>
              )}
            </div>
          </>
        )}
        {isComplete && <Done score={(score / data.length) * 100} />}
      </div>
    );
  } else if (response.response_code === 1) {
    return (
      <div className={`w-full flex items-center p-[15px] h-[100px]`}>
        <p className={`w-fit`}>
          Could not return results, The API doesn't have enough questions for
          your query
        </p>
      </div>
    );
  } else if (response.response_code === 2) {
    return (
      <div className={`w-full flex items-center p-[15px] h-[100px]`}>
        <p className={`w-fit italic`}>
          <b>Invalid paramater</b>, Contains an invalid parameter. Arguements
          passed in aren't valid.
        </p>
      </div>
    );
  } else if (response.response_code === 4) {
    return (
      <div className={`w-full flex items-center p-[15px] h-[100px]`}>
        <p className={`w-fit`}>Please wait🫡.....</p>
      </div>
    );
  } else if (response.response_code === 5) {
    return (
      <div className={`w-full flex items-center p-[15px] h-[100px]`}>
        <p className={`w-fit`}>Too many requests, please come back later 😫</p>
      </div>
    );
  }
}

export default Quiz;
