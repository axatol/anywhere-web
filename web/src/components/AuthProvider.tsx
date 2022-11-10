import { Auth0Provider } from "@auth0/auth0-react";
import { PropsWithChildren } from "react";
import { useNavigate } from "react-router-dom";
import { config } from "~/config";

export const AuthProvider = (props: PropsWithChildren<{}>) => {
  const navigate = useNavigate();

  return (
    <Auth0Provider
      clientId={config.auth.clientID}
      domain={config.auth.domain}
      audience={config.auth.audience}
      redirectUri={config.auth.redirectURI}
      onRedirectCallback={(state) =>
        navigate(state?.returnTo ?? window.location.pathname)
      }
    >
      {props.children}
    </Auth0Provider>
  );
};
