import { type Customize } from '@youliso/electronic/types';
import { app, type BrowserWindowConstructorOptions } from 'electron';
import { baseTheme } from '@/cfg/theme';
import { theme } from './theme';
import { windowInstance } from '@youliso/electronic/main';

// 初始窗口参数
const createOpts = (browserWindowOptions: BrowserWindowConstructorOptions) => {
  browserWindowOptions = Object.assign(
    {
      show: false,
      webPreferences: {
        devTools: !app.isPackaged
      }
    },
    browserWindowOptions
  );
  if (process.platform === 'darwin') {
    browserWindowOptions.titleBarStyle = 'hidden';
    browserWindowOptions.trafficLightPosition = { x: 10, y: 10 };
  } else {
    browserWindowOptions.titleBarStyle = 'hidden';
    browserWindowOptions.titleBarOverlay = {
      color: '#00000000',
      symbolColor: theme().symbolColor,
      height: baseTheme.headHeight
    };
  }
  return browserWindowOptions;
};

export const createWelcome = () => {
  let customize: Customize = {
    route: '/welcome'
  };
  let browserWindowOptions: BrowserWindowConstructorOptions = createOpts({
    width: 650,
    height: 430,
    resizable: false
  });
  if (typeof browserWindowOptions.titleBarOverlay === 'object') {
    browserWindowOptions.titleBarOverlay.symbolColor = '#ffffff';
  }
  windowInstance.new(customize, browserWindowOptions);
};



export const createHome = () => {
  let customize: Customize = {
    route: '/home'
  };
  let browserWindowOptions: BrowserWindowConstructorOptions = createOpts({
    width: 940,
    height: 650,
    show: true
  });
  windowInstance.new(customize, browserWindowOptions);
};
