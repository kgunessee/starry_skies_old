export default function debounce(callback, delay) {
  let timeoutRef = null;
  return function (...args) {
    clearTimeout(timeoutRef);
    timeoutRef = setTimeout(() => {
      callback(...args);
    }, delay);
  };
}
