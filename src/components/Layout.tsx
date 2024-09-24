import { Link } from "@tanstack/react-router";
import AuthModal from "@/components/AuthModal";
import Profile from "@/components/Profile";
import { useNavigate } from "@tanstack/react-router";
import useAuthStore from "@/context/auth.store";
import { CgProfile } from "react-icons/cg";

function Layout({ children }: { children: React.ReactNode }) {
  const navigate = useNavigate();
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
  return (
    <div className={`flex w-full`}>
      <div
        className={`w-[260px] h-[100vh] flex flex-col p-[40px] border-r-2 border-[#37464f]`}
      >
        <p className={`merienda h-fit font-[900] text-[25px] text-secondary2`}>
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
        className={`w-[350px] h-[100vh] border-l-2 border-[#37464f] space-y-3 p-[40px]`}
      >
        <div className={`flex w-[160px] space-x-2 h-[30px] mx-auto`}>
          {!isAuthenticated ? (
            <>
              <AuthModal title="Signup">
                <button
                  type="button"
                  className={`bg-neutral-600 hover:opacity-[0.7] text-[12px] font-bold text-white block mx-auto rounded-[5px] w-[100px] h-[30px]`}
                >
                  Signup
                </button>
              </AuthModal>

              <button
                type="button"
                onClick={() => navigate({ to: "/login" })}
                className={`bg-secondary2 hover:opacity-[0.7] text-[12px] font-bold text-white block mx-auto rounded-[5px] w-[100px] h-[30px]`}
              >
                Login
              </button>
            </>
          ) : (
            <CgProfile size={"30px"} className={`block mx-auto`} />
          )}
        </div>
        <p>• An Open TriviaDB client</p>
        <Profile />
      </div>
    </div>
  );
}

export default Layout;
