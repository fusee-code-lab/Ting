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
    }
  }

  html[theme='light'] {
    :root {
      --basic-color: ${lightTheme.basicColor};
      --symbol-color: ${lightTheme.symbolColor};
    }
  }

  :root {
    --accent-color: ${theme.accentColor};
  }
`;
