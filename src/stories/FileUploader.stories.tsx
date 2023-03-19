
import type { Meta, StoryObj } from '@storybook/react';

import FileUploader from './FileUploader';

const meta: Meta<typeof FileUploader> = {
    component: FileUploader,
    parameters: {
        // More on how to position stories at: https://storybook.js.org/docs/7.0/react/configure/story-layout
        layout: 'fullscreen',
    },
};

export default meta;
type Story = StoryObj<typeof FileUploader>;

export const Default: Story = {};
