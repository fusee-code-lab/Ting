import { resolve } from 'path';
import { app, globalShortcut, ipcMain } from 'electron';
import { logOn } from './modular/log';
import { fileOn } from './modular/file';
import { Session } from './modular/session';
import { Window } from './modular/window';
import { Menus } from './modular/menu';
import Global from './modular/global';
import { musicApiOn, appStartCfg } from '@/main/modular/musicapi';

class Init {
  private menus = new Menus();
  private window = new Window();
  private session = new Session();

  constructor() {
  }

  /**
   * 初始化并加载
   * */
  async init() {
    //协议调起
    let args = [];
    if (!app.isPackaged) args.push(resolve(process.argv[1]));
    args.push('--');
    if (!app.isDefaultProtocolClient(app.name, process.execPath, args)) app.setAsDefaultProtocolClient(app.name, process.execPath, args);
    app.allowRendererProcessReuse = true;
    //重复启动
    if (!app.requestSingleInstanceLock()) {
      app.quit();
    } else {
      app.on('second-instance', () => {
        // 当运行第二个实例时,将会聚焦到main窗口
        if (this.window.main) {
          if (this.window.main.isMinimized()) this.window.main.restore();
          this.window.main.focus();
        }
      });
    }
    //关闭所有窗口退出
    app.on('window-all-closed', () => {
      if (process.platform !== 'darwin') {
        app.quit();
      }
    });
    app.on('activate', () => {
      if (this.window.getAllWindows().length === 0) {
        this.window.createWindow({ isMainWin: true });
      }
    });
    //获得焦点时发出
    app.on('browser-window-focus', () => {
      //关闭刷新
      globalShortcut.register('CommandOrControl+R', () => {
      });
    });
    //失去焦点时发出
    app.on('browser-window-blur', () => {
      // 注销关闭刷新
      globalShortcut.unregister('CommandOrControl+R');
    });
    //app重启
    ipcMain.on('app-relaunch', () => {
      app.relaunch({ args: process.argv.slice(1) });
    });
    //启动
    await Promise.all([Global.init(), app.whenReady()]);
    //模块、创建窗口、托盘
    await this.modular();
    this.window.createWindow({ isMainWin: true });
    this.window.createTray();
  }

  /**
   * 模块
   * */
  async modular() {
    //开启模块监听
    logOn();
    fileOn();
    this.menus.on();
    this.window.on();
    this.session.on();

    //ting
    musicApiOn();
    await appStartCfg();
  }
}

/**
 * 启动
 * */
new Init().init().then();