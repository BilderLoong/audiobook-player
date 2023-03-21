import React from "react";
// import Image from 'next/image'
// import { parseSync } from 'subtitle'
import { useFilePicker } from "use-file-picker";

function stopEvent(e: React.UIEvent) {
  e.stopPropagation();
  e.preventDefault();
}

// TODO: Test on file drop.
export default function FileUploader({
  onFileSelect,
}: {
  onFileSelect: (fileList: FileList) => void;
}) {
  const [openFileSelector, { plainFiles, errors, loading }] = useFilePicker({});

  const handleInputOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files) {
      onFileSelect(files);
    }
  };

  const handleDropFile = async (e: React.DragEvent<HTMLElement>) => {
    stopEvent(e);

    const files = e.dataTransfer.files;
    if (files) {
      onFileSelect(files);
    }

    // It seems that the stream version parser doesn't Web API.
    // So choose the sync parser.
    // TODO move this to subtitle viewer.
    // const node = parseSync(await file.text())
    // node.map(e => {
    //     if (e.type === 'header') {
    //         return e.data
    //     }

    //     return e.data.text
    // })
  };

  return (
    <section
      onDrop={handleDropFile}
      onDragOver={stopEvent}
      onDragEnter={stopEvent}
      className="bg-slate-500"
    >
      <input
        onChange={handleInputOnChange}
        onClick={openFileSelector}
        type="file"
        id="input"
        accept=".srt,.vtt,.mp4,.avi,.mov,.mp3,.wav,.mkv,.flv,.wmv,.m4a,.m4v,.3gp,.aac,.ac3,.flac,.ogg,.opus,.webm"
        multiple
      />
    </section>
  );
}
