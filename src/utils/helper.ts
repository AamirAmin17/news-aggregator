export const getApi = async (url = "", signal: AbortSignal) => {
  const data = await fetch(url, { signal });
  const response = await data.json();
  return response;
};
export function removeDuplicates(arr: any[] = []) {
  return arr?.filter((item, index: number) => arr.indexOf(item) === index);
}

export function debounce(func, timeout = 400) {
  let timer: ReturnType<typeof setTimeout>;
  return (...args) => {
    clearTimeout(timer);
    timer = setTimeout(() => {
      func.apply(this, args);
    }, timeout);
  };
}
