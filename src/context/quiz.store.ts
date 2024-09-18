import { create } from "zustand";

type QuizParams = {
  score: number;
  correct_answers: number;
  incorrect_answers: number;
  total: number;
};

interface QuizState extends QuizParams {
  updateQuizParams: (params: Partial<QuizParams>) => void;
  clearQuizParams: () => void;
}

const initialQuizParams: QuizParams = {
  score: 0,
  correct_answers: 0,
  incorrect_answers: 0,
  total: 0,
};

const useQuizStore = create<QuizState>((set) => ({
  ...initialQuizParams,

  updateQuizParams: (params: Partial<QuizParams>) =>
    set((state) => ({
      score: state.score + (params.score || 0),
      correct_answers: state.correct_answers + (params.correct_answers || 0),
      incorrect_answers:
        state.incorrect_answers + (params.incorrect_answers || 0),
      total: state.total + (params.total || 0),
    })),

  clearQuizParams: () => set(initialQuizParams),
}));

export default useQuizStore;
