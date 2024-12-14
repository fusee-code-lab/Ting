import {
  type WindowDefaultCfg,
  machineOn,
  appAfterOn,
  appSingleInstanceLock,
  appProtocolRegister,
  storeInstance,
  shortcutInstance,
  windowInstance,
  preload
} from '@youliso/electronic/main';
import { join } from 'node:path';
import { app } from 'electron';
import { resourcesOn } from './modular/resources';
import { defaultSessionInit, sessionOn } from './modular/session';
import { themeOn, themeRefresh } from './modular/theme';
import { musicApiOn } from './modular/musicapi';
import { createWelcome } from './modular/windows';

preload.initialize();

themeRefresh();

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

// 单例
appSingleInstanceLock({
  secondInstanceFunc: (_, argv) => {
    //多窗口聚焦到第一实例
    const main = windowInstance.getMain();
    if (main) {
      preload.send('window-single-instance', argv, [main.id]);
    }
  }
});

// 注册协议
appProtocolRegister();

// 关闭所有窗口退出
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit();
});

app.whenReady().then(async () => {
  app.on('activate', () => {
    const mainWin = windowInstance.getMain();
    if (mainWin) {
      mainWin.show();
    }
  });
  // 获得焦点时发出
  app.on('browser-window-focus', () => {
    // 关闭刷新
    shortcutInstance.register({
      name: '关闭刷新',
      key: 'CommandOrControl+R'
    });
  });
  // 失去焦点时发出
  app.on('browser-window-blur', () => {
    // 注销关闭刷新
    shortcutInstance.unregister('CommandOrControl+R');
  });

  defaultSessionInit();

  // 应用基础监听
  themeOn();
  appAfterOn();

  // 模块监听
  sessionOn();
  machineOn();
  resourcesOn();
  storeInstance.on();
  windowInstance.on();
  shortcutInstance.on();

  musicApiOn();

  createWelcome();
});
