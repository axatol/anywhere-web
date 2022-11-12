import { useAuth0 } from "@auth0/auth0-react";
import { createContext, PropsWithChildren, useContext, useMemo } from "react";
import {
  APIEndpoints,
  APIInstance,
  createAPI,
  createEndpoints,
} from "~/utils/api";

const context = createContext<
  ({ instance: APIInstance } & APIEndpoints) | undefined
>(undefined);

export const useAPI = () => {
  const value = useContext(context);
  if (!value) {
    throw new Error(`API context consumer must have a matching provider`);
  }

  return value;
};

export const APIProvider = (props: PropsWithChildren<{}>) => {
  const { isAuthenticated, getAccessTokenSilently } = useAuth0();

  const value = useMemo(() => {
    const instance = createAPI(() => getAccessTokenSilently());
    const endpoints = createEndpoints(instance);
    return { instance, ...endpoints };
  }, [isAuthenticated]);

  return <context.Provider value={value}>{props.children}</context.Provider>;
};
