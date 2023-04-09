import { Meta, StoryObj } from "@storybook/react";
import ReactPlayer from "react-player";

export default {
  /* 👇 The title prop is optional.
   * See https://storybook.js.org/docs/react/configure/overview#configure-story-loading
   * to learn how to generate automatic titles
   */
  title: "Player",
  component: ReactPlayer,
} as Meta<typeof ReactPlayer>;

type Story = StoryObj<typeof ReactPlayer>;

export const Default: Story = {
  args: {
    url: "https://www.youtube.com/watch?v=ysz5S6PUM-U",
  },
  render: (args) => {
    return <ReactPlayer {...args} />;
  },
};
