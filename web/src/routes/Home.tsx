import { withAuthenticationRequired } from "@auth0/auth0-react";

export const Home = withAuthenticationRequired(() => {
  return <div id="home">hello</div>;
});
