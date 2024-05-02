// eslint-disable-next-line @typescript-eslint/ban-types
export const debounce = (fn: Function, ms = 300) => {
  let timeoutId: ReturnType<typeof setTimeout>;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  return function (this: any, ...args: any[]) {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => fn.apply(this, args), ms);
  };
};

const INITIAL_VIEWPORT_HEIGHT = window.innerHeight;
export const get100ViewportHeight = (multiplier: number = 1) => {
  return `max(min(${100 * multiplier}svh, ${
    INITIAL_VIEWPORT_HEIGHT * multiplier
  }px), 400px)`;
};
