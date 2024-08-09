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
import { SubjectData } from "@/utils/subject.details";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";

interface QuizDialogProps {
  children: React.ReactNode;
  details: SubjectData;
}

function QuizDialog({ children, details }: QuizDialogProps) {
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>{children}</AlertDialogTrigger>
      <AlertDialogContent className={`border-0`}>
        <AlertDialogHeader>
          <AlertDialogTitle>{details.name}</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. This will permanently delete your
            account and remove your data from our servers.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <div className={`block w-full space-y-1`}>
          <p className={`block mx-auto font-bold w-fit underline`}>
            Difficulty
          </p>
          <ToggleGroup
            type="single"
            className={`space-x-3`}
            defaultValue="easy"
          >
            <ToggleGroupItem value="easy">Easy</ToggleGroupItem>
            <ToggleGroupItem value="medium">Medium</ToggleGroupItem>
            <ToggleGroupItem value="hard">Hard</ToggleGroupItem>
          </ToggleGroup>
        </div>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction>Continue</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}

export default QuizDialog;
