import { baseTheme, Theme } from '@/cfg/theme';
import { ThemeObj } from '@/types/theme';
import { preload, storeInstance, windowInstance } from '@youliso/electronic/main';
import { nativeTheme, systemPreferences } from 'electron';
import { debounce } from './tools';

// TODO 暗黑模式待完善，先支持完正常样式
export const getThemeSource = () => 'light' as 'light';
// nativeTheme.themeSource === 'system'
//   ? nativeTheme.shouldUseDarkColors
//     ? 'dark'
//     : 'light'
//   : nativeTheme.themeSource;

export const theme = () => storeInstance.get<ThemeObj>('theme')!;
export const themeRefresh = () => {
  const themeObj = {
    ...Theme(getThemeSource()),
    accentColor: ''
  };
  if (process.platform !== 'linux') {
    themeObj.accentColor = `#${systemPreferences.getAccentColor()}`;
  }
  storeInstance.set('theme', themeObj);
};
export const themeOn = () => {
  // 系统主题发生变化监听并发给渲染进程
  nativeTheme.on(
    'updated',
    debounce(() => {
      themeRefresh();
      const wins = windowInstance.getAll();
      wins.forEach((win) => {
        win.setTitleBarOverlay({
          color: theme().basicColor,
          symbolColor: theme().symbolColor,
          height: baseTheme.headHeight
        });
      });
      preload.send('theme-updated', getThemeSource());
    }, 1000)
  );
  // 获取系统主题
  preload.handle('theme-source-get', () => getThemeSource());
};
