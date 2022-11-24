import {
  CheckCircleOutlined,
  ClockCircleOutlined,
  ExclamationCircleOutlined,
  QuestionCircleOutlined,
} from "@ant-design/icons";

import { TrackStatus } from "~/api/tracks";

export const TrackStatusIcon = (props: { status?: TrackStatus }) =>
  props.status === TrackStatus.Invalid ? (
    <ExclamationCircleOutlined />
  ) : props.status === TrackStatus.Ready ? (
    <CheckCircleOutlined />
  ) : props.status === TrackStatus.Pending ? (
    <ClockCircleOutlined />
  ) : (
    <QuestionCircleOutlined />
  );
