import { Link } from "@tanstack/react-router";

function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className={`flex w-full`}>
      <div
        className={`w-[260px] h-[100vh] flex flex-col p-[40px] border-r-2 border-[#37464f]`}
      >
        <p className={`merienda font-[900] text-[25px] text-secondary2`}>
          trivia
        </p>
        <ul className={`w-full mt-[40px] space-y-[20px]`}>
          <li>
            <Link to="/" className="[&.active]:font-bold">
              HOME
            </Link>
          </li>
          <li>
            <Link to="/about" className="[&.active]:font-bold">
              ABOUT
            </Link>
          </li>
          <li>
            <Link to="/profile" className="[&.active]:font-bold">
              PROFILE
            </Link>
          </li>
        </ul>
      </div>
      <div className={`flex-grow`}>{children}</div>
      <div
        className={`w-[350px] h-[100vh] border-l-2 border-[#37464f] p-[40px]`}
      >
        <p>• An Open TriviaDB client</p>
      </div>
    </div>
  );
}

export default Layout;
