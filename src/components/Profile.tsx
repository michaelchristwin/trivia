import useAuthStore from "@/context/auth.store";
function Profile() {
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
  return <div>Authentication is {String(isAuthenticated)}</div>;
}

export default Profile;
