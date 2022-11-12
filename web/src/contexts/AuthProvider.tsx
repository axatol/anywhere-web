import {
  Auth0Provider,
  withAuthenticationRequired,
  WithAuthenticationRequiredOptions,
} from "@auth0/auth0-react";
import { ComponentType, PropsWithChildren } from "react";
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
      onRedirectCallback={(state) => navigate(state?.returnTo ?? "/")}
    >
      {props.children}
    </Auth0Provider>
  );
};

export const ProtectedRoute = (
  props: { component: ComponentType } & WithAuthenticationRequiredOptions
) => {
  const { component, ...args } = props;
  const Component = withAuthenticationRequired(component, args);
  return <Component />;
};
