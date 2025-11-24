let navigateFn = (e: string) => {
  console.log(e);
};
export const setNavigate = (fn: (e: string) => void) => {
  navigateFn = fn;
};

export const goTo = (path: string) => {
  navigateFn(path);
};
