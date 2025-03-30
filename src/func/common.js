export const debounce = (fn, delay = 500) => {
    let timer;
    return (...args) => {
        clearTimeout(timer);
        timer = setTimeout(() => {
            fn(...args);
        }, delay);
    };
};
export const throttle = (fn, delay = 500) => {
    let last = 0;
    return (...args) => {
        const now = Date.now();
        if (now - last < delay)
            return;
        last = now;
        fn(...args);
    };
};
//# sourceMappingURL=common.js.map