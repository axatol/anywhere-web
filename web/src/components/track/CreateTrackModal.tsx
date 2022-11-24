import { MinusOutlined, PlusOutlined } from "@ant-design/icons";
import {
  Button,
  Collapse,
  Form,
  Image,
  Input,
  Modal,
  ModalProps,
  Space,
  Upload,
} from "antd";
import { useState } from "react";

import { SearchMusicbrainzForm } from "./SearchMusicbrainzForm";

import { MusicbrainzReleaseSearch, YoutubeSearch } from "~/api/search";
import { Track } from "~/api/tracks";
import { coverartRelease, youtubeVideo } from "~/utils/link";

export interface CreateTrackDialogProps
  extends Omit<ModalProps, "children" | "onOk"> {
  data: { search?: YoutubeSearch; track?: Track };
  onOk: (track: Track) => void;
}

interface FormData {
  query: string;
  track: Track;
  metadata: { name: string; value: string }[];
}

export const CreateTrackModal = ({
  onOk,
  data,
  ...props
}: CreateTrackDialogProps) => {
  const [collapsed, setCollapsed] = useState(false);
  const [metadata, setMetadata] = useState<MusicbrainzReleaseSearch>();
  const [form] = Form.useForm<FormData>();

  const toggleCollapse = (...args: any) => {
    console.log("toggleCollapse", ...args);
    setCollapsed((state) => !state);
  };

  const select = (result: MusicbrainzReleaseSearch) => {
    console.log("selected", result);
    setCollapsed(false);
    setMetadata(result);
    form.setFields([
      {
        name: "title",
        value: result.title,
      },
      {
        name: "tags",
        value: result.tags?.map((tag) => tag.name).join(","),
      },
      {
        name: "artists",
        value: result["artist-credit"].map(({ artist }) => artist),
      },
      {
        name: "releases",
        value: result.releases,
      },
      {
        name: "metadata",
        value: [],
      },
    ]);
  };

  return (
    <Modal
      title="Create/update Track"
      width="100%"
      okButtonProps={{ onClick: form.submit }}
      {...props}
    >
      <Space direction="vertical" style={{ width: "100%" }} size="middle">
        <Collapse
          activeKey={[collapsed ? "musicbrainz" : "none"]}
          onChange={toggleCollapse}
        >
          <Collapse.Panel header="Search for metadata" key="musicbrainz">
            <SearchMusicbrainzForm
              initialSearch={data.search?.video_title ?? data.track?.name}
              onSelect={select}
            />
          </Collapse.Panel>
        </Collapse>

        <Form
          form={form}
          onFinish={({ track }) => onOk(track)}
          labelCol={{ span: 4 }}
          wrapperCol={{ span: 20 }}
        >
          <Form.Item
            label="Title"
            name="title"
            initialValue={data.search?.video_title ?? data.track?.name}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="URL"
            name="source_url"
            initialValue={
              data.search?.video_id
                ? youtubeVideo(data.search.video_id)
                : data.track?.source_url
            }
          >
            <Input />
          </Form.Item>

          <Form.Item label="Thumbnail">
            {metadata?.releases[0]?.id ? (
              <Image
                style={{ maxWidth: 200, maxHeight: 200 }}
                src={coverartRelease(metadata.releases[0].id)}
              />
            ) : (
              <Upload listType="picture-card">
                <div>
                  <PlusOutlined />
                  <div style={{ marginTop: 8 }}>Upload</div>
                </div>
              </Upload>
            )}
          </Form.Item>

          <Form.List name="artists">
            {(fields, { add, remove }, { errors }) => (
              <>
                {fields.map((field, i) => (
                  <Form.Item
                    key={field.key}
                    label={i === 0 ? "Artists" : undefined}
                    wrapperCol={i === 0 ? { offset: 0 } : { offset: 4 }}
                  >
                    <div className="h-spaced">
                      <Form.Item name={[field.name, "name"]} noStyle>
                        <Input placeholder="Name" />
                      </Form.Item>

                      <div>
                        <Button
                          shape="circle"
                          icon={<MinusOutlined />}
                          onClick={() => remove(field.name)}
                        />
                      </div>
                    </div>
                  </Form.Item>
                ))}

                <Form.ErrorList errors={errors} />

                <Form.Item wrapperCol={{ offset: 4, span: 20 }}>
                  <Button icon={<PlusOutlined />} type="dashed" onClick={add}>
                    Add artist
                  </Button>
                </Form.Item>
              </>
            )}
          </Form.List>

          <Form.List name="releases">
            {(fields, { add, remove }, { errors }) => (
              <>
                {fields.map((field, i) => (
                  <Form.Item
                    key={field.key}
                    label={i === 0 ? "Releases" : undefined}
                    wrapperCol={i === 0 ? { offset: 0 } : { offset: 4 }}
                  >
                    <div className="h-spaced">
                      <Form.Item name={[field.name, "title"]} noStyle>
                        <Input placeholder="Title" />
                      </Form.Item>

                      <div>
                        <Button
                          shape="circle"
                          icon={<MinusOutlined />}
                          onClick={() => remove(field.name)}
                        />
                      </div>
                    </div>
                  </Form.Item>
                ))}

                <Form.ErrorList errors={errors} />

                <Form.Item wrapperCol={{ offset: 4, span: 20 }}>
                  <Button icon={<PlusOutlined />} type="dashed" onClick={add}>
                    Add release
                  </Button>
                </Form.Item>
              </>
            )}
          </Form.List>

          <Form.List name="metadata">
            {(fields, { add, remove }, { errors }) => (
              <>
                {fields.map((field, i) => (
                  <Form.Item
                    key={field.key}
                    label={i === 0 ? "Metadata" : undefined}
                    wrapperCol={i === 0 ? { offset: 0 } : { offset: 4 }}
                  >
                    <div className="h-spaced">
                      <Form.Item name={[field.name, 0]} noStyle>
                        <Input placeholder="Name" />
                      </Form.Item>

                      <Form.Item name={[field.name, 1]} noStyle>
                        <Input placeholder="Value" />
                      </Form.Item>

                      <div>
                        <Button
                          shape="circle"
                          icon={<MinusOutlined />}
                          onClick={() => remove(field.name)}
                        />
                      </div>
                    </div>
                  </Form.Item>
                ))}

                <Form.ErrorList errors={errors} />

                <Form.Item wrapperCol={{ offset: 4, span: 20 }}>
                  <Button icon={<PlusOutlined />} type="dashed" onClick={add}>
                    Add field
                  </Button>
                </Form.Item>
              </>
            )}
          </Form.List>
        </Form>
      </Space>
    </Modal>
  );
};
