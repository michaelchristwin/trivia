import { createFileRoute } from "@tanstack/react-router";
import {
  isTokenExpired,
  refreshSessionToken,
} from "../../utils/session.manager";

export const Route = createFileRoute("/subjects/$subject")({
  loader: async ({ params }) => {
    console.info(`Fetching questions for subjectId ${params.subject}`);
    let token;
    if (isTokenExpired()) {
      token = await refreshSessionToken();
    }
    let tokenData = JSON.parse(localStorage.getItem("sessionTokenData") as any);
    token = tokenData.token;
    return fetch(
      `https://opentdb.com/api.php?amount=10&category=${params.subject}&difficulty=medium&type=multiple&token=${token}`
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
