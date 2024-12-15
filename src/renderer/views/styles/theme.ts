import type { ThemeObj } from '@/types/theme';
import { preload, getStore } from '@youliso/electronic/render';
import { baseTheme, darkTheme, lightTheme } from '@/cfg/theme';
import { css } from '@emotion/css';
import { setCssVariant } from '@/renderer/common/utils';

export let theme = await getStore<ThemeObj>('theme');

preload.on('theme-updated', async (themeSource) => {
  document.documentElement.setAttribute('theme', themeSource);
  theme = await getStore<ThemeObj>('theme');
  setCssVariant('--accent-color', theme.accentColor);
});

export const themeStyle = css`
  html[theme='dark'] {
    :root {
      --basic-color-a1: ${darkTheme.basicColor + 'a1'};
      --basic-color-60: ${darkTheme.basicColor + '60'};
      --basic-color: ${darkTheme.basicColor};
      --symbol-color: ${darkTheme.symbolColor};
      --label-color: #ffffff;
      --title-label-color: #3c3c4380;
      --secondary-label-color: #3c3c4360;
      --tertiary-label-color: #3c3c4330;
    }
  }

  html[theme='light'] {
    :root {
      --basic-color-a1: ${lightTheme.basicColor + 'a1'};
      --basic-color-60: ${lightTheme.basicColor + '60'};
      --basic-color: ${lightTheme.basicColor};
      --symbol-color: ${lightTheme.symbolColor};
      --label-color: #000000;
      --title-label-color: #3c3c4380;
      --secondary-label-color: #3c3c4360;
      --tertiary-label-color: #3c3c4330;

      --menu-bg-color: #e3e3e8;
    }
  }

  :root {
    --event-width: ${baseTheme.eventWidth}px;
    --head-height: ${baseTheme.headHeight}px;
    --accent-color: ${theme.accentColor};
    --white-color: #ffffff;
    --blue-color: #3b78d6;
    --pink-color: #dd4e7c;

    --size-xxxs: 12px;
    --size-xxs: 14px;
    --size-xs: 16px;
    --size-sm: 17px;
    --size-lg: 19px;
    --size-xl: 20px;
    --size-xxl: 21px;
    --size-xxxl: 30px;

    --size-radius-xs: 3px;
    --size-radius-sm: 6px;
  }
`;
