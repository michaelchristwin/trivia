import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/subjects/$subject")({
  loader: async ({ params }) => {
    console.info(`Fetching questions for subjectId ${params.subject}`);
    return fetch(
      `https://opentdb.com/api.php?amount=10&category=${params.subject}&difficulty=medium&type=multiple`
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
