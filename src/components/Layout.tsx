import { Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import AuthModal from "@/components/AuthModal";
import Profile from "@/components/Profile";
import useAuthStore from "@/context/auth.store";
import { CgProfile } from "react-icons/cg";

function Layout({ children }: { children: React.ReactNode }) {
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
  return (
    <div className={`flex w-full`}>
      <div
        className={`w-[260px] h-[100vh] flex flex-col5 p-[40px] border-r-2 border-[#37464f]`}
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
        className={`w-[350px] h-[100vh] border-l-2 border-[#37464f] space-y-3 p-[40px]`}
      >
        <div className={`flex w-[160px] h-[30px] mx-auto`}>
          {!isAuthenticated ? (
            <>
              <AuthModal title="Signup">
                <motion.button
                  type="button"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  className={`bg-indigo-500 text-[12px] font-bold text-white block mx-auto rounded-[6px] w-[70px] h-[30px]`}
                >
                  Signup
                </motion.button>
              </AuthModal>

              <AuthModal title="Login">
                <motion.button
                  type="button"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  className={`bg-indigo-500 text-[12px] font-bold text-white block mx-auto rounded-[6px] w-[70px] h-[30px]`}
                >
                  Login
                </motion.button>
              </AuthModal>
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
