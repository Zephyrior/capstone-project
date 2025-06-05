let navigateFunction;

export const setNavigate = (navFn) => {
  navigateFunction = navFn;
};

export const redirectToLogin = () => {
  if (navigateFunction) {
    navigateFunction("/");
  } else {
    window.location.href = "/";
  }
};
