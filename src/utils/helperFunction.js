import { ERROR } from "./constants";

/* Receive toast element and message to render */
export const showToast = ({ element, message, type }) => {
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
};

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
