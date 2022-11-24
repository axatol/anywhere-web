import { Tag } from "antd";
import { useMemo } from "react";

import { useData } from "~/contexts/DataProvider";

export const ArtistTag = (props: { id: string }) => {
  const { artists } = useData();
  const artist = useMemo(
    () => artists.value?.find((artist) => artist.id === props.id),
    [artists],
  );

  return <Tag>{artist?.name ?? "Unknown"}</Tag>;
};
