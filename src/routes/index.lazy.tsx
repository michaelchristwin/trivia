import { createLazyFileRoute } from "@tanstack/react-router";

export const Route = createLazyFileRoute("/")({
  component: Index,
});

function Index() {
  return (
    <div className={`w-full grid lg:grid-cols-3 p-[40px] gap-8`}>
      <button
        type="button"
        className={`bg-secondary px-1 h-[43px] rounded-[6px] text-[16px]`}
      >
        Science: Computers
      </button>
      <button
        type="button"
        className={`bg-red-500 px-1 h-[43px] rounded-[6px] text-[16px]`}
      >
        Mathematics
      </button>
      <button
        type="button"
        className={`bg-green-400 px-1 h-[43px] rounded-[6px] text-[16px]`}
      >
        General Knowledge
      </button>
      <button
        type="button"
        className={`bg-indigo-600 px-1 h-[43px] rounded-[6px] text-[16px]`}
      >
        History
      </button>
    </div>
  );
}
