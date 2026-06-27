import React from "react";
import { AudioPlayer, Toast } from '@discuzq/design';

export default function FlexExample() {
  const onDownload = () => {
    Toast.success({
      content: "下载成功",
    });
  };

  return (
    <div>
      <AudioPlayer
        src={"https://mp32.9ku.com/upload/128/2020/07/03/1006548.mp3"}
        fileName="飞鸟和蝉"
        onDownload={() => onDownload()}
      />
    </div>
  );
}
