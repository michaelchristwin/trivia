export interface SubjectData {
  name: string;
  id: number;
  color: string;
}
export const subjects: SubjectData[] = [
  {
    name: "Science: Computers",
    id: 18,
    color: "secondary2",
  },
  {
    name: "Science: Mathematics",
    id: 19,
    color: "orange",
  },
  {
    name: "General Knowledge",
    id: 9,
    color: "green",
  },
  {
    name: "History",
    id: 23,
    color: "indigo",
  },
];

export function shuffleArray(array: any[]) {
  for (let i = array.length - 1; i > 0; i--) {
    // Generate a random index from 0 to i
    const j = Math.floor(Math.random() * (i + 1));
    // Swap elements array[i] and array[j]
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

// The array elements will be in random order
export type TriviaDBResponse = {
  response_code: number;
  results: TriviaResult[];
};

type TriviaResult = {
  type: string;
  difficulty: string;
  category: string;
  correct_answer: string;
  incorrect_answers: string[];
  question: string;
};
