import { preload } from '@youliso/electronic/render';

export const random = (low: number, high: number) => {
  return Math.random() * (high - low) + low;
};

export function randomInteger(start: number = 0, end: number = 1): number {
  return (Math.random() * (end - start + 1) + start) | 0;
}

export function formatTime(time: number): string {
  const minutes = Math.floor(time / 60);
  const seconds = Math.floor(time % 60); // 使用 Math.floor 取整
  return `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
}

export const getWebFilePath = (file: File) => {
  return preload.bridge<string>('utils-file-path', file);
};

export const getOS = () => {
  let OS: 'unknown' | 'win' | 'mac' | 'unix' | 'linux' = 'unknown';
  if (navigator.userAgent.indexOf('Win') != -1) OS = 'win';
  if (navigator.userAgent.indexOf('Mac') != -1) OS = 'mac';
  if (navigator.userAgent.indexOf('X11') != -1) OS = 'unix';
  if (navigator.userAgent.indexOf('Linux') != -1) OS = 'linux';
  return OS;
};

export const setDomOs = () => {
  document.documentElement.setAttribute('os-mode', getOS());
};

export const getCssVariant = (key: string) =>
  getComputedStyle(document.documentElement).getPropertyValue(key).trim();

export const setCssVariant = (key: string, value: string) =>
  document.documentElement.style.setProperty(key, value);
