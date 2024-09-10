import { createLazyFileRoute } from "@tanstack/react-router";
import { subjects } from "@/utils/subject.details";
import { motion } from "framer-motion";
import QuizDialog from "@/components/QuizDialog";

export const Route = createLazyFileRoute("/")({
  component: Index,
});

function Index() {
  const colorVariants = {
    secondary2: "bg-secondary2",
    indigo: "bg-indigo-600",
    orange: "bg-orange-500",
    green: "bg-green-400",
  };
  return (
    <div className={`w-full grid lg:grid-cols-3 p-[40px] gap-8`}>
      {subjects.map((subject) => (
        <QuizDialog key={subject.id} details={subject}>
          <motion.button
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.9 }}
            type="button"
            key={subject.id}
            className={`${colorVariants[subject.color as keyof typeof colorVariants]} px-1 h-[43px] leading-normal rounded-[6px] text-[0.69rem] md:text-[0.81rem] lg:text-[0.87rem]`}
          >
            {subject.name}
          </motion.button>
        </QuizDialog>
      ))}
    </div>
  );
}
