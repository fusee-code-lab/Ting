import type { ThemeObj } from '@/types/theme';
import { preload, getStore } from '@youliso/electronic/render';
import { darkTheme, lightTheme } from '@/cfg/theme';
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
      --basic-color: ${darkTheme.basicColor};
      --symbol-color: ${darkTheme.symbolColor};
      --label-color: #ffffff;
      --secondary-label-color: #3c3c4360;
      --tertiary-label-color: #3c3c4330;
    }
  }

  html[theme='light'] {
    :root {
      --basic-color-a1: ${lightTheme.basicColor + 'a1'};
      --basic-color: ${lightTheme.basicColor};
      --symbol-color: ${lightTheme.symbolColor};
      --label-color: #000000;
      --secondary-label-color: #3c3c4360;
      --tertiary-label-color: #3c3c4330;
    }
  }

  :root {
    --accent-color: ${theme.accentColor};
    --white-color: #ffffff;
    --blue-color: #3b78d6;
    --pink-color: #dd4e7c;

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
