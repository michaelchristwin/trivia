import seedrandom from "seedrandom";

export interface SubjectData {
  name: string;
  id: number;
  slug: string;
  color: string;
}
export const subjects: SubjectData[] = [
  {
    name: "Science: Computers",
    id: 18,
    slug: "computer",
    color: "secondary2",
  },
  {
    name: "Science: Mathematics",
    id: 19,
    slug: "mathematics",
    color: "orange",
  },
  {
    name: "General Knowledge",
    id: 9,
    slug: "general_knowledge",
    color: "green",
  },
  {
    name: "History",
    id: 23,
    slug: "history",
    color: "indigo",
  },
];

export function shuffleArray(array: any[], seed: string) {
  const rng = seedrandom(seed);
  const newArray = [...array];
  for (let i = newArray.length - 1; i > 0; i--) {
    const j = Math.floor(rng() * (i + 1));
    [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
  }
  return newArray;
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
