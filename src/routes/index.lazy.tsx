import { createLazyFileRoute } from "@tanstack/react-router";
import { subjects } from "@/utils/subject.details";
import QuizDialog from "@/components/QuizDialog";
import { motion } from "framer-motion";
//import LaunchCard from "@/components/LaunchCard";

export const Route = createLazyFileRoute("/")({
  component: Index,
});

function Index() {
  return (
    <div className={`w-full grid lg:grid-cols-3 p-[40px] gap-8`}>
      {subjects.map((subject) => (
        <QuizDialog key={subject.id} details={subject}>
          <motion.div
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.9 }}
            className={`w-[280px] bg-neutral-800 h-[180px] rounded-[8px]`}
            role={`button`}
          >
            <img
              src={`https://michaelchristwin.github.io/trivia-assets/${subject.slug}-thumbnail.webp`}
              alt="Thumbnail"
              className={`w-full h-[70%] rounded-t-[8px] object-cover`}
            />
            <div className={`w-full h-[30%] p-4`}>
              <p className={`text-[14px] font-bold`}>{subject.name}</p>
            </div>
          </motion.div>
        </QuizDialog>
      ))}
    </div>
  );
}
