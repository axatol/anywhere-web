import { UserOutlined, LogoutOutlined } from "@ant-design/icons";
import { useAuth0 } from "@auth0/auth0-react";
import { Dropdown, Avatar, Button } from "antd";
import { Link } from "react-router-dom";

export const ProfileDropdown = () => {
  const { isAuthenticated, user, logout } = useAuth0();

  return (
    <Dropdown
      trigger={["click"]}
      menu={{
        items: [
          {
            key: "profile",
            label: (
              <Link to="/profile">
                <Button type="link">
                  <UserOutlined /> Profile
                </Button>
              </Link>
            ),
          },
          { type: "divider" },
          {
            key: "logout",
            label: (
              <Button type="link" onClick={() => logout()}>
                <LogoutOutlined /> Logout
              </Button>
            ),
          },
        ],
      }}
    >
      {isAuthenticated && <Avatar src={user?.picture}>{user?.nickname}</Avatar>}
    </Dropdown>
  );
};
