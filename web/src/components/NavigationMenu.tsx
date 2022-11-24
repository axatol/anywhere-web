import { Menu, MenuProps } from "antd";
import { useState } from "react";
import { Link } from "react-router-dom";

export const NavigationMenu = (props: MenuProps) => {
  const [selected, setSelected] = useState("tracks");

  return (
    <Menu
      theme="dark"
      mode="horizontal"
      selectedKeys={[selected]}
      onSelect={({ key }) => setSelected(key)}
      items={[
        { key: "tracks", label: <Link to="/tracks">Tracks</Link> },
        { key: "artists", label: <Link to="/artists">Artists</Link> },
        { key: "search", label: <Link to="/search">Search</Link> },
      ]}
      {...props}
    />
  );
};
