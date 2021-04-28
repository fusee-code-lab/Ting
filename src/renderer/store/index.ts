import { reactive, provide, inject, watch } from 'vue';
import { WindowOpt } from '@/lib/interface';
import { isNull, swapArr } from '@/lib';

/**
 * 组件页面配置
 * */
export const keepAliveOpt = reactive({
  include: [], //缓存页面
  exclude: [], //不缓存页面
  max: 10
});
export const addInclude = (key: string) => {
  if (keepAliveOpt.include.indexOf(key) === -1) keepAliveOpt.include.push(key);
};
export const delInclude = (key: string) => {
  if (keepAliveOpt.include.indexOf(key) > -1)
    keepAliveOpt.include.splice(keepAliveOpt.include.indexOf(key), 1);
};
export const addExclude = (key: string) => {
  if (keepAliveOpt.exclude.indexOf(key) === -1) keepAliveOpt.exclude.push(key);
};
export const delExclude = (key: string) => {
  if (keepAliveOpt.exclude.indexOf(key) > -1)
    keepAliveOpt.exclude.splice(keepAliveOpt.exclude.indexOf(key), 1);
};

/**
 * 窗口常驻参数
 * */
export const argsData = reactive<{ window: WindowOpt }>({
  window: null
});

/**
 * 创建全局provide
 * @param key 唯一标识
 * @param args
 */
export const provideState = (key: string, args: { [key: string]: unknown }) =>
  provide(Symbol(key), reactive(args));
export const getProvideState = (key: symbol) => inject(key);

/**
 * 窗口通信消息内容
 * */
export const messageData = reactive(<{ [key: string]: any }>{});
export const setMessageData = (key: string, value: any) => {
  messageData[key] = value;
};
export const removeMessageData = (key: string) => {
  delete messageData[key];
};