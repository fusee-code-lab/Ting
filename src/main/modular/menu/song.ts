import { preload } from '@youliso/electronic/main';
import { BrowserWindow, Menu, MenuItemConstructorOptions } from 'electron';

const songItem = (window: BrowserWindow) => {
  const template: MenuItemConstructorOptions[] = [
    {
      label: '添加到',
      click: () => {
        preload.send('context-menu-command', 'menu-item-1', [window.id]);
      }
    },
    { type: 'separator' },
    { label: 'Menu Item 2' }
  ];
  const menu = Menu.buildFromTemplate(template);
  menu.popup({ window });
};

export const songOn = () => {
  preload.on('menu-song', (e) => {
    const win = BrowserWindow.fromWebContents(e.sender);
    win && songItem(win);
  });
};
