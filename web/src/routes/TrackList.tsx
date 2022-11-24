import { List, Space } from "antd";

import { Track, TrackStatus } from "~/api/tracks";
import { ArtistTag } from "~/components/artist/ArtistTag";
import { TimeTag } from "~/components/TimeTag";
import { TrackStatusIcon } from "~/components/track/TrackStatusIcon";
import { useData } from "~/contexts/DataProvider";

export const TrackList = () => {
  const { tracks } = useData();

  return (
    <div style={{ padding: "16px" }}>
      <List<Track>
        loading={tracks.loading}
        dataSource={Array(50)
          .fill(0)
          .map((_, i) => ({
            id: `${i}`,
            source_url: "http://goo.com",
            name: `foo ${i}`,
            track_status: TrackStatus.Unknown,
            artist_ids: ["1", "2", "3"],
            duration: 123,
            accessed_at: 0,
            created_at: 1668250221,
            updated_at: 1668250221,
          }))}
        renderItem={(item) => (
          <List.Item>
            <List.Item.Meta
              avatar={<TrackStatusIcon status={item.track_status} />}
              title={item.name}
              description={
                <Space>
                  {item.duration && <TimeTag epoch={item.duration} />}
                  {item.artist_ids?.map((id) => (
                    <ArtistTag key={id} id={id} />
                  ))}
                </Space>
              }
            />
          </List.Item>
        )}
      />
    </div>
  );
};
