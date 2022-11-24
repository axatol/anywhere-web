const assertEnv = (key: string) => {
  const value = import.meta.env[key];
  if (!value) {
    throw new Error(`${key} is not defined`);
  }

  return value;
};

export const config = {
  debug: import.meta.env.DEV,

  api: {
    endpoint: assertEnv("VITE_API_ENDPOINT"),
  },

  auth: {
    clientID: assertEnv("VITE_CLIENT_ID"),
    domain: assertEnv("VITE_DOMAIN"),
    responseType: assertEnv("VITE_RESPONSE_TYPE"),
    audience: assertEnv("VITE_AUDIENCE"),
    redirectURI: assertEnv("VITE_REDIRECT_URI"),
    scope: assertEnv("VITE_SCOPE"),
  },

  zIndex: {
    neutral: 0,
    header: 20,
  },
};
