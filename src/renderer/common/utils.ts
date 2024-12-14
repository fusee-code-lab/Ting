import { preload } from "@youliso/electronic/render";

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
