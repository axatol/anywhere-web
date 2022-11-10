import { Button, Space } from "antd";
import { ReactNode } from "react";
import { useNavigate } from "react-router-dom";
import { Center } from "~/components/Center";

export const FullPageError = (props: {
  title: string;
  message?: string;
  children?: ReactNode;
}) => (
  <Center>
    <Space direction="vertical">
      {props.title}
      {props.message}
      {props.children}
    </Space>
  </Center>
);

export const NotFoundError = () => {
  const navigate = useNavigate();

  return (
    <FullPageError title="Uh oh" message="Are you lost?">
      <Button onClick={() => navigate({ pathname: "/home" })}> Go home</Button>
    </FullPageError>
  );
};
