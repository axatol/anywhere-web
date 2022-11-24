import { CloudUploadOutlined, PlusOutlined } from "@ant-design/icons";
import {
  Button,
  Form,
  Image,
  Input,
  Space,
  Table,
  Tooltip,
  Typography,
} from "antd";
import { useState } from "react";
import { useAsyncFn } from "react-use";

import { YoutubeSearch } from "~/api/search";
import { Track } from "~/api/tracks";
import { CreateTrackModal } from "~/components/track/CreateTrackModal";
import { useAPI } from "~/contexts/APIProvider";
import { youtubeChannel, youtubeVideo } from "~/utils/link";

interface FormData {
  query: string;
}

export const TrackSearch = () => {
  const api = useAPI();
  const [form] = Form.useForm<FormData>();
  const [search, searchTracks] = useAsyncFn(api.tracks.search);
  const [create, createTrack] = useAsyncFn(api.tracks.create);
  const [selected, setSelected] = useState<YoutubeSearch>();

  const submit = (values: FormData) => {
    searchTracks(values.query);
  };

  const select = (value: YoutubeSearch) => {
    setSelected(value);
  };

  const complete = (track?: Track) => {
    console.log("completed track creation", track);
    setSelected(undefined);
  };

  return (
    <div style={{ padding: "16px", width: "100%" }}>
      <CreateTrackModal
        open={!!selected}
        data={{ search: selected }}
        onOk={complete}
        onCancel={() => setSelected(undefined)}
      />

      <div style={{ marginBottom: "24px" }}>
        <Typography.Text>Search using fuzzy text or a URL</Typography.Text>
      </div>

      <Form form={form} onFinish={submit}>
        <div style={{ display: "flex", width: "100%" }}>
          <Form.Item
            name="query"
            label="Search Query"
            required
            rules={[{ required: true }, { type: "string", min: 3 }]}
            style={{ flexGrow: 1 }}
          >
            <Input />
          </Form.Item>

          <Form.Item style={{ marginLeft: "16px" }}>
            <Button loading={search.loading} type="primary" htmlType="submit">
              Submit
            </Button>
          </Form.Item>
        </div>
      </Form>

      {search.error && (
        <Typography.Text type="danger">{search.error.message}</Typography.Text>
      )}

      <Table
        scroll={{ x: "auto" }}
        rowKey="video_id"
        columns={[
          {
            title: "Thumbnail",
            key: "thumbnail",
            render: (_, record) => (
              <Image
                style={{ maxWidth: 120, maxHeight: 70 }}
                src={record.thumbnail.url}
              />
            ),
          },
          {
            title: "Video Title",
            key: "title",
            render: (_, record) => (
              <Button
                type="link"
                href={youtubeVideo(record.video_id)}
                rel="noopener noreferrer"
                target="_blank"
              >
                {record.video_title}
              </Button>
            ),
          },
          {
            title: "Channel",
            key: "channel",
            render: (_, record) => (
              <Button
                type="link"
                href={youtubeChannel(record.channel_id)}
                rel="noopener noreferrer"
                target="_blank"
              >
                {record.channel_title}
              </Button>
            ),
          },
          {
            title: "Actions",
            key: "actions",
            fixed: "right",
            width: 100,
            render: (_, record) => (
              <Space direction="horizontal">
                <Tooltip title="Queue for import">
                  <Button shape="circle" icon={<PlusOutlined />} />
                </Tooltip>

                <Tooltip title="Begin import">
                  <Button
                    shape="circle"
                    icon={<CloudUploadOutlined />}
                    onClick={() => select(record)}
                  />
                </Tooltip>
              </Space>
            ),
          },
        ]}
        dataSource={search.value}
      />
    </div>
  );
};
