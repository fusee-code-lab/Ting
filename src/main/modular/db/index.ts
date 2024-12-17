import { basic_init, basic_on } from "./modular/basic";
import { DBInstance } from "./sqilte";

// 全局初始化
export function DBInit() {
  basic_init();
}

// 全局关闭
export function DBClose() {
  DBInstance.close();
}

/**
 * 监听
 */
export function DBOn() {
  basic_on();
}