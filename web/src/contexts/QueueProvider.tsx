import { PropsWithChildren } from "react";

export const QueueProvider = (props: PropsWithChildren<{}>) => (
  <>{props.children}</>
);
