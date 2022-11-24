import { NotificationOutlined } from "@ant-design/icons";
import { Avatar, Dropdown } from "antd";

export const NotificationDropdown = () => (
  <Dropdown trigger={["click"]} menu={{ items: [] }}>
    <Avatar>
      <NotificationOutlined />
    </Avatar>
  </Dropdown>
);
