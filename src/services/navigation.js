let navigateFunction;

export const setNavigate = (navFn) => {
  navigateFunction = navFn;
};

export const redirectToLogin = () => {
  if (navigateFunction) {
    navigateFunction("/login");
  } else {
    window.location.href = "/login";
  }
};
