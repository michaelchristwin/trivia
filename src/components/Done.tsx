import useQuizStore from "@/context/quiz.store";
import useEventListener from "@/hooks/useEventListener";
import { useNavigate } from "@tanstack/react-router";
import { motion } from "framer-motion";

function Done({ score }: { score: number }) {
  const navigate = useNavigate();
  const correct_answers = useQuizStore((s) => s.correct_answers);
  const incorrect_answers = useQuizStore((s) => s.incorrect_answers);
  useEventListener("keypress", (e: KeyboardEvent) => {
    if (e.key === "Enter") {
      navigate({
        to: "/",
      });
    }
  });
  return (
    <div className={`w-full block p-[20px]`}>
      <p className={`text-[18px] block mx-auto w-fit`}>
        Congrats on finishing a quiz 🥳🥳
      </p>
      <p
        className={`text-[26px] merienda block mx-auto w-fit font-bold text-secondary2`}
      >
        Your accuracy was {Math.round(score)}%
      </p>
      <div className={`flex my-2 space-x-3`}>
        <div>Correct answers: {correct_answers}</div>
        <div>Incorrect answers: {incorrect_answers}</div>
      </div>
      <motion.button
        whileHover={{ scale: 1.03 }}
        whileTap={{ scale: 0.9 }}
        type="button"
        className={`w-[100px] h-[30px] rounded-[6px] flex justify-center items-center text-[17px] mt-[40px] mx-auto bg-[#5d9e39]`}
        onClick={() =>
          navigate({
            to: "/",
          })
        }
      >
        Finish
      </motion.button>
    </div>
  );
}

export default Done;
