import { createLazyFileRoute } from "@tanstack/react-router";
import { useNavigate } from "@tanstack/react-router";
import { subjects } from "../utils/subject.details";
import { motion } from "framer-motion";

export const Route = createLazyFileRoute("/")({
  component: Index,
});

function Index() {
  const navigate = useNavigate();
  return (
    <div className={`w-full grid lg:grid-cols-3 p-[40px] gap-8`}>
      {subjects.map((subject) => (
        <motion.button
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.9 }}
          type="button"
          key={subject.id}
          onClick={() =>
            navigate({
              to: "/subjects/$subject",
              params: {
                subject: `${subject.id}`,
              },
            })
          }
          className={`${subject.color} px-1 h-[43px] rounded-[6px] text-[16px]`}
        >
          {subject.name}
        </motion.button>
      ))}
    </div>
  );
}
