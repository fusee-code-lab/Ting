import { app, Menu, nativeImage, Tray } from 'electron';
import { join } from 'node:path';
import { windowInstance } from '@youliso/electronic/main';

import trayLogo from '@/assets/tray.png';

// 创建托盘
export const createTray = () => {
  const tray = new Tray(nativeImage.createFromPath(join(__dirname, trayLogo)));
  tray.setToolTip(app.getName());
  tray.setContextMenu(
    Menu.buildFromTemplate([
      {
        label: '退出',
        click: () => {
          app.exit(0);
        }
      }
    ])
  );
  tray.on('click', () => windowInstance.getMain()?.show());
};
