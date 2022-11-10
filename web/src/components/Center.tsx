import { HTMLAttributes } from "react";

export const Center = (props: HTMLAttributes<HTMLDivElement>) => (
  <div
    {...props}
    style={{
      height: "100%",
      width: "100%",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      ...props.style,
    }}
  />
);
