import { app, type BrowserWindowConstructorOptions } from 'electron';
import type { Customize } from '@youliso/electronic/types';
import { join } from 'node:path';
import { baseTheme } from '@/cfg/theme';
import { theme } from './theme';
import { preload, type WindowDefaultCfg, windowInstance } from '@youliso/electronic/main';
import { insert_basic_setting, select_basic_setting } from './db/modular/basic';
import { createTray } from './tray';

// 初始窗口组参数
let windowDefaultCfg: WindowDefaultCfg = {
  defaultLoadType: 'file',
  defaultUrl: join(__dirname, 'index.html'),
  defaultPreload: join(__dirname, 'preload.js')
};

// 调试模式
if (!app.isPackaged) {
  windowDefaultCfg.defaultLoadType = 'url';
  windowDefaultCfg.defaultUrl = `http://localhost:${process.env.PORT}`;
}

windowInstance.setDefaultCfg(windowDefaultCfg);

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
    route: '/home',
    isMainWin: true
  };
  let browserWindowOptions: BrowserWindowConstructorOptions = createOpts({
    minWidth: 1004,
    minHeight: 680,
    width: 1004,
    height: 680
  });
  return windowInstance.new(customize, browserWindowOptions);
};




export const createDialog = (route: string) => {
  let customize: Customize = {
    route,
    isOneWindow: true
  };
  let browserWindowOptions: BrowserWindowConstructorOptions = createOpts({
    minWidth: 345,
    minHeight: 200,
    width: 345,
    height: 200
  });
  browserWindowOptions.titleBarOverlay = false;
  return windowInstance.new(customize, browserWindowOptions);
};

export const windowInit = () => {
  const is = select_basic_setting<number | undefined>('is_first');
  if (is == 1) {
    createHome();
    createTray();
  } else {
    createWelcome();
  }
};

export const windowOn = () => {
  preload.on('window-first', async (e) => {
    const win = windowInstance.get(e.sender.id);
    win?.hide();
    insert_basic_setting([{ key: 'is_first', data: 1 }]);
    await createHome();
    win?.destroy();
  });

  preload.on('window-dialog', (_, route) => { createDialog(route) })
};
