import { create } from "zustand";

type Props = {
  score: number;
  correct_answers: number;
  incorrect_answers: number;
  total: number;
};
interface QuizState {
  props: Props | null;
  setQuizProps: (props: Props) => void;
  clearQuizProps: () => void;
}

const QuizStore = create<QuizState>((set) => ({
  props: null,
  clearQuizProps() {},
  setQuizProps: (propsUpdate) => {
    set({
      props: {
        total: propsUpdate.total,
        score: propsUpdate.score,
        correct_answers: propsUpdate.correct_answers,
        incorrect_answers: propsUpdate.incorrect_answers,
      },
    });
  },
}));

export default QuizStore;
