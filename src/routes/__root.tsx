import { createRootRoute, Outlet } from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/router-devtools";
import Layout from "../components/Layout";
//import Navbar from "../components/Navbar";

export const Route = createRootRoute({
  component: () => (
    <>
      <div className={`w-full h-fit`}>
        <Layout>
          <Outlet />
        </Layout>
      </div>
      <TanStackRouterDevtools />
    </>
  ),
});
