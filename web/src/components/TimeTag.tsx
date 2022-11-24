import { Tag } from "antd";
import { useMemo } from "react";

import { Time } from "~/utils/time";

export const TimeTag = (props: { epoch: number }) => {
  const time = useMemo(
    () => Time.fromEpoch(props.epoch).toDuration(),
    [props.epoch],
  );

  return <Tag>{time}</Tag>;
};
