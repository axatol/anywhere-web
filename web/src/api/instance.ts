import ky from "ky";

import { config } from "~/config";

export type APIInstance = ReturnType<typeof ky.create>;

export type APIResponse<T = any> = { message: string; data: T };

export const unwrap = async <T>(response: APIResponse<T>) => response.data;

export const createAPI = (token: () => Promise<string>) =>
  ky.create({
    hooks: {
      beforeRequest: [
        async (req) => {
          req.headers.set("Authorization", `Bearer ${await token()}`);
          req.headers.set("X-Timestamp", `${Date.now()}`);
          return req;
        },
      ],
      afterResponse: [
        async (req, _, res) => {
          if (config.debug) {
            console.log({
              method: req.method,
              path: req.url,
              status: res.status,
              body: await res.json(),
            });
          }
        },
      ],
    },
  });
