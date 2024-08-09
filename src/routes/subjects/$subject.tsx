import { createFileRoute } from "@tanstack/react-router";
import {
  isTokenExpired,
  refreshSessionToken,
} from "../../utils/session.manager";

export const Route = createFileRoute("/subjects/$subject")({
  validateSearch: (search) =>
    search as {
      difficulty: string;
      type: string;
      amount: number;
    },
  loaderDeps: ({ search: { difficulty, type, amount } }) => ({
    difficulty,
    type,
    amount,
  }),
  loader: async ({ params, deps: { difficulty, amount, type } }) => {
    console.info(`Fetching questions for subjectId ${params.subject}`);
    let token;
    if (isTokenExpired()) {
      token = await refreshSessionToken();
    }

    let tokenData = JSON.parse(localStorage.getItem("sessionTokenData") as any);
    token = tokenData.token;
    return fetch(
      `https://opentdb.com/api.php?amount=${amount}&category=${params.subject}&difficulty=${difficulty}&type=${type}&token=${token}`
    ).then((r) => r.json());
  },
  component: Quiz,
});

function Quiz() {
  const questions = Route.useLoaderData();
  console.log(questions);
  return <div>Hello /subjects/$subject!</div>;
}

export default Quiz;
