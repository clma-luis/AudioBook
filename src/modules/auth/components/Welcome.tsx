import { IconButton } from "@mui/material";
import { signIn } from "next-auth/react";

const Welcome = () => {
  return <IconButton onClick={() => signIn()}>Login</IconButton>;
};

export default Welcome;
