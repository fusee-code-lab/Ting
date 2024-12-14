/**
 * 防抖
 * @param fn
 * @param delay
 * @returns function
 */
export function debounce(fn: (...args: any) => void, delay: number): (...args: any) => void {
  let timer: NodeJS.Timeout | null = null;

  return function () {
    timer && clearTimeout(timer);
    // @ts-ignore
    let content = this;
    let args = arguments;
    // @ts-ignore
    timer = setTimeout(() => {
      // @ts-ignore
      fn.apply(content, args);
    }, delay);
  };
}
