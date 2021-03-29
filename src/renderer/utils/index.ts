import { ipcRenderer } from 'electron';
import { IpcMsg } from '@/lib/interface';
import { setMessageData } from '@/renderer/store';

/**
 * 渲染进程初始化 (i)
 * */
export async function windowLoad() {
  return new Promise((resolve) =>
    ipcRenderer.once('window-load', async (event, args) => resolve(args))
  );
}

/**
 * 消息反馈 (i)
 */
export function messageBack() {
  ipcRenderer.on('message-back', (event, args) => setMessageData(args.key, args.value));
}

/**
 * 消息发送
 */
export function messageSend(args: IpcMsg) {
  ipcRenderer.send('message-send', args);
}

/**
 * app常用获取路径
 */
export function getAppPath(key: string) {
  return ipcRenderer.sendSync('app-path-get', { key });
}

/**
 * 发送ipc消息
 * @param key
 * @param value
 */
export function ipcSend(key: string, value?: unknown) {
  ipcRenderer.send(key, value);
}

/**
 * 日志(info)
 * @param args
 */
export function logInfo(...args: any) {
  ipcRenderer.send('log-info', args);
}

/**
 * 日志(error)
 * @param args
 */
export function logError(...args: any) {
  ipcRenderer.send('log-error', args);
}