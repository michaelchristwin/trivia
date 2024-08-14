import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { useNavigate } from "@tanstack/react-router";
import { SubjectData } from "@/utils/subject.details";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";

import { motion } from "framer-motion";
import { useState } from "react";

interface QuizDialogProps {
  children: React.ReactNode;
  details: SubjectData;
}
interface searchParms {
  difficulty: string;
  amount: number;
  type: string;
}
const defaultState: searchParms = {
  type: "multiple",
  difficulty: "easy",
  amount: 10,
};

function QuizDialog({ children, details }: QuizDialogProps) {
  const { color } = details;
  const navigate = useNavigate();
  const [params, setParams] = useState(defaultState);
  const { difficulty, type, amount } = params;
  const colorVariants = {
    secondary2: "!bg-secondary2",
    indigo: "!bg-indigo-600",
    orange: "!bg-orange-500",
    green: "!bg-green-400",
  };

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>{children}</AlertDialogTrigger>
      <AlertDialogContent className={`border-0 space-y-4`}>
        <AlertDialogHeader>
          <AlertDialogTitle>{details.name}</AlertDialogTitle>
        </AlertDialogHeader>
        <AlertDialogDescription>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Eaque
          distinctio asperiores, suscipit eligendi reprehenderit, id facere
          accusantium debitis eius molestias consectetur quos aperiam iusto modi
          laboriosam porro laudantium voluptatibus libero.
        </AlertDialogDescription>
        <div className={`block w-full space-y-2`}>
          <p className={`block mx-auto font-bold w-fit underline`}>
            Select Type:
          </p>
          <ToggleGroup
            type="single"
            className={`space-x-3`}
            defaultValue={type}
            onValueChange={(value) =>
              setParams((prms) => ({ ...prms, type: value }))
            }
          >
            <ToggleGroupItem value="multiple">Multiple</ToggleGroupItem>
            <ToggleGroupItem value="boolean">True or False</ToggleGroupItem>
          </ToggleGroup>
        </div>
        <div className={`block w-full space-y-2`}>
          <p className={`block mx-auto font-bold w-fit underline`}>
            Select Difficulty:
          </p>
          <ToggleGroup
            type="single"
            className={`space-x-3`}
            defaultValue={difficulty}
            onValueChange={(value) =>
              setParams((prms) => ({ ...prms, difficulty: value }))
            }
          >
            <ToggleGroupItem value="easy">Easy</ToggleGroupItem>
            <ToggleGroupItem value="medium">Medium</ToggleGroupItem>
            <ToggleGroupItem value="hard">Hard</ToggleGroupItem>
          </ToggleGroup>
        </div>
        <div className={`block w-full space-y-2`}>
          <p className={`block mx-auto font-bold w-fit underline`}>
            Select nuber of questions:
          </p>
          <ToggleGroup
            type="single"
            className={`space-x-3`}
            defaultValue={String(amount)}
            onValueChange={(value) =>
              setParams((prms) => ({ ...prms, amount: Number(value) }))
            }
          >
            <ToggleGroupItem value="10">10</ToggleGroupItem>
            <ToggleGroupItem value="15">15</ToggleGroupItem>
            <ToggleGroupItem value="20">20</ToggleGroupItem>
            <ToggleGroupItem value="30">30</ToggleGroupItem>
            <ToggleGroupItem value="50">50</ToggleGroupItem>
          </ToggleGroup>
        </div>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction asChild>
            <motion.button
              type="button"
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.9 }}
              className={`text-white ${colorVariants[color as keyof typeof colorVariants]}`}
              onClick={() =>
                navigate({
                  to: "/subjects/$subject",
                  params: {
                    subject: String(details.id),
                  },
                  search: {
                    ...params,
                  },
                })
              }
            >
              Proceed
            </motion.button>
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}

export default QuizDialog;
