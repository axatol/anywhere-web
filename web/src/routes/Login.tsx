import { useAuth0 } from "@auth0/auth0-react";
import { Button } from "antd";

export const Login = () => {
  const { loginWithRedirect, logout } = useAuth0();

  return (
    <div id="login">
      <Button onClick={() => loginWithRedirect()}>Login</Button>
      <Button onClick={() => logout()}>Logout</Button>
    </div>
  );
};
