interface LaunchCardProps {
  children: React.ReactNode;
}
function LaunchCard() {
  return (
    <div
      className={`w-[280px] bg-neutral-800 h-[200px] rounded-[8px]`}
      role={`button`}
    >
      <img
        src={`https://michaelchristwin.github.io/trivia-assets/history-thumbnail.webp`}
        alt="Thumbnail"
        className={`w-full h-[70%] rounded-t-[8px] object-cover`}
      />
      <p>Poodle pie</p>
    </div>
  );
}

export default LaunchCard;
