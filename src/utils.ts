import { INITIAL_VIEWPORT_HEIGHT, MOBILE_WIDTH } from "./constants";

// eslint-disable-next-line @typescript-eslint/ban-types
export const debounce = (fn: Function, ms = 300) => {
  let timeoutId: ReturnType<typeof setTimeout>;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  return function (this: any, ...args: any[]) {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => fn.apply(this, args), ms);
  };
};

export const get100ViewportHeight = (multiplier: number = 1) => {
  if (window.innerWidth <= MOBILE_WIDTH) {
    return `${INITIAL_VIEWPORT_HEIGHT * multiplier}px`;
  }

  return `${100 * multiplier}vh`;
};
