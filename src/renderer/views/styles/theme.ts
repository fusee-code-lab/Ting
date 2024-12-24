import type { ThemeObj } from '@/types/theme';
import { preload, getStore } from '@youliso/electronic/render';
import { baseTheme, darkTheme, lightTheme } from '@/cfg/theme';
import { setCssVariant } from '@/renderer/common/utils';
import { injectGlobal } from '@emotion/css';
import { OS } from '@/renderer/store';

export let theme = await getStore<ThemeObj>('theme');
const genericHeadHeight = OS !== 'mac' ? baseTheme.headHeight : 40;

preload.on('theme-updated', async (themeSource) => {
  document.documentElement.setAttribute('theme', themeSource);
  theme = await getStore<ThemeObj>('theme');
  setCssVariant('--accent-color', theme.accentColor);
});

injectGlobal`
  :root[theme='dark'] {
      --basic-color-a1: ${darkTheme.basicColor + 'a1'};
      --basic-color-60: ${darkTheme.basicColor + '60'};
      --basic-color: ${darkTheme.basicColor};
      --symbol-color: ${darkTheme.symbolColor};

      --label-color: #ffffff;
      --title-label-color: #ffffff80;
      --secondary-label-color: #ffffff60;
      --tertiary-label-color: #ffffff30;

      --menu-bg-color: #252525;
  }

  :root[theme='light'] {
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

  :root {
    --event-width: ${baseTheme.eventWidth}px;
    --head-height: ${genericHeadHeight}px;
    --menu-width: ${baseTheme.menuWidth}px;
    --audio-height: ${baseTheme.audioHeight}px;

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

    --size-radius-xxs: 2px;
    --size-radius-xs: 3px;
    --size-radius-sm: 6px;
    --size-radius-md: 8px;
    --size-radius-lg: 9px;
  }
`;
