import React, { useState } from "react";
import ReactPlayer from "react-player";
import { useFilePicker } from "use-file-picker";
import FileUploader from "./FileUploader";

export default function SelectedVideoPlayer() {
  // TODO Here add new show video player after selecting file
  // by using URL.createObjectURL(file) and doesn't forget to revoke it.

  const [openFileSelector, { filesContent, loading, plainFiles }] =
    useFilePicker({
      readAs: "DataURL",
      multiple: false,
    });
  const [videoUrl, setVideoUrl] = useState("");

  //   if (loading) {
  //     return <div>Loading...</div>;
  //   }

  return videoUrl.length ? (
    <ReactPlayer url={videoUrl} controls />
  ) : (
    <FileUploader
      onFileSelect={(files) => {
        debugger;
        return setVideoUrl(URL.createObjectURL(files[0]));
      }}
    />
  );
}
