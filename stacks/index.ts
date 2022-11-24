import { App } from "@serverless-stack/resources";

import { WebStack } from "./WebStack";

export default function (app: App) {
  app.setDefaultFunctionProps({
    runtime: "nodejs16.x",
    srcPath: "services",
    bundle: {
      format: "esm",
    },
  });

  app.stack(WebStack);
}
