import { Meta, StoryObj } from "@storybook/react";
import { createEvent, fireEvent, within } from "@storybook/testing-library";
import SelectedVideoPlayer from "./SelectedVideoPlayer";

const fetchDataTransfer = async (url: string) => {
  try {
    const response = await fetch(url);
    const blob = await response.blob();
    const dataTransfer = new DataTransfer();
    const file = new File([blob], "video", { type: "video/mp4" });
    dataTransfer.items.add(file);

    // Display the video player by using the drop file event to provide a file.
    const dragEventInit = {
      dataTransfer, // pass the DataTransfer object as the dataTransfer property
      bubbles: true,
      cancelable: true,
    };
    const dragEvent = new DragEvent("drop", dragEventInit);
    return dragEvent;
  } catch (error) {
    console.error(error);
    return null;
  }
};

export default {
  /* 👇 The title prop is optional.
   * See https://storybook.js.org/docs/react/configure/overview#configure-story-loading
   * to learn how to generate automatic titles
   */
  title: "SelectedVideoPlayer",
  component: SelectedVideoPlayer,
} as Meta<typeof SelectedVideoPlayer>;

type Story = StoryObj<typeof SelectedVideoPlayer>;

export const Default: Story = {
  args: {},
  loaders: [
    async () => {
      const dragEvent = await fetchDataTransfer("test.mp4");
      return { dragEvent };
    },
  ],
  render: (args) => {
    return <SelectedVideoPlayer />;
  },
};

export const WithVideo: Story = {
  ...Default,
  play: async ({ canvasElement, loaded: { dragEvent } }) => {
    const canvas = within(canvasElement);
    const fileUploader = canvas.getByText(/drop/);
    if (!dragEvent) return;

    createEvent.drop(fileUploader, dragEvent);

    fireEvent(fileUploader, dragEvent);
  },
};
