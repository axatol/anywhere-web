import Icon, {
  CheckCircleOutlined,
  FileImageOutlined,
} from "@ant-design/icons";
import {
  Input,
  Button,
  Table,
  Form,
  Tag,
  Space,
  Tooltip,
  Descriptions,
  Popover,
} from "antd";
import { useAsyncFn } from "react-use";

import { MusicbrainzReleaseSearch } from "~/api/search";
import { MusicbrainzLogo } from "~/assets/MusicbrainzLogo";
import { Image } from "~/components/Image";
import { useAPI } from "~/contexts/APIProvider";
import {
  coverartRelease,
  musicbrainzArtist,
  musicbrainzRecording,
  musicbrainzRelease,
} from "~/utils/link";
import { Time } from "~/utils/time";

export interface MusicbrainzSearchProps {
  initialSearch?: string;
  onSelect: (result: MusicbrainzReleaseSearch) => void;
}

export const SearchMusicbrainzForm = (props: MusicbrainzSearchProps) => {
  const api = useAPI();
  const [metadata, searchMetadata] = useAsyncFn(api.tracks.metadata);
  const [form] = Form.useForm();

  return (
    <Form form={form}>
      <Space direction="vertical" style={{ width: "100%" }}>
        <div style={{ display: "flex" }}>
          <Form.Item
            name="query"
            label="Search term"
            initialValue={props.initialSearch}
            rules={[{ required: true }, { type: "string", min: 3 }]}
            style={{ flexGrow: 1 }}
          >
            <Input />
          </Form.Item>

          <Form.Item style={{ marginLeft: "16px" }}>
            <Button
              disabled={form.getFieldError("query").length > 0}
              loading={metadata.loading}
              type="primary"
              htmlType="submit"
              onClick={() => searchMetadata(form.getFieldValue("query"))}
              icon={<Icon component={MusicbrainzLogo} />}
            >
              Search
            </Button>
          </Form.Item>
        </div>

        <Table
          scroll={{ x: "auto" }}
          rowKey="id"
          dataSource={metadata.value}
          pagination={false}
          columns={[
            {
              title: "Thumbnail",
              key: "thumbnail",
              render: (_, record) =>
                record.releases?.length > 0 ? (
                  <Image
                    style={{ maxWidth: 120, maxHeight: 70 }}
                    src={coverartRelease(record.releases[0].id)}
                    size="small"
                  />
                ) : (
                  <FileImageOutlined />
                ),
            },
            {
              title: "Title",
              key: "title",
              render: (_, record) => (
                <Button
                  key={record.id}
                  href={musicbrainzRecording(record.id)}
                  rel="noopener noreferrer"
                  target="_blank"
                  type="link"
                >
                  {record.title}
                </Button>
              ),
            },
            { title: "Score", key: "score", dataIndex: "score" },
            {
              title: "Length",
              key: "length",
              dataIndex: "length",
              render: (value) => Time.fromEpoch(value / 1000).toDuration(),
            },
            {
              title: "Artist(s)",
              key: "artists",
              render: (_, record) => (
                <Space direction="vertical">
                  {record["artist-credit"].map(({ artist }) => (
                    <Button
                      key={artist.id}
                      href={musicbrainzArtist(artist.id)}
                      rel="noopener noreferrer"
                      target="_blank"
                      type="link"
                    >
                      {artist.name}
                    </Button>
                  ))}
                </Space>
              ),
            },
            {
              title: "Actions",
              key: "actions",
              fixed: "right",
              width: 100,
              render: (_, record) => (
                <Tooltip title="Select this recording">
                  <Button
                    shape="circle"
                    icon={<CheckCircleOutlined />}
                    onClick={() => props.onSelect(record)}
                  />
                </Tooltip>
              ),
            },
          ]}
          expandable={{
            expandedRowRender: (record) => (
              <Descriptions bordered size="small" column={1}>
                <Descriptions.Item label="Releases">
                  <Space direction="vertical">
                    {record.releases.map((release) => (
                      <Popover
                        key={release.id}
                        content={
                          <div
                            style={{ display: "flex", flexDirection: "column" }}
                          >
                            <Image
                              src={coverartRelease(release.id)}
                              style={{ maxWidth: 250, maxHeight: 250 }}
                            />
                          </div>
                        }
                      >
                        <Button
                          href={musicbrainzRelease(release.id)}
                          rel="noopener noreferrer"
                          target="_blank"
                          type="link"
                        >
                          {release.title}
                          {release.country && ` (${release.country})`}
                        </Button>
                      </Popover>
                    ))}
                  </Space>
                </Descriptions.Item>
                {record.tags && (
                  <Descriptions.Item label="Tags">
                    <Space direction="vertical">
                      {record.tags.map((tag) => (
                        <Tag key={tag.name}>{tag.name}</Tag>
                      ))}
                    </Space>
                  </Descriptions.Item>
                )}
              </Descriptions>
            ),
          }}
        />
      </Space>
    </Form>
  );
};
