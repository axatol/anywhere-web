import { Button, Space, Typography } from "antd";
import { ReactNode } from "react";
import { useNavigate } from "react-router-dom";

import { Center } from "~/components/Center";

export const FullPageError = (props: {
  title: string;
  message?: string;
  children?: ReactNode;
}) => (
  <Center>
    <Space direction="vertical" align="center">
      <Typography.Title level={4}>{props.title}</Typography.Title>
      <Typography.Text>{props.message}</Typography.Text>
      {props.children}
    </Space>
  </Center>
);

export const GenericError = () => (
  <FullPageError title="Uh oh" message="Something went wrong 🤷‍♂️" />
);

export const NotFoundError = () => {
  const navigate = useNavigate();

  return (
    <FullPageError title="Uh oh" message="Are you lost?">
      <Button onClick={() => navigate({ pathname: "/" })}>Go home</Button>
    </FullPageError>
  );
};
