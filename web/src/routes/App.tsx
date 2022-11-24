import { RocketOutlined } from "@ant-design/icons";
import { withAuthenticationRequired } from "@auth0/auth0-react";
import { Avatar, Layout } from "antd";
import { Outlet } from "react-router-dom";

import { NavigationMenu } from "~/components/NavigationMenu";
import { NotificationDropdown } from "~/components/NotificationDropdown";
import { ProfileDropdown } from "~/components/track/ProfileDropdown";
import { config } from "~/config";

export const App = withAuthenticationRequired(() => (
  <Layout style={{ width: "100%", zIndex: config.zIndex.header }}>
    <Layout.Header
      style={{
        position: "sticky",
        top: 0,
        zIndex: config.zIndex.header,
        padding: "0 16px",
        display: "flex",
        alignItems: "center",
      }}
    >
      <Avatar icon={<RocketOutlined />} />

      <NavigationMenu style={{ height: "64px", flexGrow: 1 }} />

      {/* TODO sync status/history? */}
      {/* TODO trigger sync? */}

      <NotificationDropdown />

      <ProfileDropdown />
    </Layout.Header>

    <Layout.Content style={{ margin: "24px", backgroundColor: "white" }}>
      <Outlet />
    </Layout.Content>
  </Layout>
));
