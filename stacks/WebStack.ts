import { StackContext, ViteStaticSite } from "@serverless-stack/resources";

export function WebStack({ stack }: StackContext) {
  new ViteStaticSite(stack, "site", {
    path: "web",
  });
}
