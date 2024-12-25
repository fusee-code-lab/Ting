import { preload } from '@youliso/electronic/render';
import type { OpenDialogOptions, OpenDialogReturnValue, SaveDialogOptions, SaveDialogReturnValue } from 'electron';

export const showOpenDialog = (
  options: OpenDialogOptions, winId?: number
) => preload.invoke<OpenDialogReturnValue>('open-directory-dialog', { options, winId });

export const showSaveDialog = (
  options: SaveDialogOptions, winId?: number
) => preload.invoke<SaveDialogReturnValue>('save-directory-dialog', { options, winId });


export const createDialogWindow = (route: string) => preload.invoke<void>('window-dialog', route);