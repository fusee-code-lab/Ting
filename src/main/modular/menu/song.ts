import { preload } from '@youliso/electronic/main';
import { BrowserWindow, Menu, MenuItemConstructorOptions } from 'electron';

const songItem = (window: BrowserWindow, data?: any) => {
  let template: MenuItemConstructorOptions[] = [];
  if (data.key && data.song) {
    template.push({
      label: '删除',
      click: () => {
        preload.send(
          'menu-song-command',
          {
            type: 'del',
            data
          },
          [window.id]
        );
      }
    });
  }
  if (template.length) {
    const menu = Menu.buildFromTemplate(template);
    menu.popup({ window });
  }
};

export const songOn = () => {
  preload.on('menu-song', (e, data) => {
    const win = BrowserWindow.fromWebContents(e.sender);
    win && songItem(win, data);
  });
};
