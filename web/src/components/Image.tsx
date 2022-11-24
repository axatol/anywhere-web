import { FileImageOutlined } from "@ant-design/icons";
import {
  Empty,
  Image as AntdImage,
  ImageProps as AntdImageProps,
  Skeleton,
} from "antd";
import { useState } from "react";

export interface ImageProps extends AntdImageProps {
  size?: "small" | "unbounded";
}

export const Image = ({ size, ...props }: ImageProps) => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  return (
    <>
      {loading && !error && <Skeleton.Image style={props.style} active />}

      {error &&
        (size === "small" ? (
          <FileImageOutlined />
        ) : (
          <Empty style={props.style} />
        ))}

      <AntdImage
        {...props}
        style={{
          ...props.style,
          height: loading ? 0 : props.style?.height,
          display: error ? "none" : undefined,
        }}
        onLoad={() => setLoading(false)}
        onError={() => setError(true)}
      />
    </>
  );
};
