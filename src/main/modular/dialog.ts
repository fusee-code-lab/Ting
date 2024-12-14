import type { OpenDialogOptions, SaveDialogOptions } from 'electron';
import { preload, windowInstance } from '@youliso/electronic/main';
import { dialog } from 'electron';

// 选择目录窗口
export function showOpenDialog(options: OpenDialogOptions, winId: number) {
  const win = windowInstance.get(winId);
  if (!win) {
    throw new Error('not win');
  }
  return dialog.showOpenDialog(win!, options);
}

// 保存文件窗口
export function showSaveDialog(options: SaveDialogOptions, winId: number) {
  const win = windowInstance.get(winId);
  if (!win) {
    throw new Error('not win');
  }
  return dialog.showSaveDialog(win!, options);
}

export function dialogOn() {
  // 触发目录选择窗口
  preload.handle('open-directory-dialog', (e, args) => showOpenDialog(args.options, args.winId ?? e.sender.id));

  // 保存文件
  preload.handle('save-directory-dialog', (e, args) => showSaveDialog(args.options, args.winId ?? e.sender.id));
}
