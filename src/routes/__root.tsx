import { createRootRoute, Outlet } from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/router-devtools";
import { ToastContainer } from "react-toastify";
import Layout from "../components/Layout";
import "react-toastify/dist/ReactToastify.css";

export const Route = createRootRoute({
  component: () => (
    <>
      <div className={`w-full h-fit`}>
        <Layout>
          <ToastContainer theme={`dark`} />
          <Outlet />
        </Layout>
      </div>
      <TanStackRouterDevtools />
    </>
  ),
});
