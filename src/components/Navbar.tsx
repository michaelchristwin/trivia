import { Link } from "@tanstack/react-router";

function Navbar() {
  return (
    <header
      className={`flex w-full h-[35px] fixed top-0 items-center justify-between p-3 dark:bg-white dark:bg-clip-padding dark:backdrop-filter dark:backdrop-blur-sm dark:bg-opacity-10`}
    >
      <p className={`merienda font-[800] text-[19px] text-secondary`}>Trivia</p>
      <nav className={`flex justify-between w-[30%]`}>
        <ul className={`flex w-fit space-x-4`}>
          <li>
            <Link to="/" className="[&.active]:font-bold">
              Home
            </Link>
          </li>
          <li>
            <Link to="/about" className="[&.active]:font-bold">
              About
            </Link>
          </li>
        </ul>
      </nav>
    </header>
  );
}

export default Navbar;
