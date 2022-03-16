type ProxyValue<T> = { value: T };

interface Route {
  path: string;
  title?: string;
  instance?: boolean;
  component: any;
}

interface VSource {
  $path?: string;
  $el?: JSX.Element;
  onLoad?: (params?: any) => void;
  onReady?: () => void;
  onUnmounted?: () => void;
  onActivated?: (params?: any) => void;
  onDeactivated?: () => void;
  render?: () => JSX.Element | JSX.Element[];
}

interface Component extends VSource {
  $currentPath?: string;
  onLoad?: () => void;
  onActivated?: () => void;
  render?: () => JSX.Element;
}

interface View extends VSource {
  $instance?: boolean;
  beforeRoute?: (to: string, from: string, next?: () => void) => boolean;
}

declare module '*.ttf';
declare module '*.svg';
declare module '*.png';
declare module '*.ico';
declare module '*.jpg';
declare module '*.jpeg';
declare module '*.gif';
declare module '*.bmp';
declare module '*.tiff';
