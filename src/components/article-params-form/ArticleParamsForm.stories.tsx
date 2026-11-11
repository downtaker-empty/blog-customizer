import { within, userEvent } from '@storybook/testing-library';

import { ArticleParamsForm } from './ArticleParamsForm';

import type { Meta, StoryObj } from '@storybook/react';

const meta: Meta<typeof ArticleParamsForm> = {
  title: 'Components/ArticleParamsForm',
  component: ArticleParamsForm,
  parameters: {
    layout: 'fullscreen',
  },
  tags: ['autodocs'],
};

export default meta;

type Story = StoryObj<typeof ArticleParamsForm>;

export const Default: Story = {};

export const Open: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const arrow = canvas.getByRole('button', {
      name: /открыть\/закрыть форму параметров/i,
    });
    await userEvent.click(arrow);
  },
};
