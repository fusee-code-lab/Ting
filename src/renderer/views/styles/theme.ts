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
      --basic-color: ${darkTheme.basicColor};
      --symbol-color: ${darkTheme.symbolColor};
      --label-color: #ffffff;
      --secondary-label-color: #3C3C4360;
      --tertiary-label-color: #3C3C4330;
    }
  }

  html[theme='light'] {
    :root {
      --basic-color: ${lightTheme.basicColor};
      --symbol-color: ${lightTheme.symbolColor};
      --label-color: #000000;
      --secondary-label-color: #3C3C4360;
      --tertiary-label-color: #3C3C4330;
    }
  }

  :root {
    --accent-color: ${theme.accentColor};
    --white-color: #ffffff;
    --blue-color: #3B78D6;
    --pink-color: #DD4E7C;
  }
`;
