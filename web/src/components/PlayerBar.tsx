import { presetDarkPalettes } from "@ant-design/colors";
import {
  PauseCircleOutlined,
  PlayCircleOutlined,
  StepBackwardOutlined,
  StepForwardOutlined,
} from "@ant-design/icons";
import { Button, Slider } from "antd";

import { usePlayer } from "~/contexts/PlayerProvider";

export const PlayerBar = () => {
  const player = usePlayer();
  const disabled = player.queue.length < 1;

  return (
    <div
      style={{
        display: "flex",
        width: "100%",
        padding: "16px",
        backgroundColor: presetDarkPalettes.geekblue[1],
      }}
    >
      <Button
        disabled={disabled}
        shape="circle"
        style={{ marginRight: "10px" }}
      >
        <StepBackwardOutlined />
      </Button>

      <Button
        disabled={disabled}
        shape="circle"
        type="primary"
        style={{ marginRight: "10px" }}
        icon={player.playing ? <PauseCircleOutlined /> : <PlayCircleOutlined />}
        onClick={player.togglePlaying}
      />

      <Button
        disabled={disabled}
        shape="circle"
        style={{ marginRight: "10px" }}
      >
        <StepForwardOutlined />
      </Button>

      <div style={{ flexGrow: 1 }}>
        <Slider trackStyle={{ color: "green" }} />
      </div>
    </div>
  );
};
