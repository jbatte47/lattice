import type { Preview } from '@storybook/react';
import React, { useEffect } from 'react';
import { applyTheme } from '../src/theme/applyTheme';
import { defaultTheme } from '../src/theme/defaultTheme';
import '../src/stories/storybook.css';

const ThemeDecorator = (Story: React.ComponentType) => {
  useEffect(() => {
    applyTheme(defaultTheme);
  }, []);

  return <Story />;
};

const preview: Preview = {
  decorators: [ThemeDecorator],
  parameters: {
    controls: { expanded: true },
    layout: 'fullscreen',
  },
};

export default preview;
