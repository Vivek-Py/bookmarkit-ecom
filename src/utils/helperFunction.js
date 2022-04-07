import { ERROR } from "./constants";

/* Receive toast element and message to render */
export const showToast = ({ element, message, type }) => {
  if (element) {
    element.style.display = "block";
    element.children[0].textContent = message;
    const toastClass = element.children[0].className;
    if (type === ERROR) {
      element.children[0].className = `${toastClass} alert--error`;
    } else {
      element.children[0].className = `${toastClass} alert--success`;
    }
    setTimeout(() => {
      element.style.display = "none";
    }, 1500);
  }
};

// Throttle function
export const throttleFn = (fn, delay) => {
  let flag = true;
  return function () {
    if (!flag) return;
    flag = false;
    setTimeout(() => {
      fn.apply(this, arguments);
      flag = true;
    }, delay);
  };
};

// Debounce function
export const debounceFn = (fn, delay) => {
  let timer;
  return function () {
    clearTimeout(timer);
    timer = setTimeout(() => {
      fn.apply(this, arguments);
    }, delay);
  };
};
