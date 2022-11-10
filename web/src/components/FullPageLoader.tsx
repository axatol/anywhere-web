import { Spin, SpinProps } from "antd";
import { Center } from "~/components/Center";

export const FullPageLoader = (props: SpinProps) => (
  <Center>
    <Spin {...props} />
  </Center>
);
