function Done({ score }: { score: number }) {
  return (
    <div className={`w-full block p-[20px]`}>
      <p className={`text-[18px] block mx-auto w-fit`}>
        Congrats on finishing a quiz 🥳🥳
      </p>
      <p
        className={`text-[26px] merienda block mx-auto w-fit font-bold text-secondary2`}
      >
        Your accuracy was {score}%
      </p>
    </div>
  );
}

export default Done;
