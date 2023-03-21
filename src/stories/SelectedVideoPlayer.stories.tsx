import { Meta, StoryObj } from '@storybook/react';
import SelectedVideoPlayer from './SelectedVideoPlayer';


export default {
    /* 👇 The title prop is optional.
    * See https://storybook.js.org/docs/react/configure/overview#configure-story-loading
    * to learn how to generate automatic titles
    */
    title: 'SelectedVideoPlayer',
    component: SelectedVideoPlayer,
} as Meta<typeof SelectedVideoPlayer>

type Story = StoryObj<typeof SelectedVideoPlayer>

export const Default: Story = {
    args: {},
    render: (args) => {
        return <SelectedVideoPlayer />
    }
}



