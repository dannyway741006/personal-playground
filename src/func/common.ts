export const debounce = <T extends (...args: any[]) => void>(fn: T, delay = 500) => {
  let timer: ReturnType<typeof setTimeout>;

  return (...args: Parameters<T>) => {
    clearTimeout(timer);
    timer = setTimeout(() => {
      fn(...args);
    }, delay);
  };
}

export const throttle = <T extends (...args: any[]) => void>(fn: T, delay = 500) => {
  let last = 0;

  return (...args: Parameters<T>) => {
    const now = Date.now();
    if (now - last < delay) return;
    last = now;
    fn(...args);
  };
}