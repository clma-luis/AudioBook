import { useUser } from "@auth0/nextjs-auth0";

const Welcome = () => {
  const { user, error, isLoading } = useUser();

  return <a href="/api/auth/login">Login</a>;
};

export default Welcome;
