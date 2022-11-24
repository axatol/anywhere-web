import { List } from "antd";

import { Artist } from "~/api/artists";
import { useData } from "~/contexts/DataProvider";

export const AlbumList = () => {
  const { albums } = useData();

  return (
    <div style={{ padding: "16px" }}>
      <List<Artist>
        loading={albums.loading}
        dataSource={Array(50)
          .fill(0)
          .map((_, i) => ({
            id: `${i}`,
            name: `artist ${i}`,
            created_at: 1668250221,
            updated_at: 1668250221,
          }))}
        renderItem={(item) => (
          <List.Item>
            <List.Item.Meta title={item.name} />
          </List.Item>
        )}
      />
    </div>
  );
};
